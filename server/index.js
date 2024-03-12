import express from "express";
import connectDB from "./Db/db.js";
import userRouter from "./Routes/userRouter.js";
import authRouter from "./Routes/authRouter.js";
import cookieParser from 'cookie-parser'

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cookieParser())

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});

connectDB();
