const mongoose = require('mongoose');
const Schema = mongoose.Schema

const productSchema = new Schema({
    category: {type: Schema.Types.ObjectId, ref: "Category"}, 
    title: {type: String, required: true},
    description: {type: String, required: true},
    photo: {type: String},
    price: {type: Number, required: true},
    oldPrice: {type: Number, default: 0},
    reviews: [{type:Schema.Types.ObjectId, ref: "Review"}],
    pluginFile: {type: String, required: true}
},{
    toObject: {virtuals: true},
    toJSON:{virtuals:true}
})

productSchema.virtual('averageRating').get(function() {
    if (this.reviews.length > 0) {
        let sum = this.reviews.reduce((total,review) => {
            return total + review.rating
        },0)
        return sum / this.reviews.length
    }
    return 0
})

const Plugin = mongoose.model('Plugin', productSchema);

module.exports = Plugin;