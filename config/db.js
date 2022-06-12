const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const connectDB = async () => {

    const db = process.env.DATABASE;

    // console.log({ db });


    try {
        mongoose.connect
            (db, {
                useNewUrlParser: true,

            })

        console.log(' DB connected !👌👌');
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }



}

module.exports = connectDB;