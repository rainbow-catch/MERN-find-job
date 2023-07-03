import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ContextsProvider } from "../contexts/Contexts";
import "@testing-library/jest-dom";
import RegisterModal from "../components/RegisterModal";
import { generateRandomString } from "../functions/generateRandomString";
import { BrowserRouter } from "react-router-dom";

const fillInput = async (registerData: any) => {
  const loginInput = await screen.findByTitle("EmailInput");
  const passwordInput = await screen.findByTitle("PasswordInput");
  const companyNameInput = await screen.findByTitle("CompanyNameInput");
  const logoInput = await screen.findByTitle("LogoInput");
  fireEvent.change(loginInput, { target: { value: registerData.email } });
  fireEvent.change(passwordInput, { target: { value: registerData.password } });
  fireEvent.change(companyNameInput, {
    target: { value: registerData.company_name },
  });
  fireEvent.change(logoInput, { target: { value: registerData.logo } });
  const submitButton = await screen.findByTitle("submitButton");
  fireEvent.click(submitButton);
};

describe("Register Modal Test", () => {
  test("should register a new account", async () => {
    let showLoginModal = true;
    render(
      <ContextsProvider>
        <BrowserRouter>
          <RegisterModal
            show={showLoginModal}
            onHide={() => {
              showLoginModal = false;
            }}
          ></RegisterModal>
        </BrowserRouter>
      </ContextsProvider>
    );

    const registerData = {
      email: generateRandomString(10) + "@" + generateRandomString(8) + ".com",
      password: "testpassword",
      company_name: generateRandomString(12) + " " + generateRandomString(8),
      logo: "https://raw.githubusercontent.com/ajgoras/job-search-mern/main/csv/images/adminLogo.png",
    };

    await fillInput(registerData);

    const successInfo = await screen.findByText(
      "The company account has been successfully created!"
    );
    expect(successInfo).toBeInTheDocument();
  });

  test("should not register existing account", async () => {
    let showLoginModal = true;
    render(
      <ContextsProvider>
        <BrowserRouter>
          <RegisterModal
            show={showLoginModal}
            onHide={() => {
              showLoginModal = false;
            }}
          ></RegisterModal>
        </BrowserRouter>
      </ContextsProvider>
    );

    const registerData = {
      email: "andertonlabequipment@gmail.com",
      password: "hlestbdq",
      company_name: "Anderton Lab Equipment Ltd",
      logo: "https://raw.githubusercontent.com/ajgoras/job-search-mern/main/csv/images/Anderton%20Lab%20Equipment%20Ltd.png",
    };

    await fillInput(registerData);

    const errorInfo = await screen.findByText(
      "An account with this email address and company name already exists!"
    );
    expect(errorInfo).toBeInTheDocument();
  });
});
