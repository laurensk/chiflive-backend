import express from "express";
import { Error } from "../api/helpers/ErrorHandling";
import { verifyPassword } from "../api/user/verifyPassword";
import Debug from "../api/helpers/Debug";
import { getAllMessages } from "../api/messages/getAllMessages";
import { createMessage } from "../api/messages/createMessage";
import { deleteMessage } from "../api/messages/deleteMessage";
import { toggleReadStatus } from "../api/messages/toggleReadStatus";
const router = express.Router();

router.route("/get").post(verifyPassword, (req, res) => {
  getAllMessages((error, messages) => {
    Debug.log(error);
    if (error) return Error.sendError(res, error);
    res.json({
      messages: messages,
    });
  });
});

router.route("/delete").post(verifyPassword, (req, res) => {
  const messageId: number = req.body.messageId;
  if (messageId == undefined) return Error.sendError(res, Error.validationError);
  deleteMessage(messageId, (error, success) => {
    Debug.log(error);
    if (error) return Error.sendError(res, error);
    res.json({
      success: {
        success: "true",
      },
    });
  });
});

router.route("/toggleReadStatus").post(verifyPassword, (req, res) => {
  const messageId: number = req.body.messageId;
  toggleReadStatus(messageId, (error, success) => {
    Debug.log(error);
    if (error) return Error.sendError(res, error);
    res.json({
      success: {
        success: "true",
      },
    });
  });
});

router.route("/").post((req, res) => {
  const { author, body }: { author: string; body: string } = req.body;
  if (author == undefined || body == undefined) return Error.sendError(res, Error.validationError);
  if (body.length < 2) return Error.sendError(res, Error.validationError);
  createMessage(author, body, (error, success) => {
    Debug.log(error);
    if (error) return Error.sendError(res, error);
    res.json({
      success: {
        success: "true",
      },
    });
  });
});

export default router;
