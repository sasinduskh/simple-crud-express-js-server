const express = require('express');
const { addNewProduct, findProduct, deletProduct, editProduct, getAll, searchProduct } = require('../controller/productController');

const productRouter = express.Router();


productRouter.get('/', getAll);

productRouter.get('/search/', searchProduct);

productRouter.get('/find/:name', findProduct);


// File Upload

const multer = require('multer');
const { s3Uploadv2 } = require('../s3');
const productModel = require('../model/productModel');
const uuid = require("uuid").v4;

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === 'image') {
        cb(null, true);
    } else {
        cb(new Error("file is not of the correct type"), false);
    }
}

const upload = multer({ storage });



productRouter.post('/new', upload.single("file"), async (req, res) => {

    try {
        const file = req.file

        const { productName, productDescription } = req.body

        const upResult = await s3Uploadv2(file)

        if (!productName || !productDescription) {
            return res.status(400).json({ error: 'Please Enter all data...' })
        }

        const result = await productModel.create({ productName, productDescription, imageUrl: upResult.Location })

        if (!result) {
            return res.status(400).json({ error: 'Something Wrong..!' })
        }

        res.status(200).json({ message: 'success', data: result })
    } catch (err) {
        console.log(err);
    }
});

productRouter.post('/delete/:id', deletProduct);

productRouter.post('/edit/:id', editProduct);



module.exports = productRouter;