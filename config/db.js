const mongoose = require("mongoose");
require ("dotenv").config();
const PORT = process.env.PORT;


const connectDB = async() => {
    const dbURI = process.env.DBURI;
    await mongoose.connect(dbURI)
    .then(() => {
        console.log(`Now connected to the database on port ${PORT}`);
    })
    .catch((error) => {
        console.log(error);
        return error
    })
}


module.exports = connectDB;