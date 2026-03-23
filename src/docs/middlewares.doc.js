
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *     CookieAuth:
 *      type: apiKey
 *      in: cookie
 *      name: access_token
 */
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: handlers for authentication
 */

/**
 * @swagger
 * /authorized:
 *   get:
 *     summary: verify if user is authorized
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: user authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  id:
 *                   type: integer
 *                   description: The unique identifier for a user
 *                  userName:
 *                   type: string
 *                   description: The name of the user
 *                  role:
 *                   type: integer
 *                   description: The role of the user
 *               example:
 *                  id: 1
 *                  userName: "admin"
 *                  role: 1
 * 
 *       403:
 *         description: invalid token
 *       401:
 *        description: no token found
 */

/**
 * @swagger
 * security:
 *   - BearerAuth: []
 *   - CookieAuth: []
 */