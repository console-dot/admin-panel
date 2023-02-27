const jwt = require("jsonwebtoken");
const setResponse = (res, message = null, data = null, status = 200) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};
function authorization(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return setResponse(res, "Authorization token is required", null, 401);
  jwt.verify(token, "b2a6b21b096766b5842261c45ec4799992178b3b495869e372ce64612b6f483924d8c6db8f4be3ccc90810c1659bfc13d0c094f288670d85f96784e92d4963e6", (err, user) => {
    if (err) return setResponse(res, err, null, 403);
    req.user = user;
    next();
  });
}
module.exports = authorization;
