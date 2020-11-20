import { Sql } from "../../Database";
import { Error } from "../helpers/ErrorHandling";
import Debug from "../helpers/Debug";

export const createMessage = (author: string, body: string, callback: Function) => {
  Sql.query('SELECT proValue FROM CLProperties WHERE proName = "isLiveEvent"', (err, rows) => {
    Debug.log(err);
    if (err) return callback(Error.unknownError, null);
    if (rows.length != 1) return callback(Error.unknownError, null);
    const isLiveEvent: string = rows[0].proValue;
    if (isLiveEvent == "1") {
      Sql.query("INSERT INTO CLMessages (mesAuthor, mesBody) VALUES (?, ?)", [author, body], (err) => {
        Debug.log(err);
        if (err) return callback(Error.unknownError, null);
        callback(null, true);
      });
    } else {
      return callback(Error.noLiveEvent, null);
    }
  });
};
