import { Op } from "sequelize";

const RESERVED_QUERY_PARAMS = new Set(["page", "limit", "orderBy", "orderDir"]);

const buildInclude = (model) => Object.keys(model.associations).map((association) => ({ association }));

const buildPkWhere = (model, idParam) => {
  const pkAttributes = model.primaryKeyAttributes;

  if (pkAttributes.length === 1) {
    return { [pkAttributes[0]]: idParam };
  }

  const values = String(idParam)
    .split(",")
    .map((value) => value.trim());

  if (values.length !== pkAttributes.length) {
    const example = pkAttributes.map((_, index) => `valor${index + 1}`).join(",");
    const error = new Error(`ID compuesto inválido. Formato esperado: ${example}`);
    error.status = 400;
    throw error;
  }

  return pkAttributes.reduce((acc, field, index) => {
    acc[field] = values[index];
    return acc;
  }, {});
};

const buildListOptions = (model, query) => {
  const attributes = model.rawAttributes;
  const where = {};

  for (const [key, value] of Object.entries(query)) {
    if (RESERVED_QUERY_PARAMS.has(key) || value === undefined || value === "") {
      continue;
    }

    if (!attributes[key]) {
      continue;
    }

    if (typeof value === "string" && value.includes(",")) {
      where[key] = { [Op.in]: value.split(",").map((item) => item.trim()) };
      continue;
    }

    if (typeof value === "string" && value.includes("%")) {
      where[key] = { [Op.like]: value };
      continue;
    }

    where[key] = value;
  }

  const page = Math.max(Number.parseInt(query.page ?? "1", 10), 1);
  const requestedLimit = Math.max(Number.parseInt(query.limit ?? "20", 10), 1);
  const limit = Math.min(requestedLimit, 100);
  const offset = (page - 1) * limit;

  const orderBy = attributes[query.orderBy] ? query.orderBy : model.primaryKeyAttributes[0] ?? "id";
  const orderDir = String(query.orderDir ?? "ASC").toUpperCase() === "DESC" ? "DESC" : "ASC";

  return {
    where,
    limit,
    offset,
    page,
    order: [[orderBy, orderDir]],
  };
};

const validatePayload = (model, payload, { partial = false } = {}) => {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    const error = new Error("Body inválido. Se esperaba un objeto JSON.");
    error.status = 400;
    throw error;
  }

  const attributes = model.rawAttributes;
  const allowedFields = Object.keys(attributes).filter(
    (key) => !["createdAt", "updatedAt"].includes(key),
  );

  const unknownFields = Object.keys(payload).filter((field) => !allowedFields.includes(field));
  if (unknownFields.length > 0) {
    const error = new Error(`Campos no permitidos: ${unknownFields.join(", ")}`);
    error.status = 400;
    throw error;
  }

  const requiredFields = allowedFields.filter((field) => {
    const attribute = attributes[field];
    const hasDefault = attribute.defaultValue !== undefined;
    return !attribute.allowNull && !attribute.autoIncrement && !hasDefault;
  });

  if (!partial) {
    const missingFields = requiredFields.filter((field) => payload[field] === undefined || payload[field] === null);
    if (missingFields.length > 0) {
      const error = new Error(`Faltan campos requeridos: ${missingFields.join(", ")}`);
      error.status = 400;
      throw error;
    }
  }

  const sanitized = {};
  for (const field of allowedFields) {
    if (payload[field] === undefined) {
      continue;
    }

    if (payload[field] === null && attributes[field].allowNull === false) {
      const error = new Error(`El campo '${field}' no puede ser null.`);
      error.status = 400;
      throw error;
    }

    sanitized[field] = payload[field];
  }

  if (Object.keys(sanitized).length === 0) {
    const error = new Error("No hay campos válidos para procesar.");
    error.status = 400;
    throw error;
  }

  return sanitized;
};

const getExistingByPk = async (model, where) => {
  const include = buildInclude(model);
  const item = await model.findOne({ where, include });
  if (!item) {
    const error = new Error("Recurso no encontrado.");
    error.status = 404;
    throw error;
  }

  return item;
};

const buildPkWhereFromInstance = (model, instance) =>
  model.primaryKeyAttributes.reduce((acc, field) => {
    acc[field] = instance[field];
    return acc;
  }, {});

export const listResources = async (model, query) => {
  const include = buildInclude(model);
  const options = buildListOptions(model, query);

  const { rows, count } = await model.findAndCountAll({
    ...options,
    include,
    distinct: true,
  });

  return {
    data: rows,
    pagination: {
      page: options.page,
      limit: options.limit,
      total: count,
      totalPages: Math.max(Math.ceil(count / options.limit), 1),
    },
  };
};

export const getResourceById = async (model, idParam) => {
  const where = buildPkWhere(model, idParam);
  return getExistingByPk(model, where);
};

export const createResource = async (model, payload) => {
  const data = validatePayload(model, payload, { partial: false });
  const created = await model.create(data);
  const where = buildPkWhereFromInstance(model, created);
  return getExistingByPk(model, where);
};

export const updateResource = async (model, idParam, payload) => {
  const where = buildPkWhere(model, idParam);
  const existing = await getExistingByPk(model, where);
  const data = validatePayload(model, payload, { partial: true });
  await existing.update(data);
  return getExistingByPk(model, where);
};

export const deleteResource = async (model, idParam) => {
  const where = buildPkWhere(model, idParam);
  await getExistingByPk(model, where);
  await model.destroy({ where });
};
