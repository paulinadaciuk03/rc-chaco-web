 const router = require('express').Router();
const {Noticias, NoticiaImagenes, Usuarios} = require("../model") 

router.post("/", async (req, res) => {
  console.log("Body recibido en POST /noticias:", req.body);
    try{
        const {titulo, descripcion, admin_id, imagenes} = req.body;

        const noticia  = await Noticias.create({titulo, descripcion, admin_id});

        if( imagenes && imagenes.length){
            const imagenRecords = imagenes.map((img) => ({
                noticia_id: noticia.id,
                url_imagen: img.url_imagen,
            }));
            await NoticiaImagenes.bulkCreate(imagenRecords);
        }

        res.status(201).json(noticia);
    }catch(error){
        console.error("Error al crear la noticia:", error);
        res.status(500).json({error: "Error al crear la noticia"});
    }
});

router.get("/", async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 3;
      const totalNoticias = await Noticias.count();
      const totalPages = Math.ceil(totalNoticias / limit);
  

      const currentPage = page > totalPages ? totalPages : page;
  
      const offset = (currentPage - 1) * limit;
  

      if (totalNoticias === 0 || currentPage < 1) {
        return res.json({
          noticias: [],
          totalPages,
          currentPage: 1,
          total: 0,
        });
      }
  
      const { count, rows } = await Noticias.findAndCountAll({
        include: [{ model: NoticiaImagenes, as: "imagenes" },
          {model: Usuarios, as: "admin"}
        ],
        order: [["fecha_publicacion", "DESC"]],
        limit,
        offset,
      });
  
      const noticiasPreview = rows.map(noticia => ({
        id: noticia.id,
        titulo: noticia.titulo,
        descripcion:
          noticia.descripcion.slice(0, 350) +
          (noticia.descripcion.length > 350 ? "..." : ""),
        fecha_publicacion: noticia.fecha_publicacion,
        imagen_portada: noticia.imagenes[0]?.url_imagen || null,
        admin: noticia.admin ? {
          id: noticia.admin.id,
          nombre: noticia.admin.nombre,
          email: noticia.admin.email
        } : null
      }));
  
      res.json({
        total: count,
        currentPage,
        totalPages,
        noticias: noticiasPreview,
      });
    } catch (error) {
      console.error("Error al obtener noticias paginadas:", error);
      res.status(500).json({
        message: "Error al obtener noticias paginadas",
        error,
      });
    }
  });

router.get("/:id", async (req,res) => {
    try {
        const noticia = await Noticias.findByPk(req.params.id, {
            include : [{model : NoticiaImagenes, as:"imagenes"},
              {model : Usuarios, as: "admin"}
            ],
        })

        if(!noticia) return res.status(404).json({message: "Noticia no encontrada"});
        res.json(noticia);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la noticia", error });
    }
})


router.put("/:id", async (req, res) => {
    try {
        const {titulo, descripcion, imagenes} = req.body;

        const noticia = await Noticias.findByPk(req.params.id);
        if(!noticia) return res.status(404).json({message: "Noticia no encontrada"});

        await noticia.update({titulo, descripcion});
        if(imagenes) {
          await NoticiaImagenes.destroy({ where: { noticia_id: noticia.id } });
          const nuevasImagenes = imagenes.map((img) => ({
            noticia_id: noticia.id,
            url_imagen: img.url_imagen,
          }));
          await NoticiaImagenes.bulkCreate(nuevasImagenes);
        }
        res.json({ message: "Noticia actualizada" });
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar noticia", error });
    }
}) 

router.delete("/:id" , async (req, res) => {
    try {
        const noticia = await Noticias.findByPk(req.params.id);
        if(!noticia) return res.status(404).json({message: "Noticia no encontrada"});

        await NoticiaImagenes.destroy({where : {noticia_id: noticia.id}});
        await noticia.destroy();

        res.json({message: "Noticia eliminada"});
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar noticia", error });
      }
})


module.exports = router;
