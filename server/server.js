require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/userRoutes')
const rolesRoutes = require('./routes/rolesRoutes')
const departmentRoutes = require('./routes/departmentRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const bannerRoutes = require('./routes/bannerRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const brandRoutes = require('./routes/brandRoutes')

const cookieParser = require('cookie-parser')

//create a connection with the mongoose db
mongoose.connect('mongodb+srv://danishbansal60:danishbansal60@cluster0.1nn7p.mongodb.net/').then((data) => console.log('DB Connected')).catch((error) => console.log(error));

const app = express();

const PORT = process.env.SERVER_PORT || 5000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://ecommerce-site-danish.netlify.app'); // Allow frontend domain
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // Handle preflight requests
    }

    next();
});


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello xpress');
})


app.use('/api/v1', authRoutes)
app.use('/api/v1', rolesRoutes)
app.use('/api/v1', departmentRoutes)
app.use('/api/v1', productRoutes)
app.use('/api/v1', orderRoutes)
app.use('/api/v1', bannerRoutes)
app.use('/api/v1', categoryRoutes)
app.use('/api/v1', brandRoutes)

app.listen(PORT, () => {
    console.log('listening on port ' , PORT)
})