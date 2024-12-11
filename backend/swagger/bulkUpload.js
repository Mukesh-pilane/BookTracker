/**
 * @swagger
 * swagger: '2.0'
 * info:
 *   title: Bulk Upload API
 *   description: API for handling bulk uploads and appointment filtering.
 *   version: 1.0.0
 * paths:
 *   /bulkUpload:
 *     post:
 *       tags:
 *         - Bulk Upload
 *       summary: Add bulk upload data
 *       description: Uploads a file and creates records in bulk from the file data.
 *       security:
 *         - bearerAuth: []
 *       consumes:
 *         - multipart/form-data
 *       parameters:
 *         - name: file
 *           in: formData
 *           description: File to be uploaded for bulk data processing
 *           required: true
 *           type: file
 *       responses:
 *         200:
 *           description: Bulk upload completed successfully
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Data bulk upload successfully
 *         400:
 *           description: Bad request, failed to process the upload
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Invalid file or userId
 *     get:
 *       tags:
 *         - Bulk Upload
 *       summary: Fetch all bulk upload records
 *       description: Retrieves a list of all bulk upload records.
 *       security:
 *         - bearerAuth: []
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: Successfully retrieved bulk upload data
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: All bulk upload data fetched successfully
 *               data:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID of the bulk upload record
 *                       example: "12345"
 *                     fileName:
 *                       type: string
 *                       description: Name of the uploaded file
 *                       example: "bulk_data.xlsx"
 *                     uploadDate:
 *                       type: string
 *                       format: date-time
 *                       description: Date and time of the upload
 *                       example: "2024-10-22T10:00:00Z"
 *                     status:
 *                       type: string
 *                       description: Status of the upload process
 *                       example: "completed"
 *         404:
 *           description: No bulk upload records found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: No bulk upload records found
 *         500:
 *           description: Internal server error
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Internal server error occurred while fetching bulk uploads
 *   /bulkUpload/{id}:
 *     get:
 *       tags:
 *         - Bulk Upload
 *       summary: Fetch bulk upload record by ID
 *       description: Retrieves a specific bulk upload record based on the provided ID.
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: ID of the bulk upload record to retrieve
 *           schema:
 *             type: string
 *             example: "12345"
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: Successfully retrieved bulk upload record
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Bulk upload record fetched successfully
 *                   data:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID of the bulk upload record
 *                         example: "12345"
 *                       fileName:
 *                         type: string
 *                         description: Name of the uploaded file
 *                         example: "bulk_data.xlsx"
 *                       uploadDate:
 *                         type: string
 *                         format: date-time
 *                         description: Date and time of the upload
 *                         example: "2024-10-22T10:00:00Z"
 *                       status:
 *                         type: string
 *                         description: Status of the upload process
 *                         example: "completed"
 *         404:
 *           description: Bulk upload record not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Bulk upload record not found
 *         500:
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Internal server error occurred while fetching the bulk upload record
 */