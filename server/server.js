const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDb } = require('./configure/db');
const allRoutes = require('./routes/allRoutes');

const authMiddleware = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

// const cloudinary = require('./configure/cloudinary');


dotenv.config()
connectDb()
const port = process.env.PORT 


const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set(express.static("uploads"))
app.use("/api/v1",allRoutes);




app.get('/',(req,res)=>{
    res.send("<h1>Welcome To Hans Builder</h1>");
});
app.get('/error', (req, res) => {
    throw new Error('This is a test error');
});

// Error Handling Middleware
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server is running on `,port);
})