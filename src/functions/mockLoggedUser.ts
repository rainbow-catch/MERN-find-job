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
  if (user === "ingramautomotive@gmail.com") {
    loggedUser.email = "ingramautomotive@gmail.com";
    loggedUser.password = "jrcioqfb";
    loggedUser.company_name = "Ingram Automotive Ltd";
    loggedUser.logo =
      "https://raw.githubusercontent.com/ajgoras/job-search-mern/main/csv/images/Ingram%20Automotive%20Ltd.png";
  }
  if (user === "experttechnologies@gmail.com") {
    loggedUser.email = "experttechnologies@gmail.com";
    loggedUser.password = "oshurdcp";
    loggedUser.company_name = "Expert Technologies";
    loggedUser.logo =
      "https://raw.githubusercontent.com/ajgoras/job-search-mern/main/csv/images/Expert%20Technologies.png";
  }

  return loggedUser;
};
