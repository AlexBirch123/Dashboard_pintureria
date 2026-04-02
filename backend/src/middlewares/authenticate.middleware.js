// Firma y valida tokens JWT, y protege rutas mediante cookie o bearer token.
import jwt from "jsonwebtoken";

export const TOKEN_COOKIE_NAME = "access_token";
const getJwtSecret = () => process.env.SECRET_JWT || "dev-secret-change-me";
const getJwtExpiresIn = () => process.env.JWT_EXPIRES_IN || "7d";

export const sanitizeAuthUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

export const signAccessToken = (user) =>
  jwt.sign(sanitizeAuthUser(user), getJwtSecret(), { expiresIn: getJwtExpiresIn() });

export const buildAuthCookieOptions = () => ({
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
});

// Middleware para autenticar la sesion del usuario.
export const authenticate = (req, res, next) => {
  const token = req.cookies?.[TOKEN_COOKIE_NAME] || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No existe token: No autorizado" });
  }

  try {
    req.user = jwt.verify(token, getJwtSecret());
    return next();
  } catch (error) {
    return res.status(403).json({ message: "Token invalido" });
  }
};

// Middleware para autorizar roles de usuario.
export const authorizedRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "No autorizado" });
  }

  return next();
};
