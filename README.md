# Expense Tracker 💳

A robust RESTful backend service for managing restaurant menus and orders. This API provides functionality for CRUD operations, searching, filtering, availability control, and status-tracked order handling.

The API is fully documented using OpenAPI (Swagger), providing an interactive way to explore and test the endpoints.

**Live Demo:** [https://api-expence-tacker.onrender.com](https://api-expence-tacker.onrender.com)  
**Live API Documentation:** [https://api-expence-tacker.onrender.com/api-docs](https://api-expence-tacker.onrender.com/api-docs)

## Features⚡

-   **Menu Management:** Full CRUD (Create, Read, Update, Delete) functionality for menu items.
-   **Order Handling:** Create new orders, retrieve order lists, view specific order details, and update order statuses.
-   **Advanced Search & Filtering:**
    -   Filter menu items by `category`, `availability`, and `price`.
    -   Perform text-based searches on menu item `name` and `ingredients`.
-   **Pagination:** Efficiently query large sets of order data using page and limit parameters.
-   **Availability Control:** Easily toggle the availability of any menu item.
-   **API Documentation:** Interactive API documentation powered by Swagger (OpenAPI) is available at the `/api-docs` endpoint.

## Tech Stack 🚀

| Technology         | Description                                |
| ------------------ | ------------------------------------------ |
| **Node.js**        | JavaScript runtime environment             |
| **Express.js**     | Web framework for building the REST API    |
| **MongoDB**        | NoSQL database to store application data   |
| **Mongoose**       | ODM library for MongoDB and Node.js        |
| **JSON Web Token (JWT)** | For securing endpoints and managing sessions |
| **dotenv**         | For managing environment variables         |
| **Swagger UI**     | For generating interactive API documentation |

## Getting Started ⚙️

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v20.19.0 or higher)
-   npm (Node Package Manager)
-   MongoDB instance (local or cloud-based like MongoDB Atlas)

### Installation & Setup 📦

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/03-Bunny-06/expence-tacker.git
    ```

2.  **Navigate to the server directory:**
    ```bash
    cd expence-tacker/server
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Create an environment file:**
    Create a `.env` file in the `server` directory and add your environment variables.

    ```env
    # .env
    DATABASE_URL="your_mongodb_connection_string"
    PORT=8080
    ```

6.  **Start the server:**
    ```bash
    npm start
    ```

The server will start on the port specified in your `.env` file (or 8080 by default). You can access the API documentation at `http://localhost:8080/api-docs`.

## Data Models 🗂️

### User Schema

```javascript
{
    userId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}
```

### Transaction Schema

```javascript
const categories = ["Food", "Transport", "Rent", "Utilities", "Entertainment", "Shopping", "Income", "Miscellaneous","Other"];
{
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: categories,
        required: true,
        default: "Other"
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    notes: {
        type: String,
        trim: true,
        maxLength: 150
    }
}
```

## API Endpoints 🔗

The API is structured into two main routes that handles: `User` and `Transaction`. `User` endpoint is for handling registering and logging in users. `Transaction` endpoint is for managing transactions.

### User Routes (`/user`)

| Method  | Endpoint                         | Description                                  | Authentication |
| :------ | :------------------------------- | :------------------------------------------- | -------------- |
| `POST`   | `/user/register`                          | Registers a new user.      | Open           |
| `POST`   | `/user/login`                   | Logs in an existing user.         | Open           |

### Transactions Routes (`/user/transactions`)

| Method  | Endpoint                | Description                                       | Authentication |
| :------ | :---------------------- | :------------------------------------------------ | -------------- |
| `POST`   | `/user/transactions/create`               | Creates a new transaction. | User           |
| `PUT`  | `/user/transactions/edit/:id`               | Updates a transaction with ID.                               | User           |
| `DELETE`   | `/user/transactions/delete/:id`           | Deletes a transaction with ID.          | User           |
| `GET` | `/user/transactions`    | Fetches all transaction details with filtering & pagination.                    | User           |

