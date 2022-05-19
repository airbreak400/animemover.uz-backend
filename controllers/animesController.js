import Anime from "../models/Anime.js";

export const showAnimes = async (req, res) => {
    try {
        const options = {
            page: 1,
            limit: 3
        }

        if(req.query.page && req.query.limit) {
            options.page = req.query.page;
            options.limit = req.query.limit;
        }
        
        const allAnimes = await Anime.paginate({}, options);
        res.json(allAnimes);
    } catch(error) {
        res.status(400).json({ message: error })
    }
    
}

export const createAnime = async (req, res) => {
    if(req.body && req.body.title && req.body.date && req.body.description && req.body.series && req.body.genres && req.file && req.file.filename) {
        try {
            const newAnime = await Anime.create({
                title: req.body.title,
                date: req.body.date,
                description: req.body.description,
                series: req.body.series,
                genres: req.body.genres,
                poster: req.file.filename
            });
            res.status(201).json(newAnime);
        } catch(error) {
            if(error.code === 11000) {
                res.status(400)
                res.json({ message: 'An Anime with this title already exists' })
            } else {
                res.status(400).json({ message: error })
            }
            
        }
        
    } else {
        res.status(400).json({ message: 'All fields are required' })
    }
}

export const updateAnime = async (req, res) => {
    if(req.body && req.body.title && req.body.date && req.body.description && req.body.genres) { 
        try {
            let updatedAnime = await Anime.findOneAndUpdate({ slug: req.params.slug}, req.body, { new: true });
            if(!updatedAnime) {
                res.status(400).json({ message: 'Anime doesnt exist'});
            } else {
                res.status(200).json(updatedAnime);
            }
        } catch(error) {
            res.status(400).json({ message: error })
        }
    } else {
        res.status(400).json({ message: 'All fields are required' })
    }
}

export const deleteAnime = async (req, res) => {
    try {
        const deletedAnime = await Anime.findOneAndDelete({ slug: req.params.slug });
        if(!deletedAnime) {
            res.status(400).json({ message: 'Anime doesnt exist'});
        } else {
            res.status(200).json(deletedAnime);
        }
    } catch(error) {
        res.status(400).json({ message: error })
    }
}