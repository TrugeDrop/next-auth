import jwt from "jsonwebtoken";

const secret = process.env.SECRET;

export default async function (req, res) {
    const { cookies } = req;
    
    const token = cookies.OursiteJWT;
    
    if(!token){
        return res.json({ status: "error", user: null, message: "User not found!" });
    }
    
    const user = jwt.verify(token, secret);
    
    res.json({  
        status: "success",
        user: {
            _id: user._id,
            username: user.username
        }
    });
};