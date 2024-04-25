const Response = require("../handlers/Response");
const jwt = require('jsonwebtoken');

class Auth extends Response{
    authentication = (req,res, next)=>{
        const authHeader = req.headers['authorization'];
        const token= authHeader && authHeader.split(' ')[1];

        if(!token){
            return this.sendResponse(req, res ,{
                status:400,
                message:"Un Authorized Request"
            })
        }
        jwt.verify(token , process.env.JWT_SECRET, (err,user)=>{
            if(err){
                return this.sendResponse(res, err , {
                    status:403,
                    message:"Forbidden"
                })
            }
            req.user =user;
            next();
        })
    }
}
module.exports = Auth;