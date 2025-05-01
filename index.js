
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors')

const port = process.env.PORT || 5000

require('dotenv').config()


// middleware
app.use(express.json())
app.use(cors({ origin: [
  "http://localhost:5173",
  "https://book-store-app-frontend-6v9q.vercel.app"
],
  credentials:true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']

}))

app.get('/', (req, res) => {
  res.send('Book API Server is running');
})

// routes

const bookRoutes = require("./src/books/books.route")
const orderRoutes = require("./src/orders/order.route")
const userRoutes = require("./src/users/user.route")
const adminRoutes = require("./src/stats/admin.stats")

app.use("/api/books",bookRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/auth",userRoutes)
app.use("/api/admin",adminRoutes)


// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

// Start the server after connecting to MongoDB
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
});

