import React from 'react';
import ProductList from '../components/ProductList';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page fade-in">
      <section className="hero-section">
        <h1>Discover the Best Products</h1>
        <p>Explore our curated collections with premium quality items, fast delivery, and secure payments.</p>
      </section>
      
      <section className="catalog-section">
        <h2 className="section-title">Explore Catalog</h2>
        <ProductList />
      </section>
    </div>
  );
};

export default Home;
