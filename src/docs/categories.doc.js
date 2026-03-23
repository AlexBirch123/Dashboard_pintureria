/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for a category
 *         name:
 *           type: string
 *           description: The name of the category
 *         imgUrl:
 *           type: string
 *           description: url of the image
 *       required:
 *         - id
 *         - name
 *       example:
 *         id: 1
 *         name: "Accesorios"
 *         imgUrl: 1742759208236_z10.jpg
 * 
 */
/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: handlers for categories
 */
/**
 * @swagger
 * /category:
 *   get:
 *     summary: get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Error getting categories
 */

/**
 * @swagger
 * /category:
 *   post:
 *     summary: add a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     security:
 *       - BearerAuth: []  
 *       - CookieAuth: []
 *     responses:
 *       201:
 *         description: vategory added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Error adding category
 */

/**
 * @swagger
 * /category/{id}:
 *   patch:
 *     summary: update a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to update
 *     security:
 *       - BearerAuth: []  
 *       - CookieAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Error updating category
 */