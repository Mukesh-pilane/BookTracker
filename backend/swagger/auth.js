/**
 * @swagger
 * swagger: '2.0'
 * info:
 *   title: Authentication API
 *   description: API for user authentication including login, logout, password reset, and email sending.
 *   version: 1.0.0
 * host: your-api-host.com  # Replace with your actual API host
 * schemes:
 *   - https
 * paths:
 *   /auth/login:
 *     post:
 *       tags:
 *         - Authentication
 *       summary: User login
 *       description: Authenticates a user and returns a token.
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: credentials
 *           description: User email and password for login
 *           required: true
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: sahilnikam@nimapinfotech.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: 12345
 *       responses:
 *         200:
 *           description: User logged in successfully
 *           schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                 type: integer
 *                 example: 200
 *               error:
 *                 type: boolean
 *                 example: false
 *               message:
 *                 type: string
 *                 example: "Logged In Successfully"
 *               data:
 *                 type: string
 *                 description: JWT token for authentication
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         404:
 *           description: User not found or invalid credentials
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: User not found with Email user@example.com
 *         400:
 *           description: Invalid password
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Invalid Password!
 * 
 *   /auth/logout:
 *     post:
 *       tags:
 *         - Authentication
 *       summary: User logout
 *       description: Logs out a user by removing their token.
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: User logged out successfully
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: User logged out successfully
 * 
 *   /auth/forgot-password:
 *     post:
 *       tags:
 *         - Authentication
 *       summary: Forgot password 
 *       description: Initiates the password reset process by sending an OTP to the user's email.
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: body
 *           required: true
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: sahilnikam@nimapinfotech.com
 *       responses:
 *         200:
 *           description: OTP sent successfully.
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: success
 *         422:
 *           description: User not found.
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: user not found
 * 
 *   /auth/reset-password/{token}:
 *     post:
 *       tags:
 *         - Authentication
 *       summary: Reset password
 *       description: Resets the user's password using a reset token.
 *       parameters:
 *         - name: token
 *           in: path
 *           description: Password reset token
 *           required: true
 *           type: string
 *         - in: body
 *           name: reset
 *           description: New password
 *           required: true
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: New password for the user
 *                 example: newpassword123
 *       responses:
 *         200:
 *           description: Password reset successfully
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Password reset successfully
 *         400:
 *           description: Invalid reset token
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Invalid reset token
 *         404:
 *           description: User not found or token expired
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: User not found with Email sahilnikam@nimapinfotech.com
 */
