![RedOven](https://github.com/user-attachments/assets/f992239b-88d0-4edf-831b-72c123896f18)# Pizza Order Delivery System

A full-stack web application for managing pizza orders and deliveries, built with React frontend and Spring Boot backend.

## 🍕 Features

- **Customer Portal**

  - Browse pizza menu with detailed descriptions and pricing
  - Customize pizza orders (size, toppings, crust type)
  - **Secure payment processing with Stripe**
  - Real-time order tracking
  - User registration and authentication
  - Order history and favorites
  - Delivery address management

- **Admin Dashboard**

  - Order management and status updates
  - Menu item management (add, edit, delete pizzas)
  - Customer management
  - **Payment and transaction monitoring**
  - Sales analytics and reporting
  - Inventory tracking

- **Delivery Management**
  - Delivery assignment and tracking
  - Route optimization
  - Delivery status updates
  - Driver management

## 🛠 Tech Stack

### Frontend

- **React** - User interface framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3/Bootstrap** - Styling and responsive design
- **JavaScript (ES6+)** - Core programming language

### Backend

- **Spring Boot** - Java application framework
- **Spring Security** - Authentication and authorization
- **Spring Data MongoDB** - MongoDB database abstraction layer
- **MongoDB Atlas** - Cloud-hosted MongoDB database
- **Stripe API** - Payment processing integration
- **Maven** - Build automation and dependency management

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Java** (JDK 11 or higher)
- **Maven** (v3.6 or higher)
- **MongoDB Atlas Account** (free tier available)
- **Stripe Account** (for payment processing)

## 🚀 Installation & Setup

### Backend Setup (Spring Boot)

1. **Clone the repository**

   ```bash
   git clone https://github.com/DH-0216/pizza-order-delivery-system.git
   cd pizza-order-delivery-system
   ```

2. **Navigate to backend directory**

   ```bash
   cd backend
   ```

3. **Configure environment variables (Backend/.env)**

   ```env

   # MongoDB Atlas
   MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<db>?retryWrites=true&w=majority

   # Stripe Secret
   STRIPE_SECRET_KEY=sk_live_or_test_key

   # Firebase Admin (choose ONE)
   # Preferred: raw JSON as single line
   FIREBASE_CONFIG_JSON={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"..."}

   # CORS (comma-separated origins)
   ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174

   # Port (optional)
   SERVER_PORT=8080
   ```
  
4. **Update application.properties**

   ```properties
    spring.application.name=PizzaDeliveryBackend
    
    spring.data.mongodb.uri=${MONGODB_URI}
    stripe.secret.key=${STRIPE_SECRET_KEY}
    FIREBASE_CONFIG_JSON=${FIREBASE_CONFIG_JSON:}
    
    ALLOWED_ORIGINS=${ALLOWED_ORIGINS}
    
    server.port=8080
   ```

5. **Install dependencies and run**

   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   The backend server will start on `http://localhost:8080`

### Environment Setup

#### MongoDB Atlas Setup:

1. Create a [MongoDB Atlas](https://www.mongodb.com/atlas) account
2. Create a new cluster (free tier available)
3. Create a database user with read/write permissions
4. Whitelist your IP address or use 0.0.0.0/0 for development
5. Get your connection string and update the `MONGODB_URI` in `.env`

#### Stripe Setup:

1. Create a [Stripe](https://stripe.com) account
2. Go to Developers → API Keys
3. Copy your publishable key and secret key
4. Update the Stripe keys in your `.env` file

### Frontend Setup (React)

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```


3. **Configure Firebase Web env (Frontend/.env)**

   ```env
   VITE_FIREBASE_API_KEY=YOUR_WEB_API_KEY
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
   VITE_FIREBASE_APP_ID=YOUR_APP_ID
   VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

4. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

   The frontend will start on `http://localhost:3000`

## 🗄 Database Schema

The application uses MongoDB collections with the following main document structures:

- **Users** - Customer and admin information

  ```json
  {
    "_id": "ObjectId",
    "username": "string",
    "email": "string",
    "password": "hashed_string",
    "role": "CUSTOMER|ADMIN",
    "addresses": [
      { "street": "string", "city": "string", "zipCode": "string" }
    ],
    "createdAt": "date"
  }
  ```

- **Orders** - Order details and status

  ```json
  {
    "_id": "ObjectId",
    "userId": "ObjectId",
    "items": [
      { "productId": "ObjectId", "quantity": "number", "price": "number" }
    ],
    "totalAmount": "number",
    "status": "PENDING|CONFIRMED|PREPARING|OUT_FOR_DELIVERY|DELIVERED",
    "paymentIntentId": "string",
    "deliveryAddress": "object",
    "createdAt": "date"
  }
  ```

- **Products** - Pizza menu items
  ```json
  {
    "_id": "ObjectId",
    "name": "string",
    "description": "string",
    "price": "number",
    "category": "string",
    "imageUrl": "string",
    "available": "boolean"
  }
  ```

## 🎯 Usage

### For Customers:

1. Register/Login to your account
2. Browse the pizza menu
3. Add items to cart and customize as needed
4. Proceed to checkout and enter delivery details
5. Track your order in real-time
6. Rate and review your order after delivery

### For Admins:

1. Login with admin credentials
2. Manage menu items and categories
3. View and update order statuses
4. Assign deliveries to drivers
5. View sales reports and analytics

## 🧪 Testing

### Backend Testing

```bash
cd backend
mvn test
```

### Frontend Testing

```bash
cd frontend
npm test
# or
yarn test
```


## 🚀 Deployment

### Backend Deployment

1. Build the JAR file:
   ```bash
   mvn clean package
   ```
2. Deploy to your preferred hosting service (Heroku, AWS, etc.)

### Frontend Deployment

1. Build the production version:
   ```bash
   npm run build
   ```
2. Deploy the `build` folder to your hosting service (Netlify, Vercel, etc.)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Authors

**Dulaj Hashmika**
- GitHub: [@DH-0216](https://github.com/DH-0216)

**Thisari Hettiarachchi**
- GitHub: [@thisari-hettiarachchi](https://github.com/thisari-hettiarachchi)

**Prabash Lakshitha**
- GitHub: [@Prabashlakshitha](https://github.com/Prabashlakshitha)

**Biyanga Kalupahana**
- GitHub: [@BiyangaKalupahana](https://github.com/BiyangaKalupahana)

**Rashmi Wickramarathne**
- GitHub: [@RashmiWick](https://github.com/RashmiWick)

**Hansani Madurangi**
- GitHub: [@Hansani2002-ab](https://github.com/Hansani2002-ab)

## 🙏 Acknowledgments

- Thanks to all contributors who helped build this project
- Inspired by modern food delivery applications
- Built with love for pizza enthusiasts 🍕

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainer.

---

**Happy Coding and Enjoy Your Pizza! 🍕**
