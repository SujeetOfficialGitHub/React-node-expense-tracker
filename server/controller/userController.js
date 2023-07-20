const User = require('../models/user')
const ForgotPasswordRequest = require('../models/forgotPasswordRequests')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Sib = require('sib-api-v3-sdk');
const { v4: uuidv4 } = require('uuid');

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

        res.status(200).json({message: 'Login successful', token: 
        token})
        

    }catch(error){
        console.log("Error in user login", error)
        res.status(500).json({message: 'Login failed'})
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const email = req.body.email;

        // Check if the user with the provided email exists
        const user = await User.findOne({ where: { email } });

        if (!user) {
        return res.status(404).json({ message: 'User not found.' });
        }

        // Create a new forgot password request with a UUID
        const forgotPasswordRequestId = uuidv4();
        await ForgotPasswordRequest.create({
            id: forgotPasswordRequestId,
            userId: user.id,
        });

        const client = Sib.ApiClient.instance;

        const apiKey = client.authentications['api-key'];
        apiKey.apiKey = process.env.BREVO_API_KEY;

        const tranEmailApi = new Sib.TransactionalEmailsApi();
        

        const sender = {
            email: 'sujeetgroups@gmail.com'
        };

        const receiver = [
            {
            email: email
            }
        ];
        const resetUrl = `http://localhost:3000/password/create-new-password/${forgotPasswordRequestId}`
        const sendEmailResult = await tranEmailApi.sendTransacEmail({
            sender,
            to: receiver,
            subject: 'Reset Your Password',
            htmlContent: `
            <h3>Click the link below to reset your password</h3>
            <a href="{{params.url}}">Click here</a>
            `,
            params: {
                url: resetUrl
            }
        });

        console.log(sendEmailResult);
        res.status(200).json({ message: 'Forgot password email sent', sendEmailResult });
    } catch (error) {
        console.error('Error sending forgot password email:', error);
        res.status(500).json({ message: 'Failed to send forgot password email' });
    }
};
  
exports.createNewPassword = async(req, res) => {
    const { id } = req.params;
    const { password1 } = req.body;

    
    // Check if the forgot password request with the provided ID exists and is active
    const forgotPasswordRequest = await ForgotPasswordRequest.findOne({
        where: { id, isactive: true },
        include: [{ model: User }],
    });


    if (!forgotPasswordRequest || !forgotPasswordRequest.user) {
        return res.status(404).json({ message: 'Invalid Request' });
    }
        
    // Encrypt the new password
    const hashedPassword = await bcrypt.hash(password1.toString(), 10);

    // Update the user's password in the database
    await User.update({ password: hashedPassword }, { where: { id: forgotPasswordRequest.user.id } });

    // Deactivate the forgot password request
    await ForgotPasswordRequest.update({ isactive: false }, { where: { id } });

    res.json({ message: 'Password updated successfully.' });
}
    
