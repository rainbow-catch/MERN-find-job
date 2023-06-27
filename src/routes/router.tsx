import { createBrowserRouter } from "react-router-dom";
import Header from "../components/Header";
import SearchBarWithJobBar from "../components/SearchBarWithJobBar";
import ShowApplicationsModal from "../components/ShowApplicationsModal";

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
