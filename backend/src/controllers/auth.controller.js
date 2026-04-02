//controladores de autenticación: register, login, logout, authorized

import bcrypt from "bcryptjs";
import { User } from "../models/User.model.js";
import {
  buildAuthCookieOptions,
  sanitizeAuthUser,
  signAccessToken,
  TOKEN_COOKIE_NAME,
} from "../middlewares/authenticate.middleware.js";

const findUserByEmail = async (email) => User.findOne({ where: { email } });

export const register = async (req, res) => {
  try {
    const { name, email, password, role = 2 } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Ya existe un usuario con ese email." });
    }

    const psw_hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, psw_hash, role });
    const safeUser = sanitizeAuthUser(user);
    const token = signAccessToken(safeUser);

    res.cookie(TOKEN_COOKIE_NAME, token, buildAuthCookieOptions());

    return res.status(201).json({
      message: "Usuario registrado correctamente.",
      user: safeUser,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "No se pudo registrar el usuario." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    const passwordMatches = await bcrypt.compare(password, user.psw_hash);
    if (!passwordMatches) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    const safeUser = sanitizeAuthUser(user);
    const token = signAccessToken(safeUser);

    res.cookie(TOKEN_COOKIE_NAME, token, buildAuthCookieOptions());

    return res.status(200).json({
      message: "Login correcto.",
      user: safeUser,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "No se pudo iniciar sesión." });
  }
};

export const logout = (req, res) => {
  res.clearCookie(TOKEN_COOKIE_NAME, buildAuthCookieOptions());
  return res.status(200).json({ message: "Logout correcto." });
};

export const authorized = (req, res) => {
  return res.status(200).json(req.user);
};
