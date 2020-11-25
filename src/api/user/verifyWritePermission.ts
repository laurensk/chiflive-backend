import { Request, Response, NextFunction } from "express";
import { Sql } from "../../Database";
import Debug from "../helpers/Debug";
import { Error } from "../helpers/ErrorHandling";

export const verifyWritePermission = (req: Request, res: Response, next: NextFunction) => {
  const uuid = req.body.uuid;
  Sql.query("SELECT useWritePermission FROM CLUsers WHERE useId = ?", [uuid], async (err, rows) => {
    Debug.log(err);
    if (err) return Error.sendError(res, Error.unknownError);
    if (rows.length != 1) return Error.sendError(res, Error.unknownError);

    const dbUser = rows[0];
    const hasWritePermission: boolean = dbUser.useWritePermission == 1 ? true : false;

    if (hasWritePermission) {
      next();
    } else {
      return Error.sendError(res, Error.unknownError);
    }
  });
};
