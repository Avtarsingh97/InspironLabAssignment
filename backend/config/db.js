const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.set('strictQuery',true);

mongoose.connect(process.env.DB_URL).then(()=>console.log('Database Connected')).catch((error)=>{console.log('Database connection is not established');
    console.log(error);
});

mongoose.connection.on('connected',()=>{
    console.log('Mongoose default connection open');
});

mongoose.connection.on('error',(error)=>{
    console.log('Mongoose default connection has an error:' , error);
});

mongoose.connection.on('disconnected',()=>{
    console.log('Mongoose connection disconnected');
})

process.on('SIGINT',()=>{
    process.exit(0);
})

module.exports = mongoose.connection;