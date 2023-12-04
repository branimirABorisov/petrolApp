const mongooseConnect = require('../utils/mongoose');
const router = require('express').Router();
const mapErros = require('../utils/mapper');
const { createNewOrder, getAllOrders, getOrderById, updateOrderById, deleteOrderById } = require('../services/order');


router.get('/', async (req, res) => {
    await mongooseConnect();

    try {
        const result = await getAllOrders();
        res.json(result);
    } catch (err) {
        const error = mapErros(err);
        console.error(err.message);
        res.status(400).json({ message: error }); 
    }
})

router.get('/:orderId', async(req, res) => {

    const orderdId = req.params.orderId;
    
    try {
        const result = await getOrderById(orderdId);
        res.json(result);
    } catch (err) {
        const error = mapErros(err);
        console.error(err.message);
        res.status(400).json({ message: error }); 
    }
})


router.put('/:orderId', async (req, res) => {
    const orderId = req.params.orderId;
    const data = {
        assignTo: req.body.assignTo,
        orderStatus: req.body.orderStatus
    }
    
    try {
        const result = await updateOrderById(orderId, data)
        res.json(result);
    } catch (err) {
        const error = mapErros(err);
        console.error(err.message);
        res.status(400).json({ message: error }); 
    }
})


router.post('/', async (req, res) => {
    
    await mongooseConnect();
    const {name, companyName, vat, phone, address, email, products} = req.body;
    
    try {
        const result = await createNewOrder({name, companyName, vat, phone, address, email, products});
        res.status(200).json(result);
    } catch (err) {
        const error = mapErros(err);
        console.error(err.message);
        res.status(400).json({ message: error }); 
    }
})


router.delete('/:orderId', async (req, res) => {
    await mongooseConnect();
    const orderId = req.params.orderId;
    console.log(req);
    
    try {
        const result = await deleteOrderById(orderId);
        res.json(result);
    } catch (err) {
        const error = mapErros(err);
        console.error(err.message);
        res.status(400).json({ message: error }); 
    }
})


module.exports = router;