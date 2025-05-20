const jwt = require('jsonwebtoken');
const moment = require('moment');
require('dotenv').config();

const genearteToken = (userId, expires, secret)=>{
    const payload = {
        _id: userId,
        iat:moment().unix(),
        exp: expires.unix()
    };
    return jwt.sign(payload,secret)
};

const generateAuthTokens = async(user) => {
    const accessTokenExpires = moment().add(
        process.env.JWT_ACCESS_EXPIRATION_DAYS, "days"
    );

    const accessToken = genearteToken(
        user._id, 
        accessTokenExpires, 
        process.env.JWT_ACCESS_SECRET
    );

    return accessToken;
};


const verifyToken = async(token) => {
    return await jwt.verify(token,process.env.JWT_ACCESS_SECRET);
}

module.exports = {
    generateAuthTokens,
    verifyToken
}