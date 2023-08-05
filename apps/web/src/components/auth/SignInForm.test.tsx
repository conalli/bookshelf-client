import { render, screen } from "@testing-library/react";
import SignInForm from "./SignInForm";

describe("Bookshelf Logo", () => {
  beforeEach(() => {
    render(<SignInForm type="Sign in" />);
  });
  describe("Should render form elements", () => {
    test("name label", () => {
      const nameLabel = screen.getByText(/name:/i);
      expect(nameLabel).toBeInTheDocument();
    });
    test("name input", () => {
      const nameInput = screen.getByRole("textbox");
      expect(nameInput).toBeInTheDocument();
    });
    test("password label", () => {
      const passwordLabel = screen.getByText(/password:/i);
      expect(passwordLabel).toBeInTheDocument();
    });
    test("password input", () => {
      const passwordInput = screen.getByPlaceholderText("password");
      expect(passwordInput).toBeInTheDocument();
    });
    test("log in button", () => {
      const button = screen.getByRole("button", { name: /log in/i });
      expect(button).toBeInTheDocument();
    });
  });
});
