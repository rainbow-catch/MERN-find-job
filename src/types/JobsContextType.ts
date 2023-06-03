import { DisplayOffer } from "./DisplayOffer";

export interface JobsContextType {
  jobs: DisplayOffer[];
  overwriteJobs: any;
  addJob: any;
  removeJob: any;
}
