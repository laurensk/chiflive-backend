import messages from "./routes/messages";
import user from "./routes/user";

import express from "express";
export const router = express.Router();

router.use("/messages", messages);
router.use("/user", user);
