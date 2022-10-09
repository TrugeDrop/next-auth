import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import Users from '../../../models/Users';
import connectMongo from '../../../utils/connectMongo';

const secret = process.env.SECRET;

export default async function (req, res) {
    const { username, password } = req.body;
    
    await connectMongo();
    
    Users.findOne({ username }, function(err, user){
        if(user && user.password === password){
            const token = sign({
               exp: Math.floor(Date.now() / 1000) * 60 * 60 * 24 * 30,
               _id: user._id,
               username: user.username
            }, secret);

            const serialised = serialize("OursiteJWT", token, {
               httpOnly: true,
               secure: process.env.NODE_ENV !== "development",
               sameSite: "strict",
               maxAge: 60 * 60 * 24 * 30,
               path: "/"
            });

            res.setHeader("Set-Cookie", serialised);
            res.status(200).json({ status: 200, message: "Successful!" });
        }else{
            res.json({ status: 502, message: "User not found!" });
        }
    });
}