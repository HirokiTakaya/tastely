const router = require('express').Router();
const bcrypt = require('bcrypt');
const userModel = require('../models/users'); 
const { generateToken } = require('../auth'); 


router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).send({ message: "User not registered" });
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: "Password did not match" });
        }

        
        const token = generateToken(user);
        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post("/test", (req, res) => {
  res.send("Test route is working");
});

module.exports = router;
