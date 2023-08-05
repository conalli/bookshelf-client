import { render, screen } from "@testing-library/react";
import BookshelfLogo from "./BookshelfLogo";

describe("Bookshelf Logo", () => {
  beforeEach(() => {
    render(<BookshelfLogo />);
  });

  test("should render correctly", () => {
    const logo = screen.getByText(/bookshelf/i);
    expect(logo).toBeInTheDocument();
  });
});
