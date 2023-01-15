const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['sport', 'policy', 'culture']
    }
}, {
    collection: 'blogs'
})

module.exports = mongoose.model('blog', blogSchema);