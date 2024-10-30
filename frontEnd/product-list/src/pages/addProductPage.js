import React from 'react';
import ProductForm from '../components/productForm';

const AddProductPage = () => {
  return (
    <div>
      <h2 className="text-center my-4">Add New Product</h2>
      <ProductForm isEditing={false} />
    </div>
  );
};

export default AddProductPage;
