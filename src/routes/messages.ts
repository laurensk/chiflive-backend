import express from "express";
import { Error } from "../api/helpers/ErrorHandling";
import { verifyPassword } from "../api/user/verifyPassword";
import Debug from "../api/helpers/Debug";
const router = express.Router();

router.route("/").get(verifyPassword, (req, res) => {});

router.route("/").delete(verifyPassword, (req, res) => {
  const messageId: string = req.body.messageId;
});

router.route("/toggleReadStatus").post(verifyPassword, (req, res) => {
  const messageId: string = req.body.messageId;
});

router.route("/").post((req, res) => {
  const { author, body }: { author: string; body: string } = req.body;
});

export default router;
