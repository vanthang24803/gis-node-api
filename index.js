import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connection } from "./lib/db.js";
import router from "./router/index.js";


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3000;

connection();

app.listen(port, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
