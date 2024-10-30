const express = require('express');
const router = express.Router();
const {addProduct,getProducts,updateProduct,deleteProduct,patchStatus,imageUpload}= require('../Controllers/productController')
const  upload = require('../uploads/fileUploads')

/**
 * @swagger
 * /products:
 *   get:
 *     description: Retrieve all products
 *     responses:
 *       200:
 *         description: A list of products.
 */


router.post('/products',addProduct);
router.get('/products', getProducts);
router.put('/products/:id',updateProduct);
router.delete('/products/:id',deleteProduct);
router.patch('/products/:id/toggle-status',patchStatus)
router.put('/products/:id/upload', upload.single('image'),imageUpload)


module.exports = router;
