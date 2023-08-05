import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import ThemeToggleButton from "./ThemeToggleButton";

let localStorageMock: { [key: string]: string } = {};

beforeAll(() => {
  global.matchMedia = jest.fn((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));

  global.Storage.prototype.getItem = jest.fn(
    (key: string) => localStorageMock[key]
  );
  global.Storage.prototype.setItem = jest.fn((key: string, value: string) => {
    localStorageMock[key] = value;
  });
});

beforeEach(() => {
  localStorageMock = {};
});

describe("Theme Toggle Button", () => {
  beforeEach(() => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeToggleButton
          buttonClass="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 focus:shadow-outline"
          iconClass={{
            dark: "p-1 md:p-2 text-orange-200 hover:text-orange-300 rounded-full",
            light: "p-1 md:p-2 text-gray-500 hover:text-gray-800 rounded-full",
          }}
        />
      </ThemeProvider>
    );
  });
  test("should render the button correctly", () => {
    const button = screen.getByRole("button", { name: /theme\-toggle/i });
    expect(button).toBeInTheDocument();
  });
  test("should default to moon icon in light mode", () => {
    const moon = screen.getByText("dark-mode");
    expect(moon).toBeInTheDocument();
  });
  test("should toggle to dark mode on click", async () => {
    const button = screen.getByRole("button", { name: /theme\-toggle/i });
    fireEvent.click(button);
    const sun = screen.getByText("light-mode");
    expect(sun).toBeInTheDocument();
  });
});
