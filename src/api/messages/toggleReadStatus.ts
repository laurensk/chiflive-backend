import { Sql } from "../../Database";
import { Error } from "../helpers/ErrorHandling";
import Debug from "../helpers/Debug";

export const toggleReadStatus = (messageId: number, callback: Function) => {
  Sql.query("SELECT mesRead FROM CLMessages WHERE mesId = ?", [messageId], (err, rows) => {
    Debug.log(err);
    if (err) return callback(Error.unknownError, null);

    const currentReadStatus: number = rows[0].mesRead;
    const newReadStatus: number = currentReadStatus == 1 ? 0 : 1;

    Sql.query("UPDATE CLMessages SET mesRead = ? where mesId = ?", [newReadStatus, messageId], (err) => {
      Debug.log(err);
      if (err) return callback(Error.unknownError, null);
      callback(null, true);
    });
  });
};
