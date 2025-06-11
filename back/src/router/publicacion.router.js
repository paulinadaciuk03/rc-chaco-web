const router = require('express').Router();
const { Publicaciones, PublicacionImagenes} = require("../model") 

router.post("/", async (req, res) => {
  console.log("Body recibido en POST /publicaciones:", req.body);
    try{
        const {titulo, descripcion, usuario_id, imagenes} = req.body;

        const publicacion  = await Publicaciones.create({titulo, descripcion, usuario_id});

        if( imagenes && imagenes.length){
            const imagenRecords = imagenes.map((img) => ({
                publicacion_id: publicacion.id,
                url_imagen: img.url_imagen,
            }));
            await PublicacionImagenes.bulkCreate(imagenRecords);
        }

        res.status(201).json(publicacion);
    }catch(error){
        console.error("Error al crear la publicacion:", error);
        res.status(500).json({error: "Error al crear la publicacion"});
    }
});

router.get("/", async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 3;
      const totalPublicaciones = await Publicaciones.count();
      const totalPages = Math.ceil(totalPublicaciones / limit);
  

      const currentPage = page > totalPages ? totalPages : page;
  
      const offset = (currentPage - 1) * limit;
  

      if (totalPublicaciones === 0 || currentPage < 1) {
        return res.json({
          publicaciones: [],
          totalPages,
          currentPage: 1,
          total: 0,
        });
      }
  
      const { count, rows } = await Publicaciones.findAndCountAll({
        include: [{ model: PublicacionImagenes, as: "imagenes" },
          {model: Usuarios, as: "usuario"}
        ],
        order: [["fecha_publicacion", "DESC"]],
        limit,
        offset,
      });
  
      const publicacionPreview = rows.map(publicacion => ({
        id: publicacion.id,
        titulo: publicacion.titulo,
        descripcion:
          publicacion.descripcion.slice(0, 350) +
          (publicacion.descripcion.length > 350 ? "..." : ""),
        fecha_publicacion: publicacion.fecha_publicacion,
        imagen_portada: publicacion.imagenes[0]?.url_imagen || null,
        usuario: publicacion.usuario ? {
          id: publicacion.usuario.id,
          nombre: publicacion.usuario.nombre,
          email: publicacion.usuario.email
        } : null
      }));
  
      res.json({
        total: count,
        currentPage,
        totalPages,
        noticias: noticiasPreview,
      });
    } catch (error) {
      console.error("Error al obtener publicaciones paginadas:", error);
      res.status(500).json({
        message: "Error al obtener publicaciones paginadas",
        error,
      });
    }
  });

router.get("/:id", async (req,res) => {
    try {
        const publicacion = await Publicaciones.findByPk(req.params.id, {
            include : [{model : PublicacionImagenes, as:"imagenes"},
              {model : Usuarios, as: "usuario"}
            ],
        })

        if(!publicacion) return res.status(404).json({message: "Publicacion no encontrada"});
        res.json(publicacion);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la publicacion", error });
    }
})


router.put("/:id", async (req, res) => {
    try {
        const {titulo, descripcion, imagenes} = req.body;

        const publicacion = await Publicaciones.findByPk(req.params.id);
        if(!publicacion) return res.status(404).json({message: "Noticia no encontrada"});

        await publicacion.update({titulo, descripcion});
        if(imagenes) {
          await PublicacionImagenes.destroy({ where: { publicacion_id: publicacion.id } });
          const nuevasImagenes = imagenes.map((img) => ({
            publicacion_id: publicacion.id,
            url_imagen: img.url_imagen,
          }));
          await PublicacionImagenes.bulkCreate(nuevasImagenes);
        }
        res.json({ message: "Publicacion actualizada" });
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar publicacion", error });
    }
}) 

router.delete("/:id" , async (req, res) => {
    try {
        const publicacion = await Publicaciones.findByPk(req.params.id);
        if(!publicacion) return res.status(404).json({message: "publicacion no encontrada"});

        await PublicacionImagenes.destroy({where : {publicacion_id: publicacion.id}});
        await publicacion.destroy();

        res.json({message: "Publicacion eliminada"});
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar publicacion", error });
      }
})


module.exports = router;
