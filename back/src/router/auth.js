const router = require("express").Router();
const { Usuarios, Roles, sequelize } = require("../model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Resend } = require("resend");

const JWT_SECRET = process.env.JWT_SECRET;

router.get("/debug-fks", async (req, res) => {
  const [rows] = await sequelize.query(`
    SELECT
      tc.constraint_name, tc.table_name, kcu.column_name, rc.delete_rule, ccu.table_name AS references_table
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
    JOIN information_schema.referential_constraints rc ON tc.constraint_name = rc.constraint_name
    JOIN information_schema.constraint_column_usage ccu ON rc.unique_constraint_name = ccu.constraint_name
    WHERE tc.constraint_type = 'FOREIGN KEY'
    ORDER BY tc.table_name
  `);
  res.json(rows);
});

router.post("/debug-fix-fks-2", async (req, res) => {
  try {
    await sequelize.query(`
      ALTER TABLE comentarios_publicacion
        DROP CONSTRAINT comentarios_publicacion_publicacion_id_fkey,
        ADD CONSTRAINT comentarios_publicacion_publicacion_id_fkey
          FOREIGN KEY (publicacion_id) REFERENCES publicaciones(id)
          ON UPDATE CASCADE ON DELETE CASCADE;
    `);
    await sequelize.query(`
      ALTER TABLE noticia_imagenes
        DROP CONSTRAINT noticia_imagenes_noticia_id_fkey,
        ADD CONSTRAINT noticia_imagenes_noticia_id_fkey
          FOREIGN KEY (noticia_id) REFERENCES noticias(id)
          ON UPDATE CASCADE ON DELETE CASCADE;
    `);
    await sequelize.query(`
      ALTER TABLE publicacion_imagenes
        DROP CONSTRAINT publicacion_imagenes_publicacion_id_fkey,
        ADD CONSTRAINT publicacion_imagenes_publicacion_id_fkey
          FOREIGN KEY (publicacion_id) REFERENCES publicaciones(id)
          ON UPDATE CASCADE ON DELETE CASCADE;
    `);
    res.json({ ok: true, message: "Constraints actualizadas a CASCADE" });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Usuarios.findOne({
      where: { email: email.toLowerCase() },
      include: {
        model: Roles,
        as: "rol",
        attributes: ["rol"],
      },
    });

    if (!user) {
      return res.status(401).json({ message: "usuario no encontrado" });
    }

    if (user.rol?.rol === "pendiente") {
      return res
        .status(401)
        .json({
          message: "No se le ha asignado una contraseña a este usuario",
        });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    const { password_hash, rol, rol_id, ...rest } = user.toJSON();

    res.json({ token, user: { ...rest, rol: rol?.rol || null } });
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
    const existingUser = await Usuarios.findOne({
      where: { email: email.toLowerCase() },
    });
    if (existingUser) {
      return res.status(409).json({ message: "El email ya está registrado" });
    }

    const rolPendiente = await Roles.findOne({ where: { rol: "pendiente" } });

    const nuevoUsuario = await Usuarios.create({
      nombre,
      email,
      username,
      password_hash: null,
      rol_id: rolPendiente.id,
    });

    const { password_hash: _, ...userSinPassword } = nuevoUsuario.toJSON();

    res.status(201).json({
      message: "Usuario registrado con éxito",
      user: userSinPassword,
    });
  } catch (err) {
    console.error("Error en el registro:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.put("/change-password", async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  if (!userId || !newPassword) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    const user = await Usuarios.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.password_hash) {
      const match = await bcrypt.compare(currentPassword, user.password_hash);
      if (!match) {
        return res
          .status(401)
          .json({ message: "Contraseña actual incorrecta" });
      }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password_hash = hashedPassword;
    await user.save();
    res.json({ message: "Contraseña actualizada con éxito" });
  } catch (err) {
    console.error("Error al cambiar contraseña:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.post("/asignar-password", async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "Falta el ID del usuario" });
  }
  try {
    const user = await Usuarios.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await asignarPasswordTemporal(user);
    res.json({ message: "Contraseña asignada y enviada por correo" });
  } catch (error) {
    console.error("Error asignando contraseña", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Falta el email" });
  }

  const mensaje =
    "Si el email está registrado, te enviamos una contraseña temporal";

  try {
    const user = await Usuarios.findOne({ where: { email: email.toLowerCase() } });

    if (user) {
      await asignarPasswordTemporal(user);
    }

    res.json({ message: mensaje });
  } catch (error) {
    console.error("Error en recuperación de contraseña", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

async function asignarPasswordTemporal(user) {
  const tempPassword = Math.random().toString(36).slice(-8);
  const hashedPassword = await bcrypt.hash(tempPassword, 10);
  const rolUsuario = await Roles.findOne({ where: { rol: "usuario" } });

  user.password_hash = hashedPassword;
  user.rol_id = rolUsuario.id;
  await user.save();

  await sendPasswordEmail(user.email, tempPassword);
}

async function sendPasswordEmail(email, passwordTemporal) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; color: #333;">
        <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <div style="text-align: center;">
            <h2 style="color: #2c3e50;">Chaco Radio Club</h2>
          </div>
          <p>Hola,</p>
          <p>Te enviamos tu contraseña temporal para que puedas acceder al sistema:</p>
          <p style="font-size: 18px; font-weight: bold; color: #d35400;">${passwordTemporal}</p>
          <p>Por favor, cambiala apenas inicies sesión por una nueva contraseña segura.</p>
          <hr style="margin: 30px 0;" />
          <p style="font-size: 12px; color: #888;">Este correo fue generado automáticamente. Si no lo solicitaste, por favor ignoralo.</p>
        </div>
      </div>
    `;

  await resend.emails.send({
    from: `Soporte Chaco Radio Club <${process.env.RESEND_FROM_EMAIL}>`,
    to: email,
    subject: "Tu contraseña temporal",
    html: htmlContent,
  });
}

module.exports = router;
