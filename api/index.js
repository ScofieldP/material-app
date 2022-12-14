import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import warehousesRoute from "./routes/warehouses.js";
import materialsRoute from "./routes/materials.js";
import supplierRoute from "./routes/suppliers.js";
import factoryRoute from "./routes/factories.js";
import importRoute from "./routes/import.js";
import exportRoute from "./routes/export.js";

import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
//middlewares

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use(cookieParser());
app.use(express.json());

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/warehouses", warehousesRoute);
app.use("/api/materials", materialsRoute);
app.use("/api/suppliers", supplierRoute);
app.use("/api/factories", factoryRoute);
app.use("/api/imports", importRoute);
app.use("/api/exports", exportRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});
