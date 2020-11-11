import express from 'express'
import { auth } from '../middleware/auth.js' 
import Order from '../models/order.js'

const router = express.Router()

router.post('/', auth, async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body
    try {
        const order = new Order({
            user: req.user.id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        })
        await order.save()
        res.json(order)
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
        if (!orders) {
            return res.status(400).json({ msg: 'No Orders Yet' })
        }
        res.json(orders)
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email')
        if (!order) {
            return res.status(400).json({ msg: 'No Order Found' })
        }
        res.json(order)
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

export default router