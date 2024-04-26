const { UserModel } = require("../model");
const Response = require("./Response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class User extends Response {
  login = async (req, res) => {
    try {
      const { password, email } = req.body;

      if (!email || !password) {
        return this.sendResponse(req, res, {
          status: 400,
          message: "Email or Password Required",
        });
      }

      let userExist = await UserModel.findOne({
        email: email,
      });

      if (!userExist) {
        return this.sendResponse(req, res, {
          status: 401,
          message: "Invalid email/Password",
        });
      }

      const isValidPassword = await bcrypt.compare(
        password,
        userExist.password
      );

      if (!isValidPassword) {
        return this.sendResponse(req, res, {
          status: 405,
          message: "email or Password Incorrect",
        });
      }

      const token = jwt.sign({ id: userExist.email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return this.sendResponse(req, res, {
        status: 200,
        message: "Login successful",
        token: token,
      });
    } catch (err) {
      console.error(err);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal server error",
      });
    }
  };

  signUp = async (req, res) => {
    try {
      console.log(req.body);
      const { userName, password, email } = req.body;
      if (!userName || !password || !email) {
        return this.sendResponse(req, res, {
          status: 403,
          message: "Field Missing!",
        });
      }

      let userExist = await UserModel.findOne({ email });
      if (userExist) {
        return this.sendResponse(req, res, {
          status: 403,
          message: "Account Already Exists!",
        });
      }

      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      let newUser = new UserModel({
        userName,
        email,
        password: hashPassword,
      });
      await newUser.save();

      const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return this.sendResponse(req, res, {
        status: 200,
        message: "User created!",
        token: token,
      });
    } catch (err) {
      console.error(err);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal server error",
      });
    }
  };
}

module.exports = { User };
