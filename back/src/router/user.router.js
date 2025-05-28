const router = require("express").Router();
const { faker, tr } = require("@faker-js/faker");
const { Usuarios } = require('../model'); 
const bcrypt = require("bcrypt");


router.get("/users", async (req,res) =>{
    const users = await Usuarios.findAll()
    res.status(200).json({
        ok:true,
        status: 200,
        body: users
    })
});

router.get("/users/:user_id", async (req,res) =>{
    id = req.params.user_id
    const user = await Usuarios.findOne({
        where: {
            id: id
        }
    })
    res.status(200).json({
        ok:true,
        status: 200,
        body: user
    })
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

    await user.update(data);

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