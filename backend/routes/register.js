const router = require('express').Router();
const bcrypt = require('bcrypt');
const userModel = require('../models/users'); 

router.post("/register", async (req, res) => {
    const { name, email, password, usertype, address, postalcode, contact, imageurl } = req.body;

    try {
        
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: "User already registered" });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            usertype,
            address,
            postalcode,
            contact,
            imageurl
        });

       
        await newUser.save();

        res.status(200).json({ message: "User successfully registered" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
