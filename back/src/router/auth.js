const router = require("express").Router();
const {Usuarios, Roles} = require("../model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || 'brbrpatapim';

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await Usuarios.findOne({
        where: { email },
        include: {
          model: Roles,
          as: 'rol',
          attributes: ['rol'] 
        }
      });

      if(user.rol.rol_id === 1) {
        return res.status(401).json({message: "No se le ha asignado una contraseña a este usuario"})
      }
  
      if (!user) {
        return res.status(401).json({ message: "usuario no encontrado" });
      }
  
      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }
  
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
  
      const { password_hash, ...safeUser } = user.toJSON();
  
      res.json({ token, user: safeUser });
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.post("/register", async (req, res) => {
    const { nombre, email, username } = req.body;
  
    if (!nombre || !email || !username) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }
  
    try {
      const existingUser = await Usuarios.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: "El email ya está registrado" });
      }
  
      const nuevoUsuario = await Usuarios.create({
        nombre,
        email,
        username,
        password_hash: null,
        rol_id: 1 
      });
  
      const { password_hash: _, ...userSinPassword } = nuevoUsuario.toJSON();
  
      res.status(201).json({
        message: "Usuario registrado con éxito",
        user: userSinPassword
      });
    } catch (err) {
      console.error("Error en el registro:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });
  

module.exports = router;