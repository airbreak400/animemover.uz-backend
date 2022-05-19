import express from "express";
import multer from "multer";
import * as path from 'path'

import { createAnime, showAnimes, updateAnime, deleteAnime } from '../controllers/animesController.js';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'media/posters/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage });

const router = express.Router();

router.get('/', showAnimes)

router.post('/', upload.single('poster'), createAnime);

router.put('/:slug', updateAnime)

router.delete('/:slug', deleteAnime)

export default router;