import express from 'express'
import { auth } from '../middleware/auth.js'
import Product from '../models/product.js'
import upload from '../middleware/multer.js'

const router = express.Router()

router.post('/uploadimage', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

router.post('/', auth, async (req, res) => {
    const { image, name, price, brand, category, countInStock, numReviews, description } = req.body
    try {
        const product = new Product({
            user: req.user.id,
            name, price, image, brand, category, countInStock, numReviews, description
        })
        await product.save()
        res.json(product)
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.get('/', async (req, res) => {
    try {
        const pageSize = 4
        const page = Number(req.query.pageNumber) || 1
        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i'
            }
        } : {}
        const count = await Product.countDocuments({ ...keyword })
        const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page -1))
        res.json({products, page, pages: Math.ceil(count / pageSize)})
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('user', 'name')
        if (!product) {
            return res.status(400).json({ msg: 'No Product Found' })
        }
        res.json(product)
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.post('/:id/reviews', auth, async (req, res) => {
    const { rating, comment } = req.body
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(400).json({ msg: 'No Product found' })
        }
        const alreadyReview = product.reviews.find(r => r.user.toString() === req.user.id)
        if (alreadyReview) {
            return res.status(400).json({ msg: 'You have already reviewed' })
        }
        const addReview = {
            user: req.user.id,
            name: req.user.name,
            rating,
            comment
        }
        product.reviews.push(addReview)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length
        await product.save()
        res.json(product)
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.delete('/:productId/:reviewId/reviews', auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId)
        if (!product) {
            return res.status(400).json({ msg: 'No Product Found' })
        }
        const review = product.reviews.find(r => r.id === req.params.reviewId)
        if (!review) {
            return res.status(400).json({ msg: 'No Review Found' })
        }
        if (review.user.toString() !== req.user.id) {
            return res.status(400).json({ msg: 'You are not authorized' })
        }
        await review.remove()
        product.numReviews = product.reviews.length
        product.rating = (product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length)
        await product.save()
        res.json(product.reviews)
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

export default router