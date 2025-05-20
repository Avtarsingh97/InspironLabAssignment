
const {verifyToken} = require('../services/token.service');
const UserModel = require('../models/user.model');

const protect = async(req, res, next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return res.status(401).json({
            success : false,
            message : "You are not logged in! Please Login First"
        })
    }

    try {
        const decoded = await verifyToken(token);

        const currentUser = await UserModel.findById(decoded._id);

        if(!currentUser){
            return res.status(401).json({
                success:false,
                message:"The token is no longer exists"
            })
        }

        req.user = currentUser;

        next();
    } catch (error) {
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