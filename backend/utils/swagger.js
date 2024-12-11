const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
    info: {
      swagger: "2.0",
      version: "1.0.0",
      title: "Online Management System",
      description: "Online Management System",
    },
    host: process.env.BASE_URL_SWAGGER,
    basePath: "/",
    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        name: "Authorization",
        scheme: "jwt",
        in: "header",
      },
    },
};

const options = {
    swaggerDefinition,
    apis: ["./swagger/*.js"],
};
  
exports.swaggerSpec = swaggerJSDoc(options);