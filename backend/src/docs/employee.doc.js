
/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for a employee
 *         name:
 *           type: string
 *           description: The name of the employee
 *         dni:
 *           type: integer
 *           description: The DNI of the employee
 *         salary:
 *           type: float
 *           description: The salary of the employee
 *         phone:
 *           type: integer
 *           description: The phone number of the employee
 *       required:
 *         - id
 *         - name
 *         - dni
 *       example:
 *         id: 1
 *         name: "Alex Birchmeyer"
 *         dni: 12345678
 *         salary: 50000.00
 *         phone: 123456789
 */
/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: handle employees
 */

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: get all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employees'
 *       500:
 *         description: Error getting employees
 */
/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: get an employees by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: employees ID
 *     responses:
 *       200:
 *         description: Cliente obtenido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       500:
 *         description: Error getting employees
 */

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: add a new employees
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employees'
 *     responses:
 *       201:
 *         description: Employee added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employees'
 *       500:
 *         description: error adding the employee
 */

/**
 * @swagger
 * /employees/{id}:
 *   patch:
 *     summary: update an existing employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Employee Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employees'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employees'
 *       500:
 *         description: Error updating employee
 */

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: delete an existing employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Employees ID
 *     responses:
 *       200:
 *         description: Employees deleted successfully
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
 *         description: Error deleting employees
 */