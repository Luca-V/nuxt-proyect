const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    headline: String,
    body: String,
    rating: Number,
    pluginId: {type: Schema.Types.ObjectId, ref: 'Product'},
    userId: {type: Schema.Types.ObjectId, ref: "User"}
    
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review