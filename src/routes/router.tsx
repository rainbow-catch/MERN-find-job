import { createBrowserRouter } from "react-router-dom";
import Header from "../components/Header";
import SearchBarWithJobBar from "../components/SearchBarWithJobBar";
import ShowApplicationsModal from "../components/ShowApplicationsModal";
import ErrorComponent from "./errorComponents/ErrorComponent";
import ErrorHeader from "./errorComponents/ErrorHeader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div id="Index">
        <div id="upperBackground">
          <Header></Header>
        </div>
        <SearchBarWithJobBar></SearchBarWithJobBar>
      </div>
    ),
    errorElement: (
      <div id="Index">
        <div id="upperBackground">
          <ErrorHeader></ErrorHeader>
        </div>
        <ErrorComponent></ErrorComponent>
      </div>
    ),
  },
  {
    path: "applications",
    element: (
      <>
        <div id="Index">
          <div id="upperBackground">
            <Header></Header>
          </div>
          <SearchBarWithJobBar></SearchBarWithJobBar>
        </div>
        <ShowApplicationsModal></ShowApplicationsModal>
      </>
    ),
  },
]);
