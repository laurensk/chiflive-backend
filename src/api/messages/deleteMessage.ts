import { Sql } from "../../Database";
import { Error } from "../helpers/ErrorHandling";
import Debug from "../helpers/Debug";

export const deleteMessage = (messageId: number, callback: Function) => {
  Sql.query("DELETE FROM CLMessages WHERE mesId = ?", [messageId], (err) => {
    Debug.log(err);
    if (err) return callback(Error.unknownError, null);
    callback(null, true);
  });
};
