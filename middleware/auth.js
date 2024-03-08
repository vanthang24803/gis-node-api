import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (token == null) return res.status(401);

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.status(403);
    req.user = user;
    next();
  });
};
