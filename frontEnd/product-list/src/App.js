import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import AddProductPage from './pages/addProductPage';
import EditProductPage from './pages/editProductPage';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/edit-product/:id" element={<EditProductPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
