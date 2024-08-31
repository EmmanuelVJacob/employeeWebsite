import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connectMongoDB } from "./config/db.config";
import authRouter from "./routes/authRoute";
import morgan from "morgan";
import path from "path";
import employeeRouter from "./routes/employeeRoutes";

const app = express();
const allowedOrigins = [
  "http://localhost:3000" 
];

app.use(cors({
  origin: function (origin, callback) {
  
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(express.json());



app.use(morgan("common"));

connectMongoDB();

app.use("/api", authRouter);
app.use("/api/employee", employeeRouter);

app.use("/upload", express.static(path.join(__dirname, "../upload")));

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
