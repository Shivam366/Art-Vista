import React, { useEffect, useState } from "react";
import Popular from "../Components/Popular/Popular";
import NewCollections from "../Components/NewCollections/NewCollections";
import Hero from "../Components/Hero/Hero";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const modernProduct = products.filter((item) => item.category === 'Modern');
  const retroProduct = products.filter((item) => item.category === ' Retro');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:4000/products/allproducts');
      const data = await response.json();
      if (data.success === true) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
 
  return (
    <div>
      <Hero />
      <Popular products={modernProduct} />
      <NewCollections products={retroProduct} />
    </div>
  );
};

export default Shop;
