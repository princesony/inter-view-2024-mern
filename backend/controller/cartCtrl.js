const Cart = require('../model/cart')


const addCartItem = async (req, res) => {
    const  product_id  = req.params.product_id;
    const user_id = req.user._id; // Access the user._id from the request object

    try {
        const cartItem = new Cart({
            user_id,
            product_id,
          
        });
        
        await cartItem.save();
        res.status(201).json({ msg: 'Cart item added successfully', cartItem });
    } catch (error) {
        console.error('Error adding cart item:', error);
        res.status(500).json({ msg: error.messsage });
    }
};
const getCartItems = async (req, res) => {
    const user_id = req.user._id; // Retrieve user ID from the authenticated user

    try {
        const cartItems = await Cart.find({ user_id }).populate('product_id');
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const incrementQuantity = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedCartItem = await Cart.findByIdAndUpdate(id, { $inc: { quantity: 1 } }, { new: true });
        res.status(200).json({msg:"remove one qnty successfully",data:updatedCartItem});
    } catch (error) {
        console.error('Error incrementing quantity:', error);
        res.status(500).json({ msg: error.message });
    }
};


const decrementQuantity = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedCartItem = await Cart.findByIdAndUpdate(id, { $inc: { quantity: -1 } }, { new: true });
        res.status(200).json({msg:"remove one qnty successfully",data:updatedCartItem});
    } catch (error) {
        console.error('Error decrementing quantity:', error);
        res.status(500).json({ msg: error.message });
    }
};


const deleteCartItem = async (req, res) => {
    const { id } = req.params;

    try {
        await Cart.findByIdAndDelete(id);
        res.status(200).json({ msg: 'Cart item deleted successfully' });
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(500).json({ msg: error.message });
    }
};
// Other controller functions can also access req.user._id in a similar manner
module.exports = { addCartItem ,getCartItems,incrementQuantity,decrementQuantity,deleteCartItem};