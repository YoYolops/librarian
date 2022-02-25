import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import ErrorHandler from './handlers/ErrorHandler';
import router from "./routers";

import connectDatabase from './database';

export async function init() {
    await connectDatabase();
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.use(ErrorHandler.handle);

export default app;