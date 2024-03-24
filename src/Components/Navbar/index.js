import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../CartContext";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import "./navbar.css";

const Navbar = () => {
  const { cartItems } = useCart();
  const [token, SetToken] = useState()
  const router = useNavigate();
  const [user, setUser] = useState("")

  useEffect(() => {
    let value = localStorage.getItem("token")
    if (value && !undefined) {
      SetToken(value)
    }
  }, [router])


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:4000/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        let result = await response.json()
        localStorage.setItem("userId", result.user._id)
        setUser(result.user);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [router]);

  const handlelogout = () => {
    SetToken("")
    localStorage.clear()
    router("/login")
  }

  return (
    <div className="navbar">
      <Link to="/" className="nav-logo">
        <img src={logo} alt="" />
        <p>Art-Vista</p>
      </Link>

      <ul className="nav-menu">
        <li>
          <Link to="/">Shop</Link>
        </li>
        <li>
          <Link to="/">Modern</Link>
        </li>
        <li>
          <Link to="/">Retro</Link>
        </li>
        <li>
          <Link to="/">Theatre</Link>
        </li>
      </ul>
      <div className="nav-login-cart">
        {token && token ?
          <div className="user_name">
            <span>Welcome {user.name}</span>
            <button onClick={handlelogout}>Logout</button>
          </div>
          : <Link to="/Login">
            <button>Login</button>
          </Link>}

        <Link to="/cart">
          <img src={cart_icon} alt="" />
          <span>{cartItems.length}</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
