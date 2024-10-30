import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { Form, Button, Container } from 'react-bootstrap';

const EditProductPage = () => {
  const { id } = useParams(); // Retrieve the product ID from the URL
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    isRecommended: false,
    isBestseller: false,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`); // Correct endpoint
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/${id}`, product); // Update product endpoint
      navigate('/');
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <Container>
      <h3>Edit Product</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="productName" className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="productDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="productPrice" className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="isRecommended" className="mb-3">
          <Form.Check
            type="checkbox"
            name="isRecommended"
            label="Recommended"
            checked={product.isRecommended}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="isBestseller" className="mb-3">
          <Form.Check
            type="checkbox"
            name="isBestseller"
            label="Bestseller"
            checked={product.isBestseller}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select name="status" value={product.status} onChange={handleChange}>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="primary">Save Changes</Button>
      </Form>
    </Container>
  );
};

export default EditProductPage;
