const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        
        const user = await User.findOne({where: {email}});
        
        if (!user){
            return res.status(401).json({message: "Invalid email or password"});
        }
        const passwordmatch = await bcrypt.compare(password.toString(), user.password)

    
        if (!passwordmatch){
            return res.status(401).json({message: "Invalid email or password"});
        }
        
        const tokenPayload = { userId: user.id, name: user.name, isPremium: user.isPremium};
        // console.log(tokenPayload)
        const secretKey = process.env.SECRET_KEY;
        // console.log(secretKey)

        const token = jwt.sign(tokenPayload, secretKey, {expiresIn: "5h"})
        // const token =jwt.sign({userId: user.id},  '36 chambers');
        // console.log(token)

        res.status(200).json({message: 'Login successful', token: 
        token})
        

    }catch(error){
        console.log("Error in user login", error)
        res.status(500).json({message: 'Login failed'})
    }
}