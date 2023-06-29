import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ContextsProvider } from "../contexts/Contexts";
import "@testing-library/jest-dom";
import LoginModal from "../components/LoginModal";
import { BrowserRouter } from "react-router-dom";

describe("Login Modal Test", () => {
  test("should login as admin", async () => {
    let showLoginModal = true;
    render(
      <ContextsProvider>
        <BrowserRouter>
          <LoginModal
            show={showLoginModal}
            onHide={() => {
              showLoginModal = false;
            }}
          ></LoginModal>
        </BrowserRouter>
      </ContextsProvider>
    );

    const loginData = {
      email: "admin@admin.com",
      password: "admin",
    };

    //const loginForm = screen.getByTitle("login-form");
    //console.log(prettyDOM(loginForm));
    const loginInput = await screen.findByTitle("EmailInput");
    const passwordInput = await screen.findByTitle("PasswordInput");
    fireEvent.change(loginInput, { target: { value: loginData.email } });
    fireEvent.change(passwordInput, { target: { value: loginData.password } });
    const submitButton = screen.getByTitle("submitButton");
    fireEvent.click(submitButton);
    const successInfo = await screen.findByText(
      "Successfully logged as admin@admin.com"
    );
    expect(successInfo).toBeInTheDocument();
  });

  test("should not login to an account that does not exist", async () => {
    let showLoginModal = true;
    render(
      <ContextsProvider>
        <BrowserRouter>
          <LoginModal
            show={showLoginModal}
            onHide={() => {
              showLoginModal = false;
            }}
          ></LoginModal>
        </BrowserRouter>
      </ContextsProvider>
    );

    const loginData = {
      email: "adminnn@adminnn.comr",
      password: "adminnn",
    };

    const loginInput = await screen.findByTitle("EmailInput");
    const passwordInput = await screen.findByTitle("PasswordInput");
    fireEvent.change(loginInput, { target: { value: loginData.email } });
    fireEvent.change(passwordInput, { target: { value: loginData.password } });
    const submitButton = screen.getByTitle("submitButton");
    fireEvent.click(submitButton);
    const errorInfo = await screen.findByText("Bad login or password!");
    expect(errorInfo).toBeInTheDocument();
  });
});
