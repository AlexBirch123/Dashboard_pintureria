
/**
 * @swagger
 * components:
 *   schemas:
 *     Clients:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for a client
 *         name:
 *           type: string
 *           description: The name of the client
 *         dni:
 *           type: integer
 *           description: The DNI of the client
 *         address:
 *           type: string
 *           description: The address of the client
 *         phone:
 *           type: integer
 *           description: The phone number of the client
 *       required:
 *         - id
 *         - name
 *         - dni
 *       example:
 *         id: 1
 *         name: "Alex Birchmeyer"
 *         dni: 12345678
 *         address: "Calle falsa 123"
 *         phone: 123456789
 */
/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: handle clients
 */
/**
 * @swagger
 * /clients:
 *   get:
 *     summary: get all clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: list of clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Clients'
 *       500:
 *         description: Error getting clients
 */
/**
 * @swagger
 * /clientes/{dni}:
 *   get:
 *     summary: get a client by DNI
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: dni
 *         schema:
 *           type: string
 *         required: true
 *         description: client DNI
 *     responses:
 *       200:
 *         description: Cliente obtenido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clients'
 *       500:
 *         description: Error getting client
 */

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: add a new client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Clients'
 *     responses:
 *       201:
 *         description: client added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clients'
 *       500:
 *         description: error adding the client
 */

/**
 * @swagger
 * /clients/{id}:
 *   patch:
 *     summary: update an existing client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Clients'
 *     responses:
 *       200:
 *         description: client updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clients'
 *       500:
 *         description: Error updating client
 */

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: delete an existing client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID client
 *     responses:
 *       200:
 *         description: client deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 result:
 *                   type: object
 *       500:
 *         description: Error deleting client
 */