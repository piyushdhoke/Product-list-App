import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import api from '../api/api';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = ({ isEditing }) => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    isRecommended: false,
    isBestseller: false,
    
    
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isEditing) {
      const fetchProduct = async () => {
        const response = await api.get(`/products/${id}`);
        setProductData(response.data);
      };
      fetchProduct();
    }
  }, [isEditing, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData({
      ...productData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await api.put(`/products/${id}`, productData);
    } else {
      await api.post('/products', productData);
    }
    navigate('/');
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={productData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Recommended"
            name="isRecommended"
            checked={productData.isRecommended}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Bestseller"
            name="isBestseller"
            checked={productData.isBestseller}
            onChange={handleChange}
          />
        </Form.Group>


       

        <Button variant="primary" type="submit">
          {isEditing ? 'Update Product' : 'Add Product'}
        </Button>
      </Form>
    </Container>
  );
};

export default ProductForm;
