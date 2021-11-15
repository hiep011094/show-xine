import app from "./app.js";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";

//Handling Unaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unaught Exception`);
  process.exit(1);
});

//config

dotenv.config({ path: "backend/config/config.env" });

//connect to Database

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
