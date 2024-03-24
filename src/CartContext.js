// CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // const addToCart = (item) => {
  //   const existingItemIndex = cartItems.findIndex(cartItem => cartItem._id === item._id && cartItem.size === item.size);
  //   if (existingItemIndex !== -1) {
  //     const updatedCartItems = [...cartItems];
  //     updatedCartItems[existingItemIndex].quantity += 1;
  //     setCartItems(updatedCartItems);
  //   } else {
  //     setCartItems([...cartItems, { ...item, quantity: 1 }]);
  //   }
  // };

  const addToCart = async (itemData) => {
    const payload = {
      userId: itemData.userId,
      itemId: itemData._id,
      size: itemData.size
    };
    try {
      const response = await fetch('http://localhost:4000/cart/addtocart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
        if (response.ok) {
          setTimeout(() => {
            toast("Item added to cart!")
          }, 100);
        fetchCartItems();
      } else {
        toast(data.message)
        console.error('Error adding item to cart:', data.message);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  

  const userId = "65f773edc2f9cc935066fcf5"; 

  useEffect(() => {
    fetchCartItems();
  }, [userId]);

  const fetchCartItems = async () => {
    try {
      let userId= localStorage.getItem("userId")
      const response = await fetch(`http://localhost:4000/cart/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }

      const data = await response.json();
      setCartItems(data.items);
    } catch (error) {
      console.error('Error fetching cart items:', error.message);
    }
  };
  const handleUpdateQuantity = (itemId, size, qtyValue,userId) => {
    const url = 'http://localhost:4000/cart/updateCart';
    const requestBody = JSON.stringify({
        itemId: itemId,
        userId: userId,
        size: size,
        qtyValue: qtyValue
    });

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: requestBody
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        fetchCartItems();
        toast('cart updated.');
        console.log('Cart updated successfully:', data);
    })
    .catch(error => {
        console.error('There was a problem updating the cart:', error);
    });
}
  

  const removeFromCart = async (itemId, size, userId) => {
    const payload = {
      userId: userId,
      itemId: itemId,
      size: size
    };
    try {
      const response = await fetch('http://localhost:4000/cart/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok) {
        toast("Item removed from cart!")
        fetchCartItems();
      } else {
        toast(data.message)
        console.error('Error deleting item from cart:', data.message);
      }
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, handleUpdateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
