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
import orderRouter from "./routers/orderRouter.js";
import menuRouter from './routers/menuRouter.js';
import hotlineRouter from './routers/hotlineRouter.js';
import socialRouter from './routers/socialRouter.js';
import sliderHeroRouter from './routers/sliderHeroRouter.js';
import blogRouter from './routers/blogRouter.js';
import newsRouter from './routers/newsRouter.js';
import customerRouter from './routers/customerRouter.js';


app.use("/api/v1", productRouter);

app.use("/api/v1", userRouter);

app.use("/api/v1", orderRouter);

app.use("/api/v1", menuRouter);

app.use("/api/v1", hotlineRouter);

app.use("/api/v1", socialRouter);

app.use("/api/v1", sliderHeroRouter);

app.use("/api/v1", blogRouter);

app.use("/api/v1", newsRouter);

app.use("/api/v1", customerRouter);

// Middleware for Errors
app.use(errorMiddleware);

export default app;