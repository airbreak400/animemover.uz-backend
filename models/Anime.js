import mongoose from "mongoose";
import slug from 'mongoose-slug-generator';
import mongoosePaginate from 'mongoose-paginate-v2';

const AnimeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    series: {
        type: Array,
        required: true
    },
    genres: {
        type: Array,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        slug: 'title',
        unique: true
    }
});

// FranchiseSchema.plugin(mongoosePaginate);

AnimeSchema.plugin(slug);
AnimeSchema.plugin(mongoosePaginate);

export default mongoose.model('Anime', AnimeSchema);