const Order = require('../model/order');
const stripe = require("stripe")("sk_test_51NWumjSECg2tLwYxmgRqGBykI0VIgYdnE5evl5kEqIo4g9Fa7rb5IgssZQcW79NmOCrKdJhEM0B3Tz9xMtuI732t00AVhElPfx");




const orederbyStripe= async (req, res) => {
    const { products } = req.body;

    try {
        const lineItems = products.map((product) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: product.dish,
                    images: [product.imgdata]
                },
                unit_amount: product.price * 100,
            },
            quantity: product.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/api/payment-success",
            cancel_url: "http://localhost:3000/cancel",
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
;}

const saveOrderProducts = async (req, res) => {
    const { products } = req.body;

    try {
        // Loop through each product and save it in the order schema
        for (const product of products) {
            const orderProduct = new Order({
                user_id: product.user_id,
                product_id: product._id,
                quantity: product.quantity,
                status: 'pending' // You can set the initial status here
            });
            await orderProduct.save();
        }

        res.json({ message: 'Payment successful and orders saved' });
    } catch (error) {
        console.error('Error processing payment success:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    saveOrderProducts,
    orederbyStripe
};
