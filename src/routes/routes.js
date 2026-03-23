import { Router } from "express";
import { routerProd } from "../routes/routers/Productos.routes.js";
import { routerRecover } from "../routes/routers/recover.routes.js";
import { routerUsu } from "../routes/routers/Usuario.routes.js";
import { routerSuc } from "../routes/routers/Sucursales.routes.js";
import { routerCli } from "../routes/routers/Cliente.routes.js";
import { routerEmp } from "../routes/routers/Empleados.routes.js";
import { routerSupplier } from "../routes/routers/Proveedores.routes.js";
import { routerVenta } from "../routes/routers/Ventas.routes.js";
import { routerRenglon } from "../routes/routers/Renglon.routes.js";
import { routerCat } from "./routers/categorias.routes.js";
import { login, logout, register } from "../controllers/Usuario.controllers.js";
import { authenticate, authorizedRole } from "../middlewares/authenticate.middleware.js";
import { routerMP } from "../routes/routers/mercadoPago.routes.js";
import { handleError, upload, uploadImg } from "../controllers/images.controllers.js";

export const appRouter = Router()

appRouter.post("/register", register);
appRouter.post("/login", login);
appRouter.post("/logout", logout);
appRouter.use("/category", routerCat)
appRouter.use("/products", routerProd)
appRouter.use("/recover", routerRecover);
appRouter.use("/users", routerUsu);
appRouter.use("/sales", routerVenta);
appRouter.use("/rows", routerRenglon);
appRouter.use("/branches", routerSuc);
appRouter.use("/clients", routerCli);
appRouter.use("/employees", routerEmp);
appRouter.use("/suppliers", routerSupplier);

//ruta para cargar imagenes en la app
appRouter.post("/upload",
              authenticate, 
              authorizedRole([1, 2]),
              upload.single("imagen"),
              handleError,
              uploadImg
            );

appRouter.use("/mp", authenticate,routerMP);

// Ruta para verificar si el usuario está autorizado.
appRouter.get("/authorized", authenticate, (req, res) => {
  res.status(200).json(req.user);
});