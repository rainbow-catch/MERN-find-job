import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css"
import Header from "./components/Header";
import SearchBarWithJobBar from "./components/SearchBarWithJobBar";
import { LoggedUser } from "./types/LoggedUser";

function App() {
  const [loggedUser, setLoggedUser] = useState<LoggedUser>({
    email: "",
    password: "",
    company_name: "",
    logo: "",
  });
  const [loggedAsAdmin, setLoggedAsAdmin] = useState(false);
  return (
    <div id="Index">
      <div id="upperBackground">
        <Header
          setLoggedUser={setLoggedUser}
          loggedUser={loggedUser}
          loggedAsAdmin={loggedAsAdmin}
          setLoggedAsAdmin={setLoggedAsAdmin}
        ></Header>
      </div>
      <SearchBarWithJobBar
        loggedUser={loggedUser.company_name}
        loggedAsAdmin={loggedAsAdmin}
      ></SearchBarWithJobBar>
    </div>
  );
}

export default App;
