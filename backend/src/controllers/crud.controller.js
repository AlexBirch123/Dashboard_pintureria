import {
  createResource,
  deleteResource,
  getResourceById,
  listResources,
  updateResource,
} from "../services/crud.service.js";

const handleError = (res, error) => {
  const status = error.status ?? 500;
  return res.status(status).json({ message: error.message ?? "Error interno del servidor." });
};

export const buildCrudController = (model) => ({
  list: async (req, res) => {
    try {
      const result = await listResources(model, req.query);
      return res.status(200).json(result);
    } catch (error) {
      return handleError(res, error);
    }
  },

  getById: async (req, res) => {
    try {
      const result = await getResourceById(model, req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return handleError(res, error);
    }
  },

  create: async (req, res) => {
    try {
      const result = await createResource(model, req.body);
      return res.status(201).json(result);
    } catch (error) {
      return handleError(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const result = await updateResource(model, req.params.id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      return handleError(res, error);
    }
  },

  remove: async (req, res) => {
    try {
      await deleteResource(model, req.params.id);
      return res.status(204).send();
    } catch (error) {
      return handleError(res, error);
    }
  },
});
