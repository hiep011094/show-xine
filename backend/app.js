import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.js";

const app = express(express.json());

app.use(cookieParser());

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

// Router imports
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";

app.use("/api/v1", productRouter);

app.use("/api/v1", userRouter);

// Middleware for Errors
app.use(errorMiddleware);

export default app;
