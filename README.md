# 💳 SubLedger

A FinTech startup backend application designed for managing digital subscriptions. SubLedger provides a secure API with robust authentication and role-based access control to track recurring services efficiently.

---

## 🚀 Overview

**SubLedger** is an evolved infrastructure built to handle the complexities of digital subscriptions. It offers a clean API-first approach to managing user registration, secure login, and protected subscription lifecycles.

### ✨ Key Features

-   👤 **User Management**: Secure registration and login protocols.
-   🛡️ **Role-Based Access**: Separation of access based on roles (User / Admin).
-   🔒 **Protected Routes**: Secure endpoints requiring JWT authentication for data privacy.
-   📅 **Subscription Management**: Full CRUD capabilities for tracking digital services.

---

## 🛠 Tech Stack

| Component   | Technology                       |
| :---------- | :------------------------------- |
| **Backend** | Node.js, Express.js, and MongoDB |

---

## 📂 Project Structure

```text
├── Folder/
│   ├── config/         # Database connection
│   ├── controllers/    # API Endpoints & Logic
│   ├── middleware/     # Auth & Role Checks
│   ├── models/         # Data Storage & Schemas
│   ├── routes/         # API Routers
│   ├── utils/          # Helper Functions
│   └── server.js       # Server Setup
```

---

## 🔌 API Documentation

The **SubLedger** API provides a collection of RESTful endpoints for managing users and digital subscriptions. All request and response bodies are in `JSON` format.

### 👤 User Management & Auth

Endpoints for handling identity, authentication, and profile access.

| Method          | Endpoint          | Description                              | Auth    |
| :-------------- | :---------------- | :--------------------------------------- | :------ |
| <kbd>POST</kbd> | `/users/register` | Create a new user account                | Public  |
| <kbd>POST</kbd> | `/users/login`    | Authenticate and receive an access token | Public  |
| <kbd>GET</kbd>  | `/users/profile`  | Retrieve profile of the logged-in user   | Private |

### 📅 Subscription Operations

Core endpoints for managing individual user subscriptions.

| Method            | Endpoint             | Description                                 | Auth    |
| :---------------- | :------------------- | :------------------------------------------ | :------ |
| <kbd>GET</kbd>    | `/subscriptions`     | List all subscriptions for the current user | Private |
| <kbd>POST</kbd>   | `/subscriptions`     | Add a new digital subscription              | Private |
| <kbd>PUT</kbd>    | `/subscriptions/:id` | Update subscription details                 | Private |
| <kbd>DELETE</kbd> | `/subscriptions/:id` | Remove/Cancel a subscription                | Private |

### 🛡️ Admin Operations

Elevated endpoints reserved for users with the `Admin` role.

| Method         | Endpoint               | Description                                  | Auth       |
| :------------- | :--------------------- | :------------------------------------------- | :--------- |
| <kbd>GET</kbd> | `/subscriptions/admin` | Global view of all system-wide subscriptions | Admin Only |

---
