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

  const removeJob = (id: string) => {
    const offerToRemove = jobs.find((item) => item._id === id);
    setJobs(jobs.filter((item) => item !== offerToRemove));
  };

  return (
    <JobsContext.Provider value={{ jobs, overwriteJobs, addJob, removeJob }}>
      {children}
    </JobsContext.Provider>
  );
}
