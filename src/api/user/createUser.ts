import { Sql } from "../../Database";
import { Error } from "../helpers/ErrorHandling";
import Debug from "../helpers/Debug";
import Bcrypt from "bcryptjs";

export const createUser = (name: string, login: string, password: string, callback: Function) => {
  Sql.query("SELECT useLogin FROM CLUsers WHERE useLogin = ?", [login], async (err, rows) => {
    Debug.log(err);
    if (err) return callback(Error.unknownError, null);
    if (rows.length > 0) return callback(Error.loginExists, null);

    const salt = await Bcrypt.genSalt();
    const hashPassword = await Bcrypt.hash(password, salt);

    Sql.query(
      "INSERT INTO CLUsers (useName, useLogin, useHash, useSalt) VALUES (?, ?, ?, ?)",
      [name, login, hashPassword, salt],
      (err) => {
        Debug.log(err);
        if (err) return callback(Error.unknownError, null);
        return callback(null, { login, name });
      }
    );
  });
};
