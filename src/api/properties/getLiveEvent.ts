import { Sql } from "../../Database";
import { User } from "../../models/User.model";
import Debug from "../helpers/Debug";
import { Error } from "../helpers/ErrorHandling";

export const getLiveEvent = (callback: Function) => {
  Sql.query('SELECT proValue FROM CLProperties WHERE proName = "isLiveEvent"', (err, rows) => {
    Debug.log(err);
    if (err) return callback(Error.unknownError, null);
    if (rows.length != 1) return callback(Error.unknownError, null);
    const value = rows[0].proValue;
    const jsonValue: boolean = value == "1";
    callback(null, jsonValue);
  });
};
