import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import 'dotenv/config';
import { red } from 'colorette';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// IMPORT ROUTES

import franchiseRouter from './routes/franchiseRouter.js';


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URI, () => {
    console.log(red('Connected to the DB...'));
})

// ROUTES

app.use('/api/franchise/', franchiseRouter);


export default app;
