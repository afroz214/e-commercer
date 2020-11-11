import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import userRoute from './routes/user.js'
import productRoute from './routes/product.js'
import orderRoute from './routes/order.js'
import path from 'path'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use(morgan('dev'))

app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/orders', orderRoute)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
  } else {
    console.log('development')
  }

const PORT = process.env.PORT || 4000

app.listen(PORT, console.log(`listening at ${PORT}`))



