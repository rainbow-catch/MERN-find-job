import React from "react";
import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import { Contexts } from "../contexts/Contexts";
import "@testing-library/jest-dom";
import { ContextsType } from "../types/ContextsType";
import { mockApplications } from "../functions/mockApplications";
import { mockLoggedUser } from "../functions/mockLoggedUser";
import { RouterProvider } from "react-router-dom";
import { router } from "../routes/router";

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
        <RouterProvider router={router} />
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

  test("should show applications for specific company without every application", async () => {
    const whichCompany = Math.floor(Math.random() * 2);
    const mockData: ContextsType = {
      jobs: [],
      overwriteJobs: () => {},
      addJob: () => {},
      removeJob: () => {},
      loggedUser: mockLoggedUser("ingramautomotive@gmail.com"),
      handleLogin: () => {},
      handleLogout: () => {},
      loggedAsAdmin: false,
      applications: mockApplications(),
      overwriteApplications: () => {},
      addApplication: () => {},
    };
    if (whichCompany === 1) {
      mockData.loggedUser = mockLoggedUser("experttechnologies@gmail.com");
    }
    render(
      <Contexts.Provider value={mockData}>
        <RouterProvider router={router} />
      </Contexts.Provider>
    );

    const expectedApplications = mockApplications().filter(
      (application) =>
        application.company_name === mockData.loggedUser.company_name
    );
    const unexpectedApplications = mockApplications().filter(
      (application) =>
        application.company_name !== mockData.loggedUser.company_name
    );
    const showApplicationsButton = screen.getByTitle("showApplicationsButton");
    fireEvent.click(showApplicationsButton);
    const applications = await screen.findByTitle("applicationsOutputDiv");
    expect(applications).toBeInTheDocument();

    for (const el of expectedApplications) {
      const application = screen.queryByText(
        "Technologies: " + el.technologies
      );
      expect(application).toBeInTheDocument();
    }

    for (const el of unexpectedApplications) {
      const application = screen.queryByText(
        "Technologies: " + el.technologies
      );
      expect(application).not.toBeInTheDocument();
    }
  });
});
