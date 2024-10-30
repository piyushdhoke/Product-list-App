const Product = require('../Model/productModel');


// Add a Product
let addProduct = async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// // Get all Products
// let getProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// Update a Product
let updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Product
let deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// patch Status

let patchStatus =  async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
  
      // Toggle the status
      product.status = product.status === 'Active' ? 'Inactive' : 'Active';
      await product.save();
  
      res.json({ message: 'Status updated', product });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
}





// Get all Products with Pagination
 let getProducts = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query; // Default to page 1 and 10 items per page
  
      const products = await Product.find()
        .limit(limit * 1) // Convert to integer
        .skip((page - 1) * limit)
        .exec();
  
      const count = await Product.countDocuments();
  
      res.status(200).json({
        products,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


  //image upload

  let imageUpload = async (req, res) => {
    try {
      const { id } = req.params;
      const imageUrl = req.file ? req.file.path : null;
  
      const product = await Product.findByIdAndUpdate(
        id,
        { imageUrl },
        { new: true }
      );
  
      res.json({ imageUrl: product.imageUrl });
    } catch (error) {
      console.error("Error updating product image:", error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

 
  
  

module.exports = {addProduct,getProducts,updateProduct,deleteProduct,patchStatus,imageUpload}
