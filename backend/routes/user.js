import express from 'express'
import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import { auth } from '../middleware/auth.js'
import upload from '../middleware/multer.js'

const router = express.Router()

router.post('/register', async (req, res) => {
    const { name, email, password, isAdmin } = req.body
    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ msg: 'email already exists' })
        }
        user = new User({
            name, email, password, isAdmin
        })
        await user.save()
        const token = user.signedWithToken()
        res.json({ user, token })
    } catch (error) {
        res.status(500).json({ msg: 'Server Erro' })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: 'email not exists' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ msg: 'Incorrect Password' })
        }
        const token = user.signedWithToken()
        res.json({ user, token })
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        if (!user) {
            return res.status(400).json({ msg: 'User not found' })
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })        
    }
})

router.put('/', auth, async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(400).json({ msg: 'User Not Found' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ msg: 'Your password is wrong' })
        }
        user.email = email
        await user.save()
        res.json(user)
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.put('/website', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(400).json({ msg: 'No User found' })
        }
        user.name = req.body.name
        await user.save()
        const token = user.signedWithToken()
        res.json({user, token})
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.put('/photoupload', upload.single('avatar'), auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(400).json({ msg: 'No Uswr Found' })
        }
        user.avatar = req.file.path
        await user.save()
        res.json(user)
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.put('/changepassword', auth, async (req, res) => {
    const { currentPassword, newPassword } = req.body
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(400).json({ msg: 'No User found' })
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isMatch) {
            return res.status(400).json({ msg: 'Your Password was incorrect' })
        }
        user.password = newPassword
        await user.save()
        res.json({ msg: 'Passsword Changed' })
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.delete('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        await user.remove()
        res.json({ msg: 'Account Closed' })
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
})


export default router