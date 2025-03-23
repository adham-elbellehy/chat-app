import jwt from "jsonwebtoken";
import User from "../models/user.model.js"



export const protectRoute = async (req,res, next) =>{
    try {
        const token = req.cookies.jwt

        if(!token){
            return res.status(401).json({message: "unauthorized - No token provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded){
            return res.status(401).json({message: "unauthorized - invalid token"})
        }

        const user = await User.findById(decoded.userId).select("-password") //find user by userid inside token and send back user data without the password

        if (!user){
            return res.status(404).json({message:"User not found"})
        }

        req.user = user // if user authenticated add user to req
        next() //call next function which is update profile

    } catch (error) {
        console.log("Error in protectRoute middleware:", error.message)
        res.status(500).json({message:"Internal error"})
        
    }
}