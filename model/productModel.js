const mongoose = require('mongoose')
const Schema = mongoose.Schema


const productModel = new Schema({
    productName: {
        type: String
    },
    productDescription: {
        type: String
    },
    imageUrl:{
        type: String
    }
}, { timestamps: true });


module.exports = mongoose.model('product', productModel)