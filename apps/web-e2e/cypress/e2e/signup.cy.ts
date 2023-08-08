describe("signin", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });
  it("Should render all elements to sign up on initial load.", () => {
    // Should render the nav.
    cy.findByRole("navigation");
    // Should render the heading.
    cy.findByRole("heading", { name: /sign up/i });
    // Should render labels.
    cy.findByText(/email:/i);
    cy.findByText(/password:/i);
    // Should render input elements.
    cy.findByRole("textbox");
    cy.findByPlaceholderText(/password/i);
    // Should render sign in button.
    // TODO: Fix selector
    cy.get(
      "#top > div > div > div > div > form > div:nth-child(2) > div > button"
    ).should("be.visible");
    // Should render Google sign in button.
    cy.findByRole("button", { name: /sign up with google/i });
    // Should render subtitle with button to change to login form.
    cy.findByText(/already have an account\?/i);
    cy.findByText(/already have an account\?/i).within(() =>
      cy.findByRole("link", { name: /sign in/i })
    );
  });
  it("Should be able to change to switch from sign up form to log in form.", () => {
    cy.findByText(/already have an account\?/i).within(() =>
      cy.findByRole("link", { name: /sign in/i }).click()
    );
    // Should have changed to the sign in form.
    cy.findByRole("heading", { name: /sign in/i });
    cy.findByText(/don't have an account\?/i);
  });
});
export {};
