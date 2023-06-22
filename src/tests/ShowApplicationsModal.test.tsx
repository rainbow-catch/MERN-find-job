import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Contexts } from "../contexts/Contexts";
import "@testing-library/jest-dom";
import Header from "../components/Header";
import { ContextsType } from "../types/ContextsType";
import { mockApplications } from "../functions/mockApplications";
import { mockLoggedUser } from "../functions/mockLoggedUser";

describe("Show Applications Modal Test", () => {
  test("should show default applications", async () => {
    const mockData: ContextsType = {
      jobs: [],
      overwriteJobs: () => {},
      addJob: () => {},
      removeJob: () => {},
      loggedUser: mockLoggedUser("admin@admin.com"),
      handleLogin: () => {},
      handleLogout: () => {},
      loggedAsAdmin: true,
      applications: mockApplications(),
      overwriteApplications: () => {},
      addApplication: () => {},
    };
    render(
      <Contexts.Provider value={mockData}>
        <Header></Header>
      </Contexts.Provider>
    );

    const expectedApplications = mockApplications();

    const showApplicationsButton = screen.getByTitle("showApplicationsButton");
    fireEvent.click(showApplicationsButton);
    const applications = await screen.findByTitle("applicationsOutputDiv");
    expect(applications).toBeInTheDocument();

    for (const el of expectedApplications) {
      const application = await screen.findByText(el.company_name);
      expect(application).toBeInTheDocument();
    }
  });
});
