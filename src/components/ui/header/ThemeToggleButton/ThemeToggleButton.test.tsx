import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ThemeToggleButton from ".";

describe("Bookshelf Logo", () => {
  beforeEach(() => {
    render(
      <ThemeToggleButton
        buttonClass="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 focus:shadow-outline"
        iconClass={{
          dark: "p-1 md:p-2 text-orange-200 hover:text-orange-300 rounded-full",
          light: "p-1 md:p-2 text-gray-500 hover:text-gray-800 rounded-full",
        }}
      />
    );
  });
  describe("Should render button", () => {
    test("name label", () => {
      const button = screen.getByRole("button", { name: /dark mode/i });
      expect(button).toBeInTheDocument();
    });
  });
});
