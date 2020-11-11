import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const auth = async (req, res, next) => {
    let token
    try {
        if (req.header('jwtToken')) {
            token = req.header('jwtToken')
        }
        if (!token) {
            return res.status(401).json({ msg: 'No Token' })
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decode.id)
        next()
    } catch (error) {
        res.status(400).json({ msg: 'Invalid Token' })
    }
}

export const admin = async (next) => {
    try {
        if (req.user && req.user.isAdmin) {
            next()
        }
    } catch (error) {
        res.status(401).json({ msg: 'You are not authorized to do this' })
    }
}