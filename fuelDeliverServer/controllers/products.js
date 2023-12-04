const router = require('express').Router();
const api = require('../services/products');
const mapErros = require('../utils/mapper');
const mongooseConnect = require('../utils/mongoose');



router.post('/', async (req, res) => {
    await mongooseConnect();
    const {productName, price, images, unit, category, description} = req.body;
    

    try {
        const result = await api.createProduct({productName, price, images, unit, category, description});
        res.status(200).json(result);
    } catch (err) {
        const error = mapErros(err);
        console.error(err.message);
        res.status(400).json({ message: error });
    }
})

router.get('/', async (req, res) => {
    await mongooseConnect();

    try {
        const result = await api.getAllProducts();
        res.json(result);
    } catch (err) {
        const error = mapErros(err);
        console.error(err.message);
        res.status(400).json({ message: error }); 
    }
})

router.get('/:productId', async (req, res) => {

    const id = req.params.productId;
    try {
        const product = await api.getProductById(id);
        res.json(product);

    } catch (err) {
        const error = mapErros(err);
        console.error(err.message);
        res.status(400).json({ message: error });  
    }
})


router.put ('/:productId', async (req, res) => {
    const id = req.params.productId;
    const product = {
        productName: req.body.productName,
        price: req.body.price,
        images: req.body.images,
        unit: req.body.unit,
        category: req.body.category,
        description: req.body.description
    }

    try {
        const updatedProduct = await api.updateProductById(id, product);
        res.json(updatedProduct);
    } catch (err) {
        const error = mapErros(err);
        console.error(err.message);
        res.status(400).json({ message: error });   
    }
})


router.delete('/:productId', async(req, res) => {
    try {
        const productId = req.params.productId;
        await api.deleteProductById(productId);
        res.status(204).end();
    } catch (err) {
        const error = mapErros(err);
        console.error(err.message);
        res.status(400).json({ message: error });   
    }
})















module.exports = router;

