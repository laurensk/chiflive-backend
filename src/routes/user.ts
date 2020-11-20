import express from "express";
import { Error } from "../api/helpers/ErrorHandling";
import { verifyPassword } from "../api/user/verifyPassword";
import { getUser } from "../api/user/getUser";
import Debug from "../api/helpers/Debug";
const router = express.Router();

router.route("/").get(verifyPassword, (req, res) => {
  const uuid = req.body.uuid;
  getUser(uuid, (error, user) => {
    Debug.log(error);
    if (error) return Error.sendError(res, error);
    res.json({
      user: user,
    });
  });
});

export default router;
