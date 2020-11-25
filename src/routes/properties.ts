import express from "express";
import { Error } from "../api/helpers/ErrorHandling";
import { verifyPassword } from "../api/user/verifyPassword";
import { verifyWritePermission } from "../api/user/verifyWritePermission";
import Debug from "../api/helpers/Debug";
import { toggleLiveEvent } from "../api/properties/toggleLiveEvent";
import { getLiveEvent } from "../api/properties/getLiveEvent";
const router = express.Router();

router.route("/isLiveEvent").post((req, res) => {
  getLiveEvent((error, value) => {
    Debug.log(error);
    if (error) return Error.sendError(res, error);
    res.json({
      isLiveEvent: {
        isLiveEvent: value,
      },
    });
  });
});

router.route("/toggleLiveEvent").post(verifyPassword, verifyWritePermission, (req, res) => {
  toggleLiveEvent((error, success) => {
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
