import { createUser } from "./api/user/createUser";

const cliArgs: string[] = process.argv.slice(2);
const userData: { name: string; login: string; password: string } = {
  name: cliArgs[0],
  login: cliArgs[1],
  password: cliArgs[2],
};
createUser(userData.name, userData.login, userData.password, false, (error, user: { login: string; name: string }) => {
  if (error) return console.log("Error creating user... Please try again!");
  console.log("User " + user.name + " created successfully.");
});
