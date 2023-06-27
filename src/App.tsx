import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import { ContextsProvider } from "./contexts/Contexts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { router } from "./routes/router";

function App() {
  
  return (
    <ContextsProvider>
      <RouterProvider router={router} />
    </ContextsProvider>
  );
}

export default App;
