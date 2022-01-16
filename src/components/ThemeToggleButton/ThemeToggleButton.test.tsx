import { render, screen } from "@testing-library/react";
import ThemeToggleButton from ".";

describe("Bookshelf Logo", () => {
  beforeEach(() => {
    render(<ThemeToggleButton />);
  });
  describe("Should render button", () => {
    test("name label", () => {
      const button = screen.getByRole("button", { name: /dark mode/i });
      expect(button).toBeInTheDocument();
    });
  });
});
