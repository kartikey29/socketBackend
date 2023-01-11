const JWT = process.env.jwt;
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

exports.verifyToken = async (req, res, next) => {
  try {
    const header = req.header("Authorization");
    if (header === undefined) {
      return res.status(400).json({
        sucess: false,
        message: "Unauthorized Request!",
        data: [],
      });
    } else {
      const token = header.replace("Bearer ", "");
      jwt.verify(token, JWT, async (err, decoded) => {
        if (err) {
          return res.status(400).json({
            sucess: false,
            message: err.message,
            data: [],
          });
        } else {
          const _id = decoded._id;
          let checkUser;
          if (!_id) {
            res.status(400).json({
              sucess: false,
              error: "Authentication Failed ",
              data: [],
            });
          }
          checkUser = await User.findById(_id);
          if (!checkUser) {
            return res.status(400).json({
              sucess: false,
              error: "Authentication Failed ",
              data: [],
            });
          }
          req.user = checkUser;
          next();
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Server is not responding",
    });
  }
};
