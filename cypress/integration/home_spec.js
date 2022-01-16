describe("home", () => {
  it("user visits the home page", () => {
    cy.visit("/");
    // should show logo
    cy.findByRole("img", { name: /bookshelf logo/i });
  });
});
