import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import 'dotenv/config';
import { red } from 'colorette';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// SETTING MONGOOSE PLUGINS



// IMPORT ROUTES

import animesRouter from './routes/animesRouter.js';


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/media/posters', express.static(path.join(__dirname, '/media/posters')));

mongoose.connect(process.env.MONGOURL, () => {
    console.log(red('Connected to the DB...'));
})

// ROUTES

app.use('/api/animes/', animesRouter);


export default app;
