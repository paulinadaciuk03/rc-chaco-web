const router = require("express").Router();
const { faker, tr } = require("@faker-js/faker");
const Users = require("../model/user.model");


router.get("/users", async (req,res) =>{
    const users = await Users.findAll()
    res.status(200).json({
        ok:true,
        status: 200,
        body: users
    })
});

router.get("/users/:user_id", async (req,res) =>{
    id = req.params.user_id
    const user = await Users.findOne({
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

router.post("/users", async (req,res) =>{
    console.log("BODY:", req.body);
    const dataUsers = req.body
    await Users.sync()
    /*
    const createUser = await Users.create({
        nombre: dataUsers.nombre,
        apellido: dataUsers.apellido,
        username: dataUsers.username,
        email: dataUsers.email,
        rol_id: 1,
        password_hash: dataUsers.password_hash,
        fecha_registro: new Date()
                
    })
    */
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Usuario Creado"
    });
});

router.put("/users", (req,res) =>{
    res.send("soy un ruter muejejeje");
});

router.delete("/users", (req,res) =>{
    res.send("soy un ruter muejejeje");
});

module.exports = router;