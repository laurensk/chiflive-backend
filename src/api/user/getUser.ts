import { Sql } from "../../Database";
import { User } from "../../models/User.model";
import Debug from "../helpers/Debug";
import { Error } from "../helpers/ErrorHandling";

export const getUser = (uuid: string, callback: Function) => {
  Sql.query("SELECT useId, useName, useLogin FROM CLUsers WHERE useId = ?", [uuid], (err, rows) => {
    Debug.log(err);
    if (err) return callback(Error.unknownError, null);
    if (rows.length != 1) return callback(Error.unknownError, null);
    const dbUser = rows[0];
    const user = new User(dbUser.useId, dbUser.useName, dbUser.useLogin);
    callback(null, user);
  });
};
