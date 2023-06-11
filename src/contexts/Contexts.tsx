import { createContext, useState } from "react";
import { DisplayOffer } from "../types/DisplayOffer";
import { LoggedUser } from "../types/LoggedUser";

export const Contexts = createContext<any>(null);

export function ContextsProvider({ children }: any) {
  //jobsProvider
  const [jobs, setJobs] = useState<DisplayOffer[]>([]);
  //loggedUserProvider
  const [loggedUser, setLoggedUser] = useState<LoggedUser>({
    email: "",
    password: "",
    company_name: "",
    logo: "",
  });
  const [loggedAsAdmin, setLoggedAsAdmin] = useState(false);

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
    <Contexts.Provider
      value={{
        jobs,
        overwriteJobs,
        addJob,
        removeJob,
        loggedUser,
        setLoggedUser,
        loggedAsAdmin,
        setLoggedAsAdmin,
      }}
    >
      {children}
    </Contexts.Provider>
  );
}
