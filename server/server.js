import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/auth/auth-routes.js';
import adminProductsRouter from './routes/admin/products-routes.js';
import shopProductsRouter from './routes/shop/products-routes.js';
import locationRoutes from './routes/locationRoutes.js';
import userRoutes from './routes/user/UserRoutes.js';
import productRoutes from "./routes/shop/products-routes.js";
import categoryRoutes from "./routes/categoryRoutes.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductsRouter); // Protected with isAdmin
app.use('/api/shop/products', shopProductsRouter);
app.use('/api/location', locationRoutes);
app.use('/api/users', userRoutes); // This makes /api/users/account valid
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);


// Default Route
app.get('/', (req, res) => {
  res.send('🌍 Drenation API is running');
});

// MongoDB Connection and Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
