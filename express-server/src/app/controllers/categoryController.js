const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const Category = require('../models/category');

router.use(authMiddleware);

function apiError(res, error) {
    // create better error handler
    return res.status(400).send({ error });
}

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();

        return res.send({ categories });
    } catch (error) {
        return apiError(res, 'Error fetching categories');
    }
});

router.get('/:categoryId', async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);

        return res.send({ category });
    } catch (error) {
        return apiError(res, 'Category not found');
    }
});

router.post('/', async (req, res) => {
    try {
        const category = await Category.create({ ...req.body, user: req.userId });

        return res.send({ category });
    } catch (error) {
        return apiError(res, 'Error creating category');
    }
});

router.put('/:categoryId', async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.categoryId, req.body, { new: true });

        return res.send({ category });
    } catch (error) {
        console.log(error);
        return apiError(res, 'Error creating category');
    }
});

router.delete('/:categoryId', async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.categoryId);

        return res.send();
    } catch (error) {
        return apiError(res, 'Error deleting category');
    }
});

module.exports = app => app.use('/api/categories', router);