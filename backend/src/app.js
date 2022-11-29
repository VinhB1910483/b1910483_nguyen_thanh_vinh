import express from "express";
import Route from './routes/index.js';
import cors from 'cors';

import { morganLogger } from "./middlewares/logger.js";

export default () => {
    const app = express();

    app.use('/images', express.static('public/images'))
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(morganLogger);
    app.use('/api', Route);

    return app;
}

