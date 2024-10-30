import React from 'react';
import ProductList from '../components/productList';

const HomePage = () => {
  return (
    <div>
      <h1 className="text-center my-4">Product List</h1>
      <ProductList />
    </div>
  );
};

export default HomePage;
