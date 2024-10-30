import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Table, Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';


const ProductList = () => {
  const [products, setProducts] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProductId, setUploadProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(`/products?page=${currentPage}`);
        setProducts(response.data.products || []); // Fallback to empty array if response.data.products is undefined
        console.log(response.data)
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [currentPage]);

  const handleDelete = async (productId) => {
    try {
      await api.delete(`/products/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };


    // Toggle status handler
    const handleToggleStatus = async (productId) => {
        try {
          const response = await api.patch(`/products/${productId}/toggle-status`);
          const updatedProduct = response.data.product;
          
          // Update product in local state
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product._id === productId ? { ...product, status: updatedProduct.status } : product
            )
          );
        } catch (error) {
          console.error("Error toggling product status:", error);
        }
      };





  const handleFileChange = (e, productId) => {
    setSelectedFile(e.target.files[0]);
    setUploadProductId(productId);
  };

  const handleFileUpload = async (productId) => {
    if (!selectedFile) return;
    
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await api.put(`/products/${productId}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Update the product image after successful upload
      setProducts(products.map((product) =>
        product._id === productId ? { ...product, imageUrl: response.data.imageUrl } : product
      ));
      setSelectedFile(null);
      setUploadProductId(null);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Container>
      {products.length > 0 ? (
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
              <th>Upload Image</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>
                 <div style={{display:"flex"}}>
                {/* <Button
                    variant={product.status === 'Active' ? 'success' : 'secondary'}
                    onClick={() => handleToggleStatus(product._id)}
                    className="me-2"
                  >
                    {product.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </Button> */}
                   <Form>
                   <Form.Check // prettier-ignore
                     type="switch"
                     id="custom-switch"
                      onClick={() => handleToggleStatus(product._id)}
                     />
                   </Form>
                  

                  <Link to={`/edit-product/${product._id}`}>
                    <Button variant="primary" size="sm" className="me-2">Edit</Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(product._id)}
                    >
                    Delete
                  </Button>
                  

                </div>   
                </td>
                <td>
                {product.imageUrl ? (
                  <img src={`http://localhost:5000/${product.imageUrl}`} alt={product.name} style={{ width: '100px' }} />
                ) : (
                  'No Image'
                )}
              </td>
                <td>
                <Form.Group controlId={`formFile-${product._id}`} className="mb-2">
                  <Form.Control
                    type="file"
                    onChange={(e) => handleFileChange(e, product._id)}
                  />
                  <Button
                    variant="primary"
                    onClick={() => handleFileUpload(product._id)}
                    disabled={uploadProductId !== product._id || !selectedFile} // Enable only if correct product and file selected
                  >
                    Upload
                  </Button>
                </Form.Group>
              </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center mt-4">No products available</p>
      )}
      <div style={{display:"flex"}}>
      <Link to="/add-product">
        <Button variant="success" className="">Add New Product</Button>
      </Link>
      <Pagination style={{marginLeft:"auto"}}>
      <Pagination.First />
      <Pagination.Prev />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item key={index + 1} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next />
        <Pagination.Last />
        </Pagination>
        </div>
     
      
    </Container>
  );
};

export default ProductList;
