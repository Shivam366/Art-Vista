import { Link } from "react-router-dom";
import { useCart } from "../../CartContext";
import "./cart.css";
import { FaTimes } from "react-icons/fa";


const CartView = () => {
  const { cartItems, removeFromCart, handleUpdateQuantity } = useCart();

  const calculateSubtotal = (cartItems) => {
    let subtotal = 0;
    cartItems.forEach((cartItem) => {
      subtotal += cartItem.itemId.new_price * cartItem.quantity;
    });
    return subtotal;
  };
  const handleRemoveItem = (itemId, size) => {
    let userId = localStorage.getItem("userId")
    removeFromCart(itemId, size,userId);
  };
  const calculateTotalPrice = (cartItems) => {
    const subtotal = calculateSubtotal(cartItems);
    const deliveryCharge = 5; 
    const taxRate = 0.1; 
    const tax = subtotal * taxRate;
    const total = subtotal + tax + deliveryCharge;
    return total.toFixed(2);
  };

  const handleCheckout =async (cartItems) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
        alert('Payment successful! Thank you for your purchase.');
     } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again later.');
    }
  };
  const handleClickQuantity = (itemId, size, qtyValue) => {
    let userId = localStorage.getItem("userId")
     handleUpdateQuantity(itemId, size, qtyValue, userId);
  }
  return (
    <div className="cart-container">
      <div className="product-details">
        <h2 className="mb-3">Your Cart</h2>
        {cartItems.length === 0 ? (
          <div className="empty-cart-message">
            <p>You don't have any items in your cart.</p>
            <Link to="/">Shop Now</Link>
          </div>
        ) : (
          cartItems.map((cartItem, index) => (
            <div className="product-detail mt-5" key={`${cartItem._id}_${index}`}>
              <img
                src={"http://localhost:4000/" + cartItem.itemId.image}
                alt={cartItem.itemId.name}
                className="product-image"
              />
              <div className="product-info">
                <h3>{cartItem.itemId.name}</h3>
                <p>${cartItem.itemId.new_price}</p>
                <p>Size: {cartItem.size}</p>
                <div className="quantity-controls">
                <button className="quantity-button" onClick={() => handleClickQuantity(cartItem.itemId._id, cartItem.size, -1)} disabled={cartItem.quantity === 1}>-</button>
                <span className="quantity">{cartItem.quantity}</span>
                <button className="quantity-button" onClick={() => handleClickQuantity(cartItem.itemId._id, cartItem.size, +1)}>+</button>
              </div>
                {/* <p>Quantity: {cartItem.quantity}</p> */}
              </div>
              <button className="remove-item" onClick={() => handleRemoveItem(cartItem.itemId._id, cartItem.size)}>
                <FaTimes />
              </button>
            </div>
          ))
        )}
      </div>
      {cartItems.length === 0 ? "" : (
        <div className="cart-summary">
          <div className="order-summary">
            <h3>Order Summary</h3>
            <p>Subtotal: ${calculateSubtotal(cartItems)}</p>
            <p>Delivery Charge: $5.00</p>
            <p>Tax: ${(calculateSubtotal(cartItems) * 0.1).toFixed(2)}</p>
            <p className="total-price">Total Price: ${calculateTotalPrice(cartItems)}</p>
          </div>
          <div className="checkout-button">
            <button onClick={() => handleCheckout(cartItems)}>Checkout</button>
          </div>
        </div>

      )}
    </div>
  );
};

export default CartView;
