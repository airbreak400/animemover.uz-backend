import Franchise from "../models/Franchise.js";

export const showFranchises = async (req, res) => {
    try {
        const allFranchises = await Franchise.find();
        res.json(allFranchises);
    } catch(error) {
        res.status(400).json({ message: error })
    }
    
}

export const createFranchise = async (req, res) => {
    if(req.body && req.body.title && req.body.date && req.body.description && req.body.genres) {
        try {
            const newFranchise = await Franchise.create({
                title: req.body.title,
                date: req.body.date,
                description: req.body.description,
                genres: req.body.genres
            });
            res.status(201).json(newFranchise);
        } catch(error) {
            if(error.code === 11000) {
                res.status(400)
                res.json({ message: 'A Franchise with this title already exists' })
            } else {
                res.status(400).json({ message: error })
            }
            
        }
        
    } else {
        res.status(400).json({ message: 'All fields are required' })
    }
}

export const updateFranchise = async (req, res) => {
    if(req.body && req.body.title && req.body.date && req.body.description && req.body.genres) { 
        try {
            let updatedFranchise = await Franchise.findOneAndUpdate({ slug: req.params.slug}, req.body, { new: true });
            if(!updatedFranchise) {
                res.status(400).json({ message: 'Franchise doesnt exist'});
            } else {
                res.status(200).json(updatedFranchise);
            }
        } catch(error) {
            res.status(400).json({ message: error })
        }
    } else {
        res.status(400).json({ message: 'All fields are required' })
    }
}

export const deleteFranchise = async (req, res) => {
    try {
        const deletedFranchise = await Franchise.findOneAndDelete({ slug: req.params.slug });
        if(!deletedFranchise) {
            res.status(400).json({ message: 'Franchise doesnt exist'});
        } else {
            res.status(200).json(deletedFranchise);
        }
    } catch(error) {
        res.status(400).json({ message: error })
    }
}