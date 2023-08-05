describe("dashboard", () => {
  beforeEach(() => {
    cy.visit("/signin");
    cy.findByPlaceholderText(/email/).type("test@bookshelftest.com");
    cy.findByPlaceholderText(/password/).type("123456");
    cy.get(
      "#top > div > div > div > div > form > div:nth-child(2) > div > button"
    ).click();
  });
  it("Should render components correctly when user visits their dashboard", () => {
    // Should display the nav.
    cy.findByRole("navigation");
    // Should show user's name, add command/ log out buttons.
    cy.findByRole("heading", { name: /test's bookshelf:/i });
    cy.findByRole("button", { name: /add/i });
    cy.findByRole("button", { name: /log out/i });
    // Should show commands table.
    cy.findByRole("columnheader", { name: /command/i });
    cy.findByRole("columnheader", { name: /url/i });
    cy.findByRole("columnheader", { name: /status/i });
    cy.findByRole("columnheader", { name: /delete/i });
  });
});

export {};
