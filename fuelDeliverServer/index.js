const express = require('express');
const cors = require('cors');
const { MongoClient } = require("mongodb");
const usersController = require('./controllers/users');
const uploadController = require('./controllers/upload');
const productsController = require('./controllers/products');
const cartController = require('./controllers/cart');
const orderController = require('./controllers/orders');
const pdfController = require('./controllers/pdf');
const cookieParser = require('cookie-parser');
require('dotenv').config();


const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

start();

async function start() {
    if (!process.env.MONGODB_URI) {
        throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
    }
    const uri = process.env.MONGODB_URI;
    const options = {};

    let client;
    let clientPromise;


    if (process.env.NODE_ENV === "development") {

        if (!global._mongoClientPromise) {
            client = new MongoClient(uri, options)
            global._mongoClientPromise = client.connect()
        }
        clientPromise = global._mongoClientPromise
    } else {
        client = new MongoClient(uri, options)
        clientPromise = client.connect()
    }

    clientPromise
    .then(() => {
        console.log('Connected to MongoDB successfully!');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    });

    const app = express();

    app.use(express.json());
    app.use(cors(corsOptions));
    app.use(cookieParser());



    app.use('/users', usersController);
    app.use('/data', uploadController);
    app.use('/products', productsController);
    app.use('/orders', orderController);
    app.use('/cart', cartController);
    app.use('/create', pdfController);

    app.get('/', (req, res) => res.json({ msg: 'Rest is ok' }));
    app.listen(5000, () => console.log('REST Services started on port 5000...'));

}