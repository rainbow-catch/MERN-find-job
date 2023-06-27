import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Contexts } from "../contexts/Contexts";
import "@testing-library/jest-dom";
import Header from "../components/Header";
import { ContextsType } from "../types/ContextsType";
import { mockLoggedUser } from "../functions/mockLoggedUser";
import { mockJobOffers } from "../functions/mockJobOffers";
import { DisplayOffer } from "../types/DisplayOffer";

describe("Add Offer Modal Test", () => {
  test("should add new job offer for specific company", async () => {
    const whichCompany = Math.floor(Math.random() * 2);
    const mockData: ContextsType = {
      jobs: mockJobOffers(),
      overwriteJobs: () => {},
      addJob: (job: DisplayOffer) => {
        mockData.jobs.push(job);
      },
      removeJob: () => {},
      loggedUser: mockLoggedUser("ingramautomotive@gmail.com"),
      handleLogin: () => {},
      handleLogout: () => {},
      loggedAsAdmin: false,
      applications: [],
      overwriteApplications: () => {},
      addApplication: () => {},
    };

    const newOfferData = {
      jobTitle: "(TEST) Junior Frontend Developer",
      seniority: "Junior",
      technology_1: "HTML",
      technology_2: "React",
      technology_3: "TypeScript",
      salary: "$3900",
      contract_types: "B2B",
      job_type: "Frontend",
      country: "Poland",
      description: "Test Offer \n Test next line",
    };

    if (whichCompany === 1) {
      mockData.loggedUser = mockLoggedUser("experttechnologies@gmail.com");
    }
    render(
      <Contexts.Provider value={mockData}>
        <Header></Header>
      </Contexts.Provider>
    );

    const showAddOfferModalButton = screen.getByTitle(
      "showAddOfferModalButton"
    );
    fireEvent.click(showAddOfferModalButton);

    const adContent = screen.getByTitle("ad_content");
    const seniority = screen.getByTitle("seniority");
    const technology_1 = screen.getByTitle("technology_1");
    const technology_2 = screen.getByTitle("technology_2");
    const technology_3 = screen.getByTitle("technology_3");
    const salary = screen.getByTitle("salary");
    const contract_types = screen.getByTitle("contract_types");
    const job_type = screen.getByTitle("job_type");
    const country = screen.getByTitle("country");
    const description = screen.getByTitle("description");
    const addOfferButton = screen.getByTitle("addOfferButton");

    const addOfferForm = await screen.findByTitle("addOfferForm");
    expect(addOfferForm).toBeInTheDocument();

    fireEvent.change(adContent, { target: { value: newOfferData.jobTitle } });
    fireEvent.change(seniority, { target: { value: newOfferData.seniority } });
    fireEvent.change(technology_1, {
      target: { value: newOfferData.technology_1 },
    });
    fireEvent.change(technology_2, {
      target: { value: newOfferData.technology_2 },
    });
    fireEvent.change(technology_3, {
      target: { value: newOfferData.technology_3 },
    });
    fireEvent.change(salary, { target: { value: newOfferData.salary } });
    fireEvent.change(contract_types, {
      target: { value: newOfferData.contract_types },
    });
    fireEvent.change(job_type, { target: { value: newOfferData.job_type } });
    fireEvent.change(country, { target: { value: newOfferData.country } });
    fireEvent.change(description, {
      target: { value: newOfferData.description },
    });
    fireEvent.click(addOfferButton);
    const successInfo = await screen.findByText(
      `Successfully added ${newOfferData.jobTitle} offer!`
    );
    expect(successInfo).toBeInTheDocument();
  });
});
