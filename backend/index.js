const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

//DB connection
require('./config/db.js');

//route configuration
const routes = require('./routes/v1/index.js');
const config = require('./config/index.js');

app.use(cors({
    origin:'*'
}));


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use(config.PREFIX,routes)

app.listen(config.PORT, ()=>{
    console.log(`Server running on port http://localhost:${config.PORT}${config.PREFIX}`);
});