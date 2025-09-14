import jwt from "jsonwebtoken";

const authMiddleware = (rolesAllowed = []) => {
  return (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "No token found, access denied 🚫" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (rolesAllowed.length && !rolesAllowed.includes(decoded.role)) {
        return res.status(403).json({ msg: "Access denied 🚫" });
      }
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ msg: error.message });
    }
  };
};

export default authMiddleware;
