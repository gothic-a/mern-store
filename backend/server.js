import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import crypto from 'crypto'
import path from 'path'

import morgan from 'morgan'

import productsRoutes from './routes/productsRoutes.js'
import usersRoutes from './routes/usersRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import payRoutes from './routes/payRoutes.js'

import { notFound, errorHandler } from './middleware/errorMidd.js'

dotenv.config()

connectDB()

const app = express()

if(process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.use(express.json())

app.use('/api/products', productsRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/pay', payRoutes)

const __dirname = path.resolve()

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    
    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('Mern-store API welcome')
    })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(` server run in ${process.env.NODE_ENV} mode on ${PORT}`.black.bold.bgCyan))