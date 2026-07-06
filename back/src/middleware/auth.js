const jwt = require("jsonwebtoken");
const { Usuarios, Roles } = require("../model");

const JWT_SECRET = process.env.JWT_SECRET;

async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "No autenticado" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await Usuarios.findByPk(decoded.id, {
      include: { model: Roles, as: "rol", attributes: ["rol"] },
    });

    if (!user) {
      return res.status(401).json({ message: "No autenticado" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}

async function requireAdmin(req, res, next) {
  requireAuth(req, res, () => {
    if (req.user.rol?.rol !== "admin") {
      return res.status(403).json({ message: "Requiere permisos de administrador" });
    }
    next();
  });
}

module.exports = { requireAuth, requireAdmin };
