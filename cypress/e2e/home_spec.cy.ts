export {};
describe("home", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Should render all components when user visits the home page", () => {
    // Should display the nav.
    cy.findByRole("navigation");
    // Should show main logo/headings.
    cy.findByRole("heading", { name: /store\./i });
    cy.findByRole("heading", { name: /use\./i });
    cy.findByRole("heading", { name: /update\./i });
    cy.findByRole("heading", { name: /collaborate\.∗/i });
    cy.findByRole("heading", { name: /\(∗coming soon\)/i });
    // Should show Sign in button.
    cy.findByRole("button", { name: /sign up/i });
    // Should show Learn more button.
    cy.findByRole("button", { name: /learn more/i });
    // Should show subtitle.
    cy.findByText(
      /manage and use your bookmarks more efficiently than ever before\./i
    );
  });
  it("Should be able to navigate to the about section", () => {
    // Should be able to click learn more.
    cy.findByRole("button", { name: /learn more/i }).click();
    // Should be able to see about heading.
    cy.findByRole("heading", { name: /about bookshelf\./i });
  });
  it("Should render all elements of the about section", () => {
    // Should be able to click learn more.
    cy.findByRole("button", { name: /learn more/i }).click();
    // Should be able to see about/how headings.
    cy.findByRole("heading", { name: /about bookshelf\./i });
    cy.findByRole("heading", { name: /how\?/i });
    // TODO: Add name to list. ***
    cy.findByRole("article").within(() => cy.findByRole("list"));
    // Should have a link to top.
    cy.findByRole("link", { name: /to top/i });
  });
  it("Should be able to go back to the top of the page", () => {
    cy.findByRole("button", { name: /learn more/i }).click();
    cy.findByRole("heading", { name: /about bookshelf\./i });
    // Should move back to top on click.
    cy.findByRole("link", { name: /to top/i }).click();
    // Should be able to see main screen.
    cy.findByRole("navigation");
    cy.findByRole("button", { name: /sign up/i });
    cy.findByText(
      /manage and use your bookmarks more efficiently than ever before\./i
    );
  });
});
