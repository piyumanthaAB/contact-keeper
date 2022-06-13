const express = require('express');
const connectDB = require('./../config/db');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));

//connect to DB
connectDB();

app.use(cookieParser());
app.use(cors());

app.use(morgan('dev'));


// Define ROutes

app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

// Serve static assetsin Production
if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
    })

}

console.log({'running port🛑🛑🛑':process.env.PORT});

const PORT = process.env.PORT || 5000 ;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})