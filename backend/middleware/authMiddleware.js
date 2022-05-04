import expressAsyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

export const protect = expressAsyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)
        const user = await User.findById(decoded.userId).select("-password")
        if (user) {
            req.user = user
            next()
        } else {
            res.status(401)
            throw new Error("Not authorization")
        }
    }

    if (!token) {
        res.status(401)
        throw new Error("Not authorization")
    }
})
