import { createContext, useState } from "react";
import { DisplayOffer } from "../types/DisplayOffer";

export const Contexts = createContext<any>(null);

export function ContextsProvider({ children }: any) {
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
    <Contexts.Provider value={{ jobs, overwriteJobs, addJob, removeJob }}>
      {children}
    </Contexts.Provider>
  );
}
