const User = require('../models/user')
const bcrypt = require('bcrypt');

exports.signup = async(req, res) => {
    try{
        const {name, email, password} = req.body;

        // Check for empty fields 
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }else if(password.length < 5){
            return res.status(400).json({ message: 'Password must be 6 characters' });

        }

        // Check existing user 
        const existingUser = await User.findOne({where: {email}});
        if (existingUser){
            return res.status(400).json({message: 'Email already exists'});
        }

        // Hash password 
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user 
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        // Exclude the password field from the response
        const { password: _password, ...userWithoutPassword } = newUser.toJSON();

        res.status(201).json({message: "User signed up successfully", user: userWithoutPassword})
    }catch(error){
        console.log("Error in user signup", error)
        res.status(500).json({message: 'Signup failed'})
    }
};