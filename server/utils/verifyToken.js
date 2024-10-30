const jwt = require("jsonwebtoken");
const { createError } = require("./error");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "You are not authenticated!"));
  jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
    if (err) return next(createError(403, "Token is invalid!!"));
    req.user = user;
    next();
  });
};

const verifyUser = (req,res,next) => {
    verifyToken(req,res,next, () => {
        if(req.user.id === req.params.id) return next();
        return next(createError(403, "You are not allowed to access this resource!"));
        })
}

exports.verifyToken = verifyToken
exports.verifyUser = verifyUser
