import { DisplayOffer } from "./DisplayOffer";
import { LoggedUser } from "./LoggedUser";
import { Application } from "./Application";

export interface ContextsType {
  jobs: DisplayOffer[];
  overwriteJobs: any;
  addJob: any;
  removeJob: any;
  loggedUser: LoggedUser;
  handleLogin: any;
  handleLogout: any;
  loggedAsAdmin: boolean;
  applications: Application[];
  overwriteApplications: any;
  addApplication: any;
}
