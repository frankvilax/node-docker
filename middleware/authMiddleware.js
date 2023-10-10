const protect = (req, res, next) => {
  const { user } = req.session;

  if (!user) {
    return res.status(401).json({ message: "unauthorized" });
  }

  // add user to the request to avoid down the line using the session
  req.user = user;

  // forward the request to the corresponding controller or to the next middleware in the stack
  next();
};

module.exports = protect;
