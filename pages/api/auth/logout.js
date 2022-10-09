import { serialize } from "cookie";

export default async function (req, res){
    const { cookies } = req;
    
    const jwt = cookies.OursiteJWT;
    
    if(!jwt){
        return res.json({ status: 500, message: "Giriş yapman gerekli!" });
    }else{
        const serialised = serialize("OursiteJWT", null, {
           httpOnly: true,
           secure: process.env.NODE_ENV !== "development",
           sameSite: "strict",
           maxAge: -1,
           path: "/"
        });
        
        res.setHeader("Set-Cookie", serialised);
        res.status(200).json({ status: 200, message: "Successful logged out!" });
    }
}