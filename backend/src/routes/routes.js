// Reune las rutas publicas de autenticacion y protege el resto del API.
import { Router } from "express";
import { authorized, login, logout, register } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { validateLogin, validateRegister } from "../middlewares/validations/user.js";
import { crudRouter } from "./Routers/crud.routes.js";

export const appRouter = Router()

appRouter.post("/register", validateRegister, register);
appRouter.post("/login", validateLogin, login);
appRouter.post("/logout", authenticate, logout);
appRouter.get("/authorized", authenticate, authorized);
appRouter.use("/", authenticate, crudRouter);

//ruta para cargar imagenes en la app

// appRouter.post("/upload",
//               authenticate, 
//               authorizedRole([1, 2]),
//               upload.single("imagen"),
//               handleError,
//               uploadImg
//             );
