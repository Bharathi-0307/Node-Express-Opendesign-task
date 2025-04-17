# Node-Express-Opendesign-task
# 🚀 Node.js + Express + Knex API

This is a simple backend API built using **Node.js**, **Express**, and **Knex.js** with **PostgreSQL** as the database.

## 📌 API Features

This API includes:

- ✅ User registration & login with JWT
- ✅ Full CRUD for customers
- 🔐 Protected routes using token-based authentication

---

## 🛠 Setup Instructions


<!-- clone this project in ur  local machine -->
https://github.com/Bharathi-0307/Node-Express-Opendesign-task


### 1. Install Dependencies

```bash
npm install



# Setup .env File

# PORT=3000
# DATABASE_URL=postgres://username:password@localhost:5432/your_database
# JWT_SECRET=your_jwt_secret_key




#################################################
###############  Database Setup:  ##############
################################################

1. Create the Database Manually
You need to create your PostgreSQL database manually before running the migrations. You can use psql (PostgreSQL command line tool) or a GUI tool like pgAdmin.

# After runthis cmd :  ####################
#  for  schema creation

npx knex migrate:latest   



LOGIN AND REGISTER :

register user using POSTMAN :
http://localhost:3000/api/auth/register      

# Example 

{
  "email": "odi1@gmail.com",
  "password": "bharathi1",
  "name": "ODI",
  "mobile": "43534534534",
  "parentName": "Test Parent Name",
  "plan": "6M",
  "price": 24000,
  "students": [
    {
      "location": "test",
      "studentName": "test student"
    }
  ]
}


LOgin user user using POSTMAN : 
#    TOKEN REQURED get from register dta  respone
http://localhost:3000/api/auth/login  

{
  "email": "odi1@gmail.com@gmail.com",
  "password": "odi"
  }




##########Customer Endpoints:##########
get all customers:
http://localhost:3000/api/customers





#############PRODUCT :########
#  Create a Product
  Method: POST
   URL: http://localhost:3000/api/products

# EXAMPL BODY DATA (json)
{
  "title": "Wireless Headphones",
  "description": "High-quality wireless headphones with noise-cancellation.",
  "content": "These headphones offer crystal clear sound and up to 30 hours of battery life.",
  "category": "Electronics",
  "price": 129.99,
  "image_url": "https://example.com/images/headphones.jpg",
  "published_at": "2025-04-17T10:00:00Z"
}


# Get All Products 
Method: GET
URL: http://localhost:3000/api/products



# Get Product by ID
Method: GET
URL: http://localhost:3000/api/products/:id
Example: http://localhost:3000/api/products/1          id 



# Delete Product by ID
Method: DELETE
URL: http://localhost:3000/api/products/:id
Example: http://localhost:3000/api/products/1           id 












# Core Dependencies:
# express: For setting up the server and handling routes.

# knex: A SQL query builder for interacting with databases.

# pg: PostgreSQL client for Node.js (needed for Knex to communicate with PostgreSQL).

# dotenv: To manage environment variables securely.

# bcryptjs: For hashing passwords.

# jsonwebtoken: To generate and verify JSON Web Tokens (JWT) for authentication.