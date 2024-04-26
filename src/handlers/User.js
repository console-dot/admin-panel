const { UserModel } = require("../model");
const Response = require("./Response");
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');
class User extends Response {
 
    signUp = async (req, res) => {
        try {
            const { userName, password, email } = req.body;
            if (!userName || !password || !email) {
                return this.sendResponse(req, res, { status: 403, message: "Field Missing!" });
            }
    
            let userExist = await UserModel.findOne({ email });
            if (userExist) {
                return this.sendResponse(req, res, { status: 403, message: "Account Already Exists!" });
            }
    
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);
            let newUser = new UserModel({
                userName,
                email,
                password: hashPassword
            });
            await newUser.save();
    
            const token = jwt.sign(
                { email: newUser.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
    
            return this.sendResponse(req, res, { status: 200, message: "User created!", token: token });
        } catch (err) {
            console.error(err);
            return this.sendResponse(req, res, { status: 500, message: "Internal server error" });
        }
    };
    
}

module.exports ={User}