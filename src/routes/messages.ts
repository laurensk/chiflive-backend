import express from "express";
import { Error } from "../api/helpers/ErrorHandling";
import { verifyPassword } from "../api/user/verifyPassword";
import Debug from "../api/helpers/Debug";
import { getAllMessages } from "../api/messages/getAllMessages";
import { createMessage } from "../api/messages/createMessage";
import { deleteMessage } from "../api/messages/deleteMessage";
import { toggleReadStatus } from "../api/messages/toggleReadStatus";
const router = express.Router();

router.route("/").get(verifyPassword, (req, res) => {
  getAllMessages((error, messages) => {
    Debug.log(error);
    if (error) return Error.sendError(res, error);
    res.json({
      entries: messages,
    });
  });
});

router.route("/").delete(verifyPassword, (req, res) => {
  const messageId: number = req.body.messageId;
  deleteMessage(messageId, (error, success) => {
    Debug.log(error);
    if (error) return Error.sendError(res, error);
    res.json({
      success: "true",
    });
  });
});

router.route("/toggleReadStatus").post(verifyPassword, (req, res) => {
  const messageId: number = req.body.messageId;
  toggleReadStatus(messageId, (error, success) => {
    Debug.log(error);
    if (error) return Error.sendError(res, error);
    res.json({
      success: "true",
    });
  });
});

router.route("/").post((req, res) => {
  const { author, body }: { author: string; body: string } = req.body;
  createMessage(author, body, (error, success) => {
    Debug.log(error);
    if (error) return Error.sendError(res, error);
    res.json({
      success: "true",
    });
  });
});

export default router;
