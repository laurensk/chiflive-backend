import { Sql } from "../../Database";
import { Error } from "../helpers/ErrorHandling";
import Debug from "../helpers/Debug";
import { Message } from "../../models/Message.model";

export const getAllMessages = (callback: Function) => {
  Sql.query(
    "SELECT mesId, mesAuthor, mesBody, mesCreationDate, mesRead FROM CLMessages ORDER BY mesCreationDate DESC",
    (err, rows) => {
      Debug.log(err);
      if (err) return callback(Error.unknownError, null);

      let messages: Message[] = [];
      rows.forEach((dbMessage) => {
        messages.push(
          new Message(
            dbMessage.mesId,
            dbMessage.mesAuthor,
            dbMessage.mesBody,
            dbMessage.mesCreationDate,
            dbMessage.mesRead
          )
        );
      });
      callback(null, messages);
    }
  );
};
