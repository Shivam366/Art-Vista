import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import Footer from './Components/Footer/Footer';
import Registration from './Components/Register/Register';
import ProductDetails from './Pages/Product';
import { CartProvider } from './CartContext';
import CartView from './Components/Cart/cart';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Login from './Components/Login';
import Navbar from './Components/Navbar';


function App() {

  return (
    <div>
      <ToastContainer position="top-center"
        autoClose={2000} />
      <BrowserRouter>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/Register" element={<Registration />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartView />} />

          </Routes>
          <Footer />
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
