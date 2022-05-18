import mongoose from "mongoose";
import slug from 'mongoose-slug-generator';
mongoose.plugin(slug);

const FranchiseSchema = mongoose.Schema({
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
    genres: {
        type: Array,
        required: true
    },
    slug: {
        type: String,
        slug: 'title'
    }
});

export default mongoose.model('Franchise', FranchiseSchema);