const mongoose = require('mongoose');

//const connectString = 'mongodb+srv://fidazik:ABC_1234@node-express-app.hp8bg.mongodb.net/?retryWrites=true&w=majority';

const connectDB = (url) => {
    return mongoose.connect(url);
};

module.exports = connectDB;