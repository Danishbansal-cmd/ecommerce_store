const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/userRoutes')
const rolesRoutes = require('./routes/rolesRoutes')
const departmentRoutes = require('./routes/departmentRoutes')
const productRoutes = require('./routes/productRoutes')

require('dotenv').config();
const cookieParser = require('cookie-parser')

//create a connection with the mongoose db
mongoose.connect('mongodb+srv://danishbansal60:danishbansal60@cluster0.1nn7p.mongodb.net/').then((data) => console.log('DB Connected')).catch((error) => console.log(error));

const app = express();

const PORT = process.env.SERVER_PORT;

const allowedOrigins = ['http://localhost:5173','http://localhost:5174']
app.use(cors({
    origin : function(origin, callback){
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else {
            callback(new Error('Not allowed, blocked by cors'))
        }
    },
    methods : ['GET','POST','PUT','DELETE'],
    allowedHeaders : '',
    credentials : true
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hel xpress');
})

app.use('/api/v1', authRoutes)
app.use('/api/v1', rolesRoutes)
app.use('/api/v1', departmentRoutes)
app.use('/api/v1', productRoutes)

app.listen(PORT, () => {
    console.log('listening on port ' , PORT)
})