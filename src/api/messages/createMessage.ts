import { Sql } from "../../Database";
import { Error } from "../helpers/ErrorHandling";
import Debug from "../helpers/Debug";

export const createMessage = (author: string, body: string, callback: Function) => {
  Sql.query("INSERT INTO CLMessages (mesAuthor, mesBody) VALUES (?, ?)", [author, body], (err) => {
    Debug.log(err);
    if (err) return callback(Error.unknownError, null);
    callback(null, true);
  });
};
