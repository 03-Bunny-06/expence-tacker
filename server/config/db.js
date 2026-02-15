const mongoose = require("mongoose");

const connectDb = async() => {
    try{
        const dbUrl = process.env.DATABASE_URL;
        await mongoose.connect(dbUrl);
        console.log(`Database connection successful ✅`);
    }
    catch(e){
        console.log(`Mongo DB Error ❌: ${e.message}`);
    }
}

module.exports = connectDb;