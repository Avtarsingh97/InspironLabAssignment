
const {verifyToken} = require('../services/token.service');
const UserModel = require('../models/user.model');

// Middleware to protect routes that require authentication
const protect = async(req, res, next)=>{
    let token;

    // Check if the Authorization header is present and starts with "Bearer"
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        token = req.headers.authorization.split(' ')[1];
    }

    // If token is not found, return an unauthorized error
    if(!token){
        return res.status(401).json({
            success : false,
            message : "You are not logged in! Please Login First"
        })
    }

    try {
        // Verify and decode the JWT token
        const decoded = await verifyToken(token);

        // Find the user in the database using the ID from the token
        const currentUser = await UserModel.findById(decoded._id);

        // If user does not exist, return an unauthorized error
        if(!currentUser){
            return res.status(401).json({
                success:false,
                message:"The token is no longer exists"
            })
        }

        // Attach the authenticated user to the request object for further use
        req.user = currentUser;
         
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If token verification fails or any other error occurs
        console.log("JWT Token Error: ",error);
        return res.status(401).json({
            success : false,
            message : "You are not allowed"
        })
    }
}


module.exports = {
    protect
}