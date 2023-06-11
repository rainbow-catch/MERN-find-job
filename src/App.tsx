import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import Header from "./components/Header";
import SearchBarWithJobBar from "./components/SearchBarWithJobBar";
import { ContextsProvider } from "./contexts/Contexts";

function App() {
  return (
    <ContextsProvider>
      <div id="Index">
        <div id="upperBackground">
          <Header></Header>
        </div>
        <SearchBarWithJobBar></SearchBarWithJobBar>
      </div>
    </ContextsProvider>
  );
}

export default App;
