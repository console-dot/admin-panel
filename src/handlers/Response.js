const { decode, sign } = require("jsonwebtoken");

class Response {
  sendResponse = (req, res, { data, message, status, token }) => {
    try {
      const obj = { data, message, status };
      if (!status) {
        obj.status = 200;
      }
      if (
        req &&
        req?.headers.authorization &&
        req?.headers.authorization !== "undefined"
      ) {
        const t = req?.headers.authorization.split(" ")[1];
        const decoded = decode(t);
        delete decoded?.iat;
        delete decoded?.exp;
        if (decoded)
          token = sign(decoded, process.env.JWT_SECRET, { expiresIn: "10m" });
      }
      return res.status(obj.status).json({ ...obj, token });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", status: 500 });
    }
  };
}
module.exports = Response;
