import { DisplayOffer } from "./DisplayOffer";
import { LoggedUser } from "./LoggedUser";

export interface ContextsType {
  jobs: DisplayOffer[];
  overwriteJobs: any;
  addJob: any;
  removeJob: any;
  loggedUser: LoggedUser;
  handleLogin: any;
  handleLogout: any;
  loggedAsAdmin: boolean;
}
