import React from "react";
import { render, screen } from "@testing-library/react";
import JobBar from "../components/JobBar";
import { ContextsProvider } from "../contexts/Contexts";
import "@testing-library/jest-dom";

test("renders job offers", async () => {
  render(
    <ContextsProvider>
      <JobBar searchTags={[]} searchText=""></JobBar>
    </ContextsProvider>
  );
  const jobBarElement = screen.getByTitle("jobBarContainer");
  expect(jobBarElement).toBeInTheDocument();
});
