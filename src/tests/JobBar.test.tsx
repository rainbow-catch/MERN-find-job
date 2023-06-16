import React from "react";
import { render } from "@testing-library/react";
import JobBar from "../components/JobBar";
import { ContextsProvider } from "../contexts/Contexts";
import '@testing-library/jest-dom'
test("renders job offers", async () => {
  render(
    <ContextsProvider>
      <JobBar searchTags={[]} searchText=""></JobBar>
    </ContextsProvider>
  );
  // eslint-disable-next-line testing-library/no-node-access
  const jobBarElement = document.querySelector("#jobBarContainer");
  expect(jobBarElement).toBeInTheDocument();
});
