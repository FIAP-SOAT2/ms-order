import express from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { serve, setup } from 'swagger-ui-express';
import { load } from 'js-yaml';

const router = express.Router();

const swaggerDocument = readFileSync(join(__dirname, './swagger.yaml'), 'utf8');

const swaggerData = load(swaggerDocument);

// API Documentation
router.use('/docs', serve, setup(swaggerData));

export default router;
