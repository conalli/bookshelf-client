describe("signin", () => {
  it("user visits the home page", () => {
    cy.visit("/signin");
    // should render input elements
    cy.findByRole("textbox");
    cy.findByPlaceholderText(/password/i);
    // should render login button
    cy.findByRole("button", { name: /log in/i });
  });
});
