import { render, screen } from "@testing-library/react";
import React from "react";
import { BookshelfLogo } from "./bookshelf-logo";

describe("Bookshelf Logo", () => {
  beforeEach(() => {
    render(<BookshelfLogo />);
  });

  test("should render correctly", () => {
    const logo = screen.getByText(/bookshelf/i);
    expect(logo).toBeInTheDocument();
  });
});
