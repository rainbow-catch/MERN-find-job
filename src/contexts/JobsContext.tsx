import { createContext, useState } from "react";
import { DisplayOffer } from "../types/DisplayOffer";

export const JobsContext = createContext<any>(null);

export function JobsProvider({ children }: any) {
  const [jobs, setJobs] = useState<DisplayOffer[]>([]);

  const overwriteJobs = (value: DisplayOffer[]) => {
    setJobs(value);
  };

  const addJob = (job: DisplayOffer) => {
    setJobs((prevState) => [...prevState, job]);
  };

  return (
    <JobsContext.Provider value={{ jobs, overwriteJobs, addJob }}>
      {children}
    </JobsContext.Provider>
  );
}
