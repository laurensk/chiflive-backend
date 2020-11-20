import messages from "./routes/messages";
import properties from "./routes/properties";
import user from "./routes/user";

import express from "express";
export const router = express.Router();

router.use("/messages", messages);
router.use("/properties", properties);
router.use("/user", user);
