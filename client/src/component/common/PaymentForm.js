import axios from 'axios';

const PaymentForm = () => {
    const totalAmount = 100;

    const loadRazorpayScript = async () => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = initializeRazorpay;
        document.body.appendChild(script);
    };

    window.onload = loadRazorpayScript();

    // When payment is success then send request to server 
    const payment_success = async(response) => {
        try{
            // console.log('response', response)
            // Fetch the order ID from the server
            const res = await axios.post('/payment_success', {
                ...response, amount: totalAmount
            } , {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            }
            });
            console.log(res)
        }catch(error){
            console.log(error)
        }
    }

    function initializeRazorpay() {
        const handlePayment = async () => {
            try {
                // Fetch the order ID from the server
                const response = await axios.post('/create-order', {
                        amount: totalAmount
                    }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${localStorage.getItem('token')}`
                    }
                });
                const { orderId, amount  } = response.data;


                // Set the order ID
                // setOrderId(orderId);

                // Initialize the Razorpay payment
                const razorpayOptions = {
                key: process.env.RAZORPAY_SECRET_KEY, // Your Razorpay key
                amount: amount, // Amount in paise (example: 50000 paise = ₹500)
                currency: 'INR',
                name: 'Expense Tracker App',
                description: 'Premium Subscription',
                //   image: 'https://example.com/logo.png', // URL of your logo
                order_id: orderId,
                handler: function (response) {
                    // Handle the payment success response here
                    // console.log('Payment success:', response);
                    payment_success(response)
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
                // console.error('Error creating order:', error);
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

 