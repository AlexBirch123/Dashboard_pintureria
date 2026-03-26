import { Router } from "express";
import { buildCrudController } from "../../controllers/crud.controller.js";
import { modelRegistry } from "../../models/modelRegistry.js";

export const crudRouter = Router();

for (const { resource, model } of modelRegistry) {
  const controller = buildCrudController(model);

  crudRouter.get(`/${resource}`, controller.list);
  crudRouter.get(`/${resource}/:id`, controller.getById);
  crudRouter.post(`/${resource}`, controller.create);
  crudRouter.put(`/${resource}/:id`, controller.update);
  crudRouter.delete(`/${resource}/:id`, controller.remove);
}
