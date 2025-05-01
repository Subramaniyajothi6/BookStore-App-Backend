const express = require('express');
const User = require('./user.model');
const jwt = require('jsonwebtoken');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY;
router.post("/admin", async (req, res) => {
    const {username, password, role} = req.body;

    try {
        const admin = await User.findOne({username});

        if(!admin){
        res.status(404).json({message:'Admin not found!'})};

        if(admin.password !== admin.password){
            res.status(401).send({message:'Incorrect password!'})
        }

        const token = jwt.sign(
            {id:admin._id, username:admin.username,role:admin.role},
            JWT_SECRET,
            {expiresIn:'1h'}

        );   
        
        res.status(200).json({message:'Admin logged in successfully',token:token,user:{user:admin.username,role:admin.role}});
    } catch (error) {
        console.log("failed to login as admin", error);
        res.status(401).send({ message: "Failed to login as admin", error });
    }
})

module.exports = router;


