const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        productName: { type: String },
        productShortCode: { type: String },
        category: { type: String },
        price: { type: Number },
        count: { type: Number },
        inCart: { type: Number },
        description: { type: String },
        imageUrl: { type: String },
        isBestAchived: { type: String },
        createdDate: { type: Date },
        origin: { type: String },
    }
)


const Product = mongoose.model('Product', productSchema);

module.exports = Product;