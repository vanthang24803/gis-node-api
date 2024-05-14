import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connection } from "./lib/db.js";
import router from "./router/index.js";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/api/v1", router);
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3000;

connection();

app.listen(port, () => {
  console.log(
    `App listening mode ${process.env.NODE_ENV} on port ${process.env.PORT}`
  );
});
