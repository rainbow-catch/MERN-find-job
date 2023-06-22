import { LoggedUser } from "../types/LoggedUser";

export const mockLoggedUser = (user: string) => {
  const loggedUser: LoggedUser = {
    email: "",
    password: "",
    company_name: "",
    logo: "",
  };
  if (user === "admin@admin.com") {
    loggedUser.email = "admin@admin.com";
    loggedUser.password = "admin";
    loggedUser.company_name = "admin";
    loggedUser.logo =
      "https://raw.githubusercontent.com/ajgoras/job-search-mern/main/csv/images/adminLogo.png";
  }
  return loggedUser;
};
