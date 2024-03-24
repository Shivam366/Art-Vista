import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom
import "./ProductDisplay.css";
import { useCart } from "../CartContext";

const ProductDetails = () => {
  const { id } = useParams(); // Get the ID from URL parameters using useParams
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(""); // State to track the selected size
  const { addToCart } = useCart();

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:4000/products/${id}`); // Use the ID in the API URL
      if (response.ok) {
        const data = await response.json();
        setProduct(data.product);
      } else {
        throw new Error("Failed to fetch product data");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]); // Fetch product data whenever the ID changes

  const handleAddToCart = () => {
    let userId = localStorage.getItem("userId")
    if (selectedSize !== "") {
      addToCart({ ...product, size: selectedSize, userId: userId }); 
    } else {
      alert("Please select a size before adding to cart");
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  const { image, name, old_price, new_price } = product;

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={image} alt="img" />
          <img src={image} alt="img" />
          <img src={image} alt="img" />
          <img src={image} alt="img" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={image} alt="img" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{name}</h1>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${old_price}</div>
          <div className="productdisplay-right-price-new">${new_price}</div>
        </div>
        <div className="productdisplay-right-description">
          A lightweight, usually knitted, pullover shirt, close-fitting and with
          a round neckline and short sleeves, worn as an undershirt or outer
          garment.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div onClick={() => setSelectedSize("S")} className={selectedSize === "S" ? "selected" : ""}>S</div>
            <div onClick={() => setSelectedSize("M")} className={selectedSize === "M" ? "selected" : ""}>M</div>
            <div onClick={() => setSelectedSize("L")} className={selectedSize === "L" ? "selected" : ""}>L</div>
            <div onClick={() => setSelectedSize("XL")} className={selectedSize === "XL" ? "selected" : ""}>XL</div>
            <div onClick={() => setSelectedSize("XXL")} className={selectedSize === "XXL" ? "selected" : ""}>XXL</div>
          </div>
        </div>
        <button onClick={handleAddToCart}>ADD TO CART</button>
        <p className="productdisplay-right-category"><span>Category :</span> Women, T-shirt, Crop Top</p>
        <p className="productdisplay-right-category"><span>Tags :</span> Modern, Latest</p>
      </div>
    </div>
  );
};

export default ProductDetails;
