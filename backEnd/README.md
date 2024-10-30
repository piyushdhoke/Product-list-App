# Product List Management Application

This application is a full-stack web app for managing a product list. It includes features like adding, editing, deleting, and viewing products, with additional functionality for file uploads and product status toggling.

## Features

- **Product Management**: Add, edit, and delete products.
- **File Uploads**: Upload images for each product.
- **Product Status Toggle**: Enable or disable product status directly from the list view.

## Tech Stack

- **Frontend**: React, React Router, Bootstrap, Axios
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Deployment**: Cloud platforms such as Heroku, Vercel, or AWS


## Prerequisites

- **Node.js** (v20 or higher)
- **MongoDB** (for local testing or use a cloud MongoDB instance)
- **npm** or **yarn** package manager


## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/piyushdhoke/Product_list.git
cd product-list-app


DB_URI==mongodb://localhost:27017/Product_List
PORT=5000
UPLOAD_PATH=./uploads

cd backEnd
npm install

cd frontEnd
cd product-list
npm install


## Security Practices

- **Environment Variables**: Store sensitive data in `.env` and exclude from source control.
- **Validation**: Sanitize user inputs.
- **HTTP Headers**: Use `helmet` for secure headers.



### 6. API Documentation

Document the API endpoints so users know how to interact with your backend.

```markdown
## API Documentation

### Available Endpoints
| Method | Endpoint           | Description               |
| ------ | ------------------- | ------------------------- |
| GET    | `/api/products`     | Retrieve all products     |
| POST   | `/api/products`     | Add a new product         |



