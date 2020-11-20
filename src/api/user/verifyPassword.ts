import { Request, Response, NextFunction } from "express";
import { Sql } from "../../Database";
import Debug from "../helpers/Debug";
import { Error } from "../helpers/ErrorHandling";
import Bcrypt from "bcryptjs";

export const verifyPassword = (req: Request, res: Response, next: NextFunction) => {
  const { username, password }: { username: string; password: string } = req.body;

  Sql.query("SELECT useId, useName, useLogin FROM CLUsers WHERE useLogin = ?", [username], async (err, rows) => {
    Debug.log(err);
    if (err) return Error.sendError(res, Error.unknownError);
    if (rows.length != 1) return Error.sendError(res, Error.loginFailed);

    const dbUser = rows[0];
    const comparePassword = await Bcrypt.compare(password, dbUser.usePassword);

    if (comparePassword) {
      req.body.uuid = rows[0].useId;
      next();
    } else {
      return Error.sendError(res, Error.loginFailed);
    }
  });
};
