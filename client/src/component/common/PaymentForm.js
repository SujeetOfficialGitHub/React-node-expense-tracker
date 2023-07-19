import { useDispatch } from 'react-redux';
import { paymentSuccess, createOrder } from '../../store/features/paymentSlice';
import { updateToken } from '../../store/features/authSlice';

const PaymentForm = () => {
    const totalAmount = 100;
    const dispatch = useDispatch()

    const loadRazorpayScript = async () => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = initializeRazorpay;
        document.body.appendChild(script);
    };

    window.onload = loadRazorpayScript();
   
    function initializeRazorpay() {
        const handlePayment = async () => {
            try {
                // Fetch the order ID from the server
                const result = await dispatch(createOrder({totalAmount})).unwrap()
                const {amount, orderId} = result;


                // Initialize the Razorpay payment
                const razorpayOptions = {
                key: process.env.RAZORPAY_SECRET_KEY, // Your Razorpay key
                amount: amount, // Amount in paise (example: 50000 paise = ₹500)
                currency: 'INR',
                name: 'Expense Tracker App',
                description: 'Premium Subscription',
                //   image: 'https://example.com/logo.png', // URL of your logo
                order_id: orderId,
                handler: async function (response) {
                    // Handle the payment success response here
                    // console.log('Payment success:', response);
                    const data = {...response, amount: totalAmount}
                    const result = await dispatch(paymentSuccess({data})).unwrap()
                    if (result){
                        dispatch(updateToken({token: result.token}))
                    }
                },
                prefill: {
                    email: 'john@example.com',
                    contact: '9876543210',
                },
                theme: {
                    color: '#2962ff', // Customize the color theme
                },
                };

                const razorpay = new window.Razorpay(razorpayOptions);
                razorpay.open();
            } catch (error) {
                console.error('Error creating order:', error);
            }
            };

            // Attach the handlePayment function to the button click event
            document.getElementById('paymentButton').addEventListener('click', handlePayment);
    };



    return (
        <button id="paymentButton"  className='btn btn-primary font-link'>
            Buy Premium Rs.{totalAmount}
        </button>
    );
};

export default PaymentForm;

 