const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

// route imports
const authRoutes = require("./src/routes/authRoutes");
const blogRoutes = require("./src/routes/blogRoutes");

// configurations
require("dotenv").config();
connectDB();

// Initialization
const app = express();
const PORT = process.env.PORT || 3000

// middlewares to be used
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// routes to be used 
app.use('/user', authRoutes);
app.use('/blogs', blogRoutes);


// test api
app.get('/', (req, res) => {
    res.send("This works!")
})

// start server
app.listen(PORT, () => {
    console.log(`Server runs on port ${PORT}`);
});
