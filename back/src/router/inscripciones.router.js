const router = require('express').Router();
const {Inscripciones} = require("../model");
const Sequelize = require("sequelize");
router.post("/", async(req, res) => {
    try {
        const { nombre, email, telefono} = req.body;
        const inscripcion = await Inscripciones.create({nombre, email, telefono});
        res.status(201).json(inscripcion);
    } catch (error) {
        console.error("Error al inscribir", error);
        res.status(500).json({error: "Error al crear la inscripción"});
    }
})

router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const totalInscripciones = await Inscripciones.count();
        const totalPages = Math.ceil(totalInscripciones / limit);

        const currentPage = page > totalPages ? totalPages : page;

        const offset = (currentPage - 1) * limit;


        if(totalInscripciones === 0 || currentPage < 1){
            return res.json({
                inscripciones : [],
                totalPages,
                currentPage : 1,
                total: 0,
            });
        }

        const {count, rows} = await Inscripciones.findAndCountAll({
            order: [["fecha_inscripcion", "DESC"]],
            limit,
            offset,
        })

        res.json({
            inscripciones: rows,
            totalPages,
            currentPage,
            total: count,
        })

    } catch (error) {
        console.error("Error al obtener inscripciones:", error);
        res.status(500).json({
          message: "Error al obtener inscripciones",
          error,
        });
      }
})

router.patch("/:id/estado", async(req, res) => {
    try{
        const {estado} = req.body;
        const {id} = req.params;

        const inscripcion = await Inscripciones.findByPk(id);
        if(!inscripcion) {
            return res.status(404).json({error: "Inscripción no encontrada"});
        }

        inscripcion.estado = estado;
        await inscripcion.save();

        res.json({message: "Estado actualizado", inscripcion});
    } catch(error){
        console.error("Error al actualizar el estado", error);
        res.status(500).json({error: "Error al actualizar el estado de la inscripción"});
    }
})

router.get("/buscar", async (req, res) => {
    const {query} = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = 3;

    try {
        const offset = (page-1) * limit;

        const {count, rows} = await Inscripciones.findAndCountAll({
            where: {
            [Sequelize.Op.or]: [
                {nombre: {[Sequelize.Op.like] : `%${query}%`}},
                { email: { [Sequelize.Op.like]: `%${query}%` } },
            ],
            },
            order:[["fecha_inscripcion", "DESC"]],
            limit,
            offset,
        });

        const totalPages =Math.ceil(count/limit)
        const currentPage = page > totalPages ? totalPages : page;
        res.json({
            inscripciones: rows,
            totalPages,
            currentPage,
            total: count,
        });
    } catch(error){
        console.error("Error al buscar inscripciones", error);
        res.status(500).json({error: "Error al buscar inscripciones"});
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const inscripcion = await Inscripciones.findByPk(req.params.id);
        if(!inscripcion) return res.status(404).json({message: "Inscripción no encontrada"});

        await inscripcion.destroy({where: {inscripcion_id : inscripcion.id}});

        res.json({message: "Inscripción eliminada"});
    }  catch (error) {
        res.status(500).json({ message: "Error al eliminar la inscripción", error });
      }
})


module.exports = router;