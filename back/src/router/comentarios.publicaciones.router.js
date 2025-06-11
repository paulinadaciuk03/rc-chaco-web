
const { ComentariosPublicaciones } = require('../model');

const router = require('express').Router();

router.get("/publicacion/:publicacionId", async (req, res) => {
    try {
      const publicacionId = req.params.publicacionId;
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
  
      const total = await ComentariosPublicaciones.count({
        where: { publicacion_id: publicacionId },
      });
  
      const totalPages = Math.max(1, Math.ceil(total / limit)); // Evita dividir por 0
      const currentPage = Math.min(Math.max(1, page), totalPages); // Asegura entre 1 y totalPages
  
      const offset = (currentPage - 1) * limit;
  
      const comentarios = await ComentariosPublicaciones.findAll({
        where: { publicacion_id: publicacionId },
        include: [
          { model: Usuarios, as: "usuario", attributes: ["id", "nombre", "rol_id"] },
        ],
        order: [["fecha_creacion", "DESC"]],
        limit,
        offset,
      });
  
      res.json({
        total,
        currentPage,
        totalPages,
        comentarios,
      });
    } catch (error) {
      console.error("Error al obtener comentarios:", error); // <- ¡esto ayuda a debuggear!
      res.status(500).json({ message: "Error al obtener comentarios", error });
    }
  });
router.post("/", async (req, res) => {
    try {
      const { publicacion_id, usuario_id, texto } = req.body;
      if (!publicacion_id || !usuario_id || !texto) {
        return res.status(400).json({ message: "Faltan datos obligatorios" });
      }
  
      const comentario = await ComentariosPublicaciones.create({ publicacion_id, usuario_id, texto });
      res.status(201).json(comentario);
    } catch (error) {
      res.status(500).json({ message: "Error al crear comentario", error });
    }
  });
  

router.delete("/:id", async (req, res) => {
    try {
      const comentario = await ComentariosPublicaciones.findByPk(req.params.id);
      if (!comentario) return res.status(404).json({ message: "Comentario no encontrado" });
  
      await comentario.destroy();
      res.json({ message: "Comentario eliminado" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar comentario", error });
    }
});

module.exports = router;