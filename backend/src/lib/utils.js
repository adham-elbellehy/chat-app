import jwt from "jsonwebtoken"

export const generateToken= (userId, res) => {

    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:"7d"
    })
    //sending token in cookie
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //age in millieseconds 7days
        httpOnly: true, //prevents XSS attacks cross-site scripting attacks
        sameSite: "strict", // prevent CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !=="development" //is true if site is not in development process (https) 
    })
    return token
}