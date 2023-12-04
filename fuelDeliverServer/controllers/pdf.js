const router = require('express').Router();
const mapErrors = require('../utils/mapper');
const { createInvoice } = require('../services/pdf');

router.post('/invoice', async (req, res) => {
    try {
        const pdfBuffer = await createInvoice(req.body);
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);
    } catch (err) {
        const error = mapErrors(err);
        console.error(err.message);
        res.status(400).json({ message: error });
    }
});

module.exports = router;
