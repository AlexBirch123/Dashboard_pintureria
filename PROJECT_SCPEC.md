# PROJECT_SCPEC.md

## Objetivo del proyecto
Construir una aplicación web para consulta y visualización de datos del negocio, con foco en lectura de información desde base de datos, segmentación por roles y acceso por sucursal.

La aplicación estará compuesta por:
- **Frontend web** en React
- **Backend API REST** en Express
- **ORM** Sequelize
- **Base de datos** MySQL

El objetivo principal no es crear una app orientada a altas/modificaciones masivas, sino una aplicación enfocada en:
- consultar datos
- listar registros
- filtrar información
- relacionar entidades
- mostrar información por sucursal
- exponer endpoints de lectura consistentes y claros para el frontend

---

## Stack tecnológico
- **Frontend:** React
- **Backend:** Node.js + Express
- **ORM:** Sequelize
- **Base de datos:** MySQL

### Requisitos de implementación
- Mantener una arquitectura modular y clara.
- Separar responsabilidades en capas.
- Evitar lógica de negocio duplicada.
- Priorizar código legible y mantenible.
- Preparar el proyecto para ejecutarse como aplicación web.

---

## Estructura funcional esperada
Codex debe asumir una arquitectura separada entre frontend y backend.

### Backend
Debe exponer una API REST para consultas de datos desde MySQL usando Sequelize.

### Frontend
Debe consumir la API y mostrar:
- tablas
- filtros
- búsquedas
- vistas por entidad
- vistas condicionadas por rol y sucursal

---

## Fuente de verdad para entidades y relaciones
### Entidades iniciales
Las entidades iniciales **no deben inventarse manualmente**.

Codex debe:
1. inspeccionar la carpeta `backend/src/models`
2. identificar todos los modelos existentes
3. usar esos modelos como base inicial del sistema
4. revisar especialmente el archivo `init.models.js`
5. tomar las relaciones definidas en `init.models.js` como fuente principal de verdad para:
   - asociaciones
   - claves foráneas
   - dependencias entre entidades
   - reglas de navegación entre modelos

### Instrucción importante
No crear modelos nuevos ni modificar nombres de modelos existentes sin necesidad real.

Antes de generar endpoints, servicios o vistas:
- inspeccionar `backend/src/models`
- inspeccionar `init.models.js`
- mapear todas las entidades y sus relaciones

---

## Roles del sistema
Habrá 3 roles principales:

### 1. Administrador
Acceso total al sistema.
Puede:
- ver todos los datos
- ver todas las sucursales
- consultar cualquier entidad
- acceder a reportes globales
- usar endpoints sin restricción por sucursal, salvo que la lógica del modelo indique otra cosa

### 2. Gerente
Acceso restringido a los datos de su sucursal.
Puede:
- ver datos de su sucursal
- consultar entidades relacionadas con su sucursal
- ver reportes y listados limitados a su sucursal
- no debe acceder a datos globales ni a otras sucursales

### 3. Empleado
Acceso básico a datos de su sucursal.
Puede:
- ver información básica de su sucursal
- acceder a consultas simples
- ver solo los datos mínimos necesarios para operar
- no debe acceder a configuraciones globales ni a información sensible o administrativa

### Regla general de autorización
Codex debe preparar el sistema para soportar autorización por:
- rol
- sucursal
- tipo de recurso consultado

Si aún no existe autenticación implementada:
- dejar preparada la estructura para middleware de autorización
- centralizar la lógica de permisos
- no hardcodear reglas repetidas en controladores

---

## Enfoque principal de la API
La API estará enfocada principalmente en **GET endpoints**.

### Prioridad
- alta prioridad: consultas y lectura de datos
- baja prioridad: creación, edición o eliminación

Se harán muy pocos `POST`, `PUT`, `PATCH` o `DELETE`.
La mayor parte del sistema será para consultar información existente.

### Objetivo de endpoints
Necesito endpoints para traer los datos de cada uno de los modelos existentes, usando como referencia:
- los modelos dentro de `backend/src/models`
- las relaciones definidas en `init.models.js`

---

## Endpoints esperados
Codex debe generar endpoints de lectura para cada modelo detectado.

### Mínimo esperado por modelo
Para cada modelo encontrado en `backend/src/models`, crear como mínimo:

- `GET /api/<modelo>` → listar registros
- `GET /api/<modelo>/:id` → obtener detalle por id

### Cuando aplique
Si las relaciones del modelo lo justifican, agregar:
- filtros por sucursal
- filtros por fechas
- filtros por estado
- búsqueda por campos relevantes
- inclusión de relaciones con `include`
- paginación
- ordenamiento

### Convenciones recomendadas
- usar nombres de rutas consistentes
- separar rutas, controladores y servicios
- centralizar queries complejas en servicios
- usar Sequelize `include` tomando como referencia `init.models.js`
- evitar lógica SQL cruda salvo necesidad real

### Ejemplos orientativos
Estos ejemplos son solo de forma. Codex debe adaptarlos a los modelos reales detectados:
- `GET /api/clientes`
- `GET /api/clientes/:id`
- `GET /api/ventas`
- `GET /api/ventas/:id`
- `GET /api/productos`
- `GET /api/productos/:id`

### Reglas para los endpoints
- Priorizar endpoints de consulta.
- No generar endpoints inventados sin sustento en los modelos.
- Si una relación existe en `init.models.js`, aprovecharla para enriquecer el detalle.
- Si un modelo pertenece a una sucursal, soportar restricción por sucursal para Gerente y Empleado.
- Si un modelo no depende de sucursal, evaluar acceso según rol.

---

## Reglas de negocio
Las reglas de negocio deben tomarse principalmente de las relaciones entre modelos definidas en `init.models.js`.

### Instrucción clave
Codex debe considerar `init.models.js` como referencia principal para entender:
- qué entidad depende de cuál
- qué claves foráneas existen
- qué asociaciones hay
- qué consultas con joins deben permitirse
- qué recursos deben incluir datos relacionados

### Supuestos permitidos
Solo hacer supuestos cuando:
- la relación esté clara en los modelos
- el nombre de la foreign key sea evidente
- el comportamiento sea consistente con Sequelize

### Supuestos no permitidos
- No inventar relaciones inexistentes.
- No asumir reglas de negocio no visibles en los modelos o asociaciones.
- No cambiar nombres de foreign keys sin revisar primero el código existente.

### Aplicación práctica
Al construir endpoints, servicios y respuestas:
- usar `include` donde tenga sentido
- devolver datos relacionados de forma controlada
- no sobrecargar respuestas innecesariamente
- respetar las asociaciones ya definidas

---

## Requisitos de backend
Codex debe organizar el backend con una estructura similar a esta:

```txt
backend/
  src/
    config/
    models/
    routes/
    controllers/
    services/
    middlewares/
    utils/
    app.js
    server.js
```

### Backend: criterios técnicos
- usar variables de entorno
- configurar conexión a MySQL
- registrar modelos correctamente
- cargar asociaciones desde `init.models.js`
- crear rutas REST limpias
- implementar manejo centralizado de errores
- devolver respuestas JSON consistentes

### Respuesta JSON recomendada
Usar una estructura consistente, por ejemplo:

```json
{
  "ok": true,
  "data": []
}
```

Y en errores:

```json
{
  "ok": false,
  "message": "Descripción del error"
}
```

---

## Requisitos de frontend
El frontend debe ejecutarse como aplicación web en React.

### Objetivo del frontend
Consumir la API del backend y mostrar la información de manera clara.

### Pantallas mínimas sugeridas
Codex puede preparar una base inicial con:
- login o selector temporal de rol/sucursal si auth no está lista
- dashboard simple
- vista de listado por entidad
- vista de detalle por entidad
- filtros por sucursal cuando aplique
- tablas reutilizables
- componentes de carga y error

### Prioridad visual
No priorizar diseño complejo.
Priorizar:
- funcionalidad
- claridad
- conexión correcta con la API
- facilidad para ampliar después

### Estructura sugerida
```txt
frontend/
  src/
    components/
    pages/
    services/
    hooks/
    context/
    routes/
```

---

## Cómo correr el proyecto
El proyecto debe quedar preparado para correr como **aplicación web local**.

### Objetivo de ejecución
- backend corriendo como API REST
- frontend corriendo en navegador
- frontend consumiendo backend por HTTP
- base de datos MySQL conectada por variables de entorno

### Modo esperado de desarrollo
Codex debe dejar el proyecto listo para ejecutarse en entorno web de desarrollo, por ejemplo:
- backend en un puerto como `3001` o similar
- frontend en un puerto como `5173` o `3000`
- CORS configurado correctamente entre frontend y backend
- `.env.example` creado en backend y frontend si hace falta

### Instrucción importante
Como el objetivo es correrlo en web, Codex debe:
- preparar scripts de desarrollo
- documentar comandos de instalación y ejecución
- verificar la conexión entre frontend, backend y base de datos
- dejar instrucciones claras en un `README.md`

### Resultado esperado
Quiero poder:
1. instalar dependencias
2. configurar variables de entorno
3. iniciar backend
4. iniciar frontend
5. abrir la app en el navegador
6. consultar datos reales desde la base MySQL

---

## Entregables esperados de Codex
Codex debe ayudar a producir, como mínimo:

1. estructura inicial ordenada de frontend y backend
2. conexión funcional del backend con MySQL usando Sequelize
3. carga correcta de modelos y asociaciones existentes
4. endpoints GET por cada modelo base
5. filtros y relaciones cuando correspondan
6. base de autorización por rol y sucursal
7. frontend React conectado al backend
8. vistas mínimas para listar y ver detalle
9. configuración para correr la app en web local
10. documentación clara para levantar el proyecto

---

## Restricciones importantes
- No inventar entidades fuera de `backend/src/models`
- No romper asociaciones existentes
- No renombrar modelos sin necesidad
- No priorizar CRUD completo si no hace falta
- Priorizar lectura de datos por sobre escritura
- Respetar las relaciones definidas en `init.models.js`
- Diseñar pensando en escalabilidad y mantenimiento

---

## Orden recomendado de trabajo para Codex
1. inspeccionar `backend/src/models`
2. inspeccionar `init.models.js`
3. mapear entidades y relaciones
4. preparar backend base
5. crear endpoints GET por modelo
6. agregar filtros y `include` según asociaciones
7. preparar autorización por rol y sucursal
8. preparar frontend React
9. conectar frontend con backend
10. documentar cómo correr todo en entorno web local

---

## Instrucción final para Codex
Antes de escribir código:
- inspeccioná el repositorio
- detectá modelos reales
- detectá asociaciones reales
- usá los archivos existentes como fuente de verdad

Luego:
- implementá primero la base funcional
- evitá complejidad innecesaria
- priorizá que el proyecto quede corriendo de punta a punta en web local
