// Hashea la contraseña del usuario antes de crear o actualizar registros.
import bcrypt from "bcryptjs";

export const hashUserPassword = async (req, res, next) => {
  try {
    if (!req.body?.psw_hash) {
      return next();
    }

    req.body.psw_hash = await bcrypt.hash(req.body.psw_hash, 10);
    return next();
  } catch (error) {
    return res.status(500).json({ message: "No se pudo procesar la contraseña." });
  }
};
