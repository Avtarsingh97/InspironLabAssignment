const jwt = require('jsonwebtoken');
const moment = require('moment');
require('dotenv').config();

// Function to generate a signed JWT token with user ID and expiration
const genearteToken = (userId, expires, secret)=>{
    const payload = {
        _id: userId,
        iat:moment().unix(),
        exp: expires.unix()
    };
    return jwt.sign(payload,secret)
};

// Function to generate a signed JWT token with user ID and expiration
const generateAuthTokens = async(user) => {
    const accessTokenExpires = moment().add(
        process.env.JWT_ACCESS_EXPIRATION_DAYS, "days"
    );

    // Generate the access token using the user's ID and expiration
    const accessToken = genearteToken(
        user._id, 
        accessTokenExpires, 
        process.env.JWT_ACCESS_SECRET
    );

    return accessToken;
};

// Function to verify a given JWT token using the access secret
const verifyToken = async(token) => {
    return await jwt.verify(token,process.env.JWT_ACCESS_SECRET);
}

module.exports = {
    generateAuthTokens,
    verifyToken
}