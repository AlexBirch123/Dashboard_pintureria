//Router genérico para CRUD de modelos
//permite manejar múltiples entidades con un solo conjunto de rutas y controladores

import { Router } from "express";
import { buildCrudController } from "../../controllers/crud.controller.js";
import { resourceMiddlewares } from "../../middlewares/resourceValidation.middleware.js";
import { modelRegistry } from "../../models/modelRegistry.js";

export const crudRouter = Router();

for (const { resource, model } of modelRegistry) {
  const controller = buildCrudController(model);
  const createMiddlewares = resourceMiddlewares[resource]?.create ?? [];
  const updateMiddlewares = resourceMiddlewares[resource]?.update ?? [];

  crudRouter.get(`/${resource}`, controller.list);
  crudRouter.get(`/${resource}/:id`, controller.getById);
  crudRouter.post(`/${resource}`, ...createMiddlewares, controller.create);
  crudRouter.put(`/${resource}/:id`, ...updateMiddlewares, controller.update);
  crudRouter.delete(`/${resource}/:id`, controller.remove);
}
