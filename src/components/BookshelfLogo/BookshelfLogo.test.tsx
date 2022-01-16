import { render, screen } from "@testing-library/react";
import BookshelfLogo from ".";

describe("Bookshelf Logo", () => {
  test("", () => {
    render(<BookshelfLogo />);
    const logo = screen.getByRole("img", { name: /bookshelf logo/i });
    expect(logo).toBeInTheDocument();
  });
});
