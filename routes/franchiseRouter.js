import express from "express";
import { createFranchise, showFranchises, updateFranchise, deleteFranchise } from '../controllers/franchiseController.js';

const router = express.Router();

router.get('/', showFranchises)

router.post('/', createFranchise);

router.put('/:slug', updateFranchise)

router.delete('/:slug', deleteFranchise)

export default router;