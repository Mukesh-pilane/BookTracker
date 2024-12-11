/**
 * @swagger
 * swagger: '2.0'
 * info:
 *   title: User API
 *   description: API for managing users
 *   version: 1.0.0
 * paths:
 *   /user:
 *     post:
 *       tags:
 *         - User
 *       summary: Create a new user
 *       description: This endpoint creates a new user with the provided details.
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: user
 *           description: User details for the new user
 *           required: true
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - roleId
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the user
 *                 example: Sahil
 *               lastName:
 *                 type: string
 *                 description: Last name of the user
 *                 example: Nikam
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user
 *                 example: sahilnikam@nimapinfotech.com
 *               password:
 *                 type: string
 *                 description: Password for the user
 *                 example: 12345
 *               roleId:
 *                 type: integer
 *                 description: Role ID of the user (e.g., 2 for regular users)
 *                 example: 2
 *       responses:
 *         200:
 *           description: User successfully created
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: User created successfully
 *               user:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                     example: Sahil
 *                   lastName:
 *                     type: string
 *                     example: Nikam
 *                   email:
 *                     type: string
 *                     example: sahilnikam@nimapinfotech.com
 *                   roleId:
 *                     type: integer
 *                     example: 2
 *         400:
 *           description: Bad request due to missing or invalid data
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Data validation failed
 *   /user/managers:
 *     get:
 *       tags:
 *         - User
 *       summary: Get all managers
 *       description: Fetch a list of all managers.
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: A list of managers
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Manager ID
 *                   example: 2
 *                 firstName:
 *                   type: string
 *                   description: First name of the manager
 *                   example: John
 *                 lastName:
 *                   type: string
 *                   description: Last name of the manager
 *                   example: Doe
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: Email address of the manager
 *                   example: johndoe@example.com
 *         401:
 *           description: Unauthorized access
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Unauthorized access
 *   /user/developers:
 *     get:
 *       tags:
 *         - User
 *       summary: Get all developers
 *       description: Fetch a list of all developers.
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: A list of developers
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Developer ID
 *                   example: 2
 *                 firstName:
 *                   type: string
 *                   description: First name of the developer
 *                   example: John
 *                 lastName:
 *                   type: string
 *                   description: Last name of the developer
 *                   example: Doe
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: Email address of the developer
 *                   example: johndoe@example.com
 *         401:
 *           description: Unauthorized access
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Unauthorized access
 *   /user/block/{id}:
 *     post:
 *       tags:
 *         - User
 *       summary: Block a user
 *       description: Blocks a user by their ID.
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the user to block
 *           required: true
 *           type: integer
 *       responses:
 *         200:
 *           description: User blocked successfully
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: User blocked successfully
 *         404:
 *           description: User not found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: User not found
 *   /user/unblock/{id}:
 *     post:
 *       tags:
 *         - User
 *       summary: Unblock a user
 *       description: Unblocks a user by their ID.
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the user to unblock
 *           required: true
 *           type: integer
 *       responses:
 *         200:
 *           description: User unblocked successfully
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: User unblocked successfully
 *         404:
 *           description: User not found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: User not found
 *   /user/blocklist:
 *     get:
 *       tags:
 *         - User
 *       summary: Get Blocklist
 *       description: Fetch a list of all blocked users
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: A list of blocked users
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Developer ID
 *                   example: 2
 *                 firstName:
 *                   type: string
 *                   description: First name of the developer
 *                   example: John
 *                 lastName:
 *                   type: string
 *                   description: Last name of the developer
 *                   example: Doe
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: Email address of the developer
 *                   example: johndoe@example.com
 *         401:
 *           description: Unauthorized access
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Unauthorized access
 *         404:
 *           description: User not found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: User not found
 */
