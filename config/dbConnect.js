const mongoose = require('mongoose');


const dbConnect = async () => {
    try {
        await mongoose.connect(`${process.env.DATABASE}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connection established');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

module.exports = dbConnect;
