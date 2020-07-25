const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../utils/swaggerSpec');

const swaggerUiOptions = {
  customSiteTitle: 'MicroAPI | Stock-Ticker API Documentation',
  customCss: '.swagger-ui .topbar { display: none }'
};

// use swagger-ui-express for your app documentation endpoint
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerSpec, swaggerUiOptions));
router.get('/doc', swaggerUi.setup(swaggerSpec, swaggerUiOptions));

module.exports = router;
