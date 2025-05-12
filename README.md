
# 🍽️ Food Ordering App (Monorepo)


![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?logo=express)
![MySQL](https://img.shields.io/badge/MySQL-00758F?logo=mysql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?logo=jsonwebtokens)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)


A full-stack food ordering platform built with a modern web stack. This monorepo includes a **Next.js (TypeScript)** client and a **Node.js (Express, MySQL)** backend.

🔗 **Live Demo**: [app.dritongashi.com](https://app.dritongashi.com/)  
📦 **Source Code**: [GitHub Repository](https://github.com/Driton-Gashi/Monorepo)

---

## 🧩 Tech Stack

- **Frontend**: Next.js, TypeScript, TailwindCSS, plain CSS
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Vercel

---

## 🛠️ Features

### 👨‍🍳 Admin Panel
- Secure login for the shop/owner via JWT
- Add, edit, and delete food items
- Dashboard to manage food listings

### 👤 User System
- Register/Login via JWT
- Login is secured and validated server-side (inspect element–safe)
- Edit personal profiles: name, address, phone number, etc.
- View order history and past purchases

### 🛒 Ordering System
- Add items to cart (even as a guest)
- Order food with or without an account
- Cash on delivery only (no online payments yet)

### 📦 Other Features
- Monorepo architecture with clear separation of client/server
- Well-structured and reusable components
- Responsive UI across all devices

---

## 📂 Project Structure

```
/monorepo-root
│
├── /client        # Next.js frontend
│   ├── components
│   ├── pages
│   └── ...
│
├── /server        # Express backend
│   ├── routes
│   ├── controllers
│   ├── models
│   ├── Model.sql   # Database schema
│   └── ...
```

---

## 🔐 Security

- JWT-based authentication for users and admins
- Backend verifies tokens and blocks client-side tampering
- Admin-only routes are protected

---

## 🧪 Admin Test Account

You can use this account to log in as the Admin:

```bash
Email:    driton@gmail.com  
Password: test
```

---

## 🌍 Deployment

This project is deployed on **Vercel** and live at:  
👉 [https://app.dritongashi.com](https://app.dritongashi.com)

---

## 🧪 Environment Configuration

### 🔧 Client – `.env.development`

```env
# API Base URL (Live or Local)
NEXT_PUBLIC_API_URL=https://app.dritongashi.com
# NEXT_PUBLIC_API_URL=http://localhost:5000

# Frontend URL (usually localhost during dev)
NEXT_PUBLIC_Front_Url=http://localhost:3000

# Pinata IPFS Config – Required for file uploads
NEXT_PUBLIC_PINATA_API_Key=your_pinata_api_key
NEXT_PUBLIC_PINATA_API_SECRET=your_pinata_api_secret
NEXT_PUBLIC_PINATA_JWT=your_pinata_jwt
NEXT_PUBLIC_GATEWAY_URL=your_gateway_url
```

> 📝 You must [create an account on Pinata](https://www.pinata.cloud/) and generate API keys to use IPFS features.

---

### 🗄️ Server – `.env`

```env
# Server Port
PORT=5000

# MySQL Database (Online or Local)
DATABASE_HOST= ???
DATABASE_NAME= ???
DATABASE_USER= ???
DATABASE_PASSWORD= ???

# JWT Secret Key
JWT_SECRET=your_jwt_secret_key

# Optional – Used for CORS/Redirection
Client_Url=http://localhost:3000
```

---

## 📸 Screenshots

> Store screenshots in a `/screenshots` folder. Example image references below.

![Homepage](./screenshots/homepage.png)
![Admin Dashboard](./screenshots/admin-dashboard.png)
![Cart View](./screenshots/cart.png)

---

## 🧪 Running Locally

### Prerequisites

- Node.js (v18+ recommended)
- MySQL
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Driton-Gashi/Monorepo.git
cd Monorepo
```

### 2. Install Dependencies

```bash
cd client && npm install
cd ../server && npm install
```

### 3. Setup Environment Variables

- Create the following files:
  - `/client/.env.development`
  - `/client/.env.production`
  - `/server/.env`

> Copy values from `.env.example` or the sections above to configure.

### 4. Setup the Database

- Create a MySQL database (e.g. `food_app`)
- Import the provided schema:
  ```bash
  mysql -u youruser -p food_app < server/Model.sql
  ```

### 5. Run the App

```bash
# Start server
cd server && npm run dev

# Start frontend
cd ../client && npm run dev
```

---

## 📄 License

This project is open source and available under the **MIT License**.

---

## 👨‍💻 Author

**Driton Gashi**  
🌐 [Portfolio](http://app.dritongashi.com)  
📦 [GitHub](https://github.com/Driton-Gashi)
