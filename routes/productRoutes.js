const express = require('express');
const { addNewProduct, findProduct, deletProduct, editProduct } = require('../controller/productController');

const router = express.Router();


router.get('/:name', findProduct);

router.post('/new', addNewProduct);

router.post('/delete/:id', deletProduct);

router.post('/edit/:id', editProduct);



module.exports = router;