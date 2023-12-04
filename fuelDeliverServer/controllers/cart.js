const router = require('express').Router();
const mapErros = require('../utils/mapper');
const mongooseConnect = require('../utils/mongoose');
const api = require('../services/cart');


router.post('/', async (req, res) => {


    await mongooseConnect();

    const ids = req.body.ids;
    try {
        const cartProducts = await api.getCartProducts(ids);
        
        res.json(cartProducts);
    } catch (err) {
        const error = mapErros(err);
        console.error(err.message);
        res.status(400).json({ message: error });  
    }
})


module.exports = router;
