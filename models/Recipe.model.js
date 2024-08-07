// Your code here ...
const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
    },
    ingredients: [String],
    image: {
        type: String,
        default: "https://images.media-allrecipes.com/images/75131.jpg"
    },
    duration: {
        type: Number,
        min: 0
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Recipe = model('Recipe', recipeSchema);

export default Recipe;