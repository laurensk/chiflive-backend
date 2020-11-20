import { Sql } from "../../Database";
import { Error } from "../helpers/ErrorHandling";
import Debug from "../helpers/Debug";

export const toggleLiveEvent = (callback: Function) => {
  Sql.query('SELECT proValue FROM CLProperties WHERE proName = "isLiveEvent"', (err, rows) => {
    Debug.log(err);
    if (err) return callback(Error.unknownError, null);
    if (rows.length != 1) return callback(Error.unknownError, null);

    const currentValue: string = rows[0].proValue;
    const newValue: string = currentValue == "1" ? "0" : "1";

    Sql.query('UPDATE CLProperties SET proValue = ? where proName = "isLiveEvent"', [newValue], (err) => {
      Debug.log(err);
      if (err) return callback(Error.unknownError, null);
      callback(null, true);
    });
  });
};
