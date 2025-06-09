const router = require("express").Router();
const { faker, tr } = require("@faker-js/faker");
const { Usuarios, Roles } = require('../model'); 
const bcrypt = require("bcrypt");


router.get("/users", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const rolFiltro = req.query.rol;

    const includeRol = {
      model: Roles,
      as: 'rol',
      attributes: ['rol'],
      where: rolFiltro ? { rol: rolFiltro } : undefined,
      required: !!rolFiltro,
    };

    const { count: totalUsers, rows } = await Usuarios.findAndCountAll({
      attributes: ['id', 'username', 'nombre', 'email'],
      include: [includeRol],
      order: [['nombre', 'ASC']],
      limit,
      offset: (page - 1) * limit,
    });

    const totalPages = Math.ceil(totalUsers / limit);
    const currentPage = page > totalPages ? totalPages : page;

    if (totalUsers === 0 || currentPage < 1) {
      return res.json({
        usuarios: [],
        totalPages,
        currentPage: 1,
        total: 0,
      });
    }

    const users = rows.map(user => ({
      id: user.id,
      username: user.username,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol.rol,
    }));

    res.json({
      total: totalUsers,
      currentPage,
      totalPages,
      usuarios: users,
    });

  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ ok: false, message: "Error al obtener usuarios", error: error.message });
  }
});

router.get("/users/:user_id", async (req, res) => {
  const id = req.params.user_id;
  try {
    const user = await Usuarios.findOne({
      where: { id },
      attributes: ['id', 'username', 'nombre', 'email'],
      include: [{
        model: Roles,
        as: 'rol',
        attributes: ['rol']
      }]
    });

    res.status(200).json({
      ok: true,
      status: 200,
      body: user
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error al obtener el usuario", error });
  }
});

router.post('/users', async (req, res) => {
    try {
      const dataUsers = req.body;
      const hashedPass = await bcrypt.hash(dataUsers.password, 10);
  
      const newUser = await Usuarios.create({
        nombre: dataUsers.nombre,
        username: dataUsers.username,
        email: dataUsers.email,
        rol_id: 1,
        password_hash: hashedPass,
      });
  
      res.status(201).json({
        ok: true,
        status: 201,
        message: 'Usuario creado',
        user: newUser,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        status: 500,
        message: error.message,
      });
    }
  });

router.put("/users/:id", async (req,res) =>{
   const {id} = req.params;
   const data = req.body;

   const allowedFields = ['username', 'nombre', 'email'];
   const filteredData = {};

   allowedFields.forEach( field => {
    if(data[field] !== undefined) {
      filteredData[field] = data[field];
    }
   })

   try {
    const user = await Usuarios.findOne({
        where: {
            id : id
        }
    })

    if(!user) {
        return res.status(404).json({
            ok: false,
            message: "Usuario no encontrado",
        });
    }

    await user.update(filteredData);

    res.status(200).json({
        ok:true,
        message: "Usuario actualizado",
        user,
    })
   }catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
});

router.delete("/users/:id", async (req,res) =>{
    const {id} = req.params

    try {
        const user  = await Usuarios.findOne({
            where: {
                id :id
            }
        })

        if(!user) {
            return res.status(404).json({
                ok: false,
                message: "Usuario no encontrado"
            })
        }

        await user.destroy();

        res.status(200).json({
            ok: true,
            message: "Usuario eliminado",
        })
    }catch (error) {
        res.status(500).json({
          ok: false,
          message: error.message,
        });
      }
});

module.exports = router;