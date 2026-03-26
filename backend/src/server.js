 
//Archivo principal del servidor para la aplicación Pintureria usando Express.

import express from "express";
// import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { appRouter } from "./routes/routes.js";
import { sequelize } from "./config/BD.js";
import "./models/init.models.js"; // Importa modelos y relaciones de la base de datos

// import swaggerUI from "swagger-ui-express";
// import { specs } from "./config/swagger.js";
dotenv.config();

const port = process.env.PORT || 8080;

//instancia de la aplicación Express.

export const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use("/docs",swaggerUI.serve,swaggerUI.setup(specs))
// app.use(cookieParser());
// app.use("/uploads", express.static("uploads"));

app.use(cors({
  origin:process.env.URL_FRONT,
  credentials: true,
  methods: ["GET", "POST", "PUT","PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

//Router con todas las rutas de la App
app.use("/api", appRouter)

// Ruta para verificar el estado de la API.
app.get("/", (req, res) => {
  return res.status(200).json({"message": "API Pintureria" });
});

//Middleware para manejar errores 404.
app.use((_, res) => {
  return res.status(404).json({ message: "Página no encontrada" });
});

// Sincroniza modelos de base de datos e inicia serividor Express.
const startServer = async () => {
  try {
    await sequelize.authenticate(); // Verifica conexión a la base de datos
    console.log('Conexion establecida correctamente.');

    await sequelize.sync({ alter: true }); // Sincroniza modelos con la base de datos, alterando tablas si es necesario
    console.log('Modelos sincronizados y creados correctamente');
    
    app.listen(port, () => { // Inicia el servidor en el puerto especificado
    console.log(`Servidor escuchando en ${process.env.URL}`);
    });
  
  } catch (error) {
    console.error("Error al iniciar servidor:", error);
  }
};

startServer();
