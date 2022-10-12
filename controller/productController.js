const productModel = require("../model/productModel")



// Get All Products

const getAll = async (req, res) => {

    const result = await productModel.find({})

    if (!result) {
        return res.status(400).json({ error: 'No Data found' })
    }

    res.status(200).json({ message: 'success', data: result })
}


// find product by naeme

const searchProduct = async (req, res) => {
    const { name } = req.query

    try {

        const result = await productModel.find({
            productName: { '$regex': name, '$options': 'i' }
        })

        if (!result) {
            return res.status(400).json({ error: 'no data found' })
        }

        res.status(200).json({ message: 'success', data: result })
    } catch (err) {
        console.log(err);
    }
}

// add new product 
const addNewProduct = async (req, res) => {

    // get data
    const { productName, productDescription } = req.body

    if (!productName || !productDescription) {
        return res.status(400).json({ error: 'Please Enter all data...' })
    }

    const result = await productModel.create({ productName, productDescription })

    if (!result) {
        return res.status(400).json({ error: 'Something Wrong..!' })
    }

    res.status(200).json({ message: 'success', data: result })
}


// Edit Product

const editProduct = async (req, res) => {

    // get product data
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ error: 'please enter id' })
    }

    try {
        const result = await productModel.findByIdAndUpdate(id, {
            ...req.body
        })

        if (!result) {
            return res.status(400).json({ error: 'Something Wrong' })
        }

        res.status(200).json({ message: 'update done', data: result })
    } catch (err) {
        console.log(err);
    }
}


// Delete Product
const deletProduct = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ error: 'please enter id' })
    }

    try {
        const result = await productModel.findByIdAndDelete({ _id: id })

        if (!result) {
            return res.status(400).json({ error: 'Not Delete Product' })
        }

        res.status(200).json({ message: 'Done', data: result })
    } catch (err) {
        console.log(err);
    }
}

// find product
const findProduct = async (req, res) => {
    const { name } = req.params

    if (!name) {
        return res.status(400).json({ error: 'please enter name' })
    }

    try {
        const result = await productModel.find({ productName: name })

        if (!result) {
            return res.status(400).json({ error: 'No data found' })
        }
    } catch (err) {
        console.log(err);
    }
}
module.exports = { addNewProduct, findProduct, deletProduct, editProduct, getAll, searchProduct }