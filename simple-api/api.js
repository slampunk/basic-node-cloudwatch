import express from 'express';
import compression from 'compression';
import cors from 'cors';
import notFound from './middleware/notFoundMiddleware.js';
import loggingMiddleware from './middleware/loggingMiddleware.js';
import { handleGetMethod, handlePostMethod } from './someService.js';

const api = express();

// basic middleware
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(compression());
api.use(cors());

// custom api logging middleware
api.use(loggingMiddleware);
// routing middleware for our apps
api.get('/', (req, res) => res.send('hello world'));
api
    .get('/handle', async(req, res) => {
        const params = { url: req.originalUrl, ...req.query };
        res.json(await handleGetMethod(params));
    })
    .post('/handle', async(req, res) => {
        const params = { url: req.originalUrl, ...req.query };
        const body = req.body;
        res.json(await handlePostMethod(params, body));
    });

// error handling middleware
api.use(notFound);

export default api;