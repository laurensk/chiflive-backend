import express from "express";
import cors from "cors";
import { resolve } from "path";
import { router } from "./Router";

import dotenv from "dotenv";
dotenv.config({ path: resolve(__dirname, "../.env") });

const app = express();

app.use(express.json());
app.disable("x-powered-by");

app.use(cors());

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(router);

app.listen(process.env.PORT || 8081, () => {
  console.log("ChifLive-Backend started on port " + process.env.PORT || 8081);
});
