const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./Routers/productRouter');
const path = require('path');
const helmet = require('helmet');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config();
connectDB();

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Product List API',
        version: '1.0.0',
        description: 'API for managing product items',
      },
    },
    apis: ['./routes/*.js'],
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use('/api', productRoutes, swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


module.exports = app;
