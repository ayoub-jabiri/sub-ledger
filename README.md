# 💳 SubLedger

[![Trello](https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white)](https://trello.com/invite/b/69149dad2e2b021024a407e7/ATTI11b4515c73c183fe6908a5f5f017a77e316F22F4/sub-ledger)
[![Canva](https://img.shields.io/badge/Canva-%2300C4CC.svg?style=for-the-badge&logo=Canva&logoColor=white)](https://www.canva.com/design/DAG0oNOZpgM/kQuqwsmqQKU2cG9zbkPXvQ/edit?utm_content=DAG0oNOZpgM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

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

| Component   | Technology             |
| :---------- | :--------------------- |
| **Backend** | Node.js and Express.js |

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
