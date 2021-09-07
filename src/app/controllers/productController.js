const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const Product = require('../models/product');

router.use(authMiddleware);

function apiError(res, error) {
    // create better error handler
    return res.status(400).send({ error });
}

router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('user').populate('category');

        return res.send({ products });
    } catch (error) {
        return apiError(res, 'Error fetching products');
    }
});

router.get('/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId).populate('user').populate('category');

        return res.send({ product });
    } catch (error) {
        return apiError(res, 'Product not found');
    }
});

router.post('/', async (req, res) => {
    try {
        const product = await Product.create({ ...req.body, user: req.userId });

        return res.send({ product });
    } catch (error) {
        return apiError(res, 'Error creating product');
    }
});

router.put('/:productId', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true }).populate('user').populate('category');

        return res.send({ product });
    } catch (error) {
        console.log(error);
        return apiError(res, 'Error updating product');
    }
});

router.delete('/:productId', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.productId);

        return res.send();
    } catch (error) {
        return apiError(res, 'Error deleting product');
    }
});


module.exports = app => app.use('/api/products', router);