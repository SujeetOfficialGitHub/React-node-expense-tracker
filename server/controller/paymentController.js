const Razorpay = require('razorpay');
const Payment = require('../models/payment')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const  razorpay = new Razorpay({
    key_id: process.env.RAYZORPAY_PUBLIC_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY
});

exports.createOrder =  async (req, res) => {
    try {
        const {amount} = req.body;
        const options = {
            amount: amount * 100,
            currency: 'INR',
            receipt: 'order_receipt_' + Date.now(),
            payment_capture: 1,
        };
  
        // Create a Razorpay order
        const order = await razorpay.orders.create(options);
        //   console.log(order)
  
        // Send the order ID to the client
        res.status(200).json({ orderId: order.id, amount: order.amount });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};

exports.paymentSuccess = async(req, res) => {
    try{
        console.log(req.body)
        const {razorpay_payment_id, razorpay_order_id, amount} = req.body
        const payment = await Payment.create({
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            userId: user.userId,
            amount: amount,
            order_status: 'success'
        })
        const id  = user.userId
        // Update user as premium member
        const userData = await User.findByPk(id);
  
        if (userData) {
            userData.isPremium = true;
            await userData.save();

            const {userId, name, _, iat, exp} = user;

            const timeDiff = (exp - iat)/3600
            // console.log(timeDiff)
            const token = jwt.sign({userId, name,isPremium: userData.isPremium }, process.env.SECRET_KEY, {expiresIn: `${timeDiff}h`})
            // console.log(token)


            res.status(200).json({ message: "Payment successful", payment, token });
        }else{
            res.status(500).json({ error: 'Payment failed' });
        }
        
    } catch (error) {
        console.error('Error storing payment data:', error);
        res.status(500).json({ error: 'Payment failed' });
    }

}

