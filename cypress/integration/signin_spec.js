describe("signin", () => {
  beforeEach(() => {
    cy.visit("/signin");
  });
  it("Should render all elements to sign up on initial load.", () => {
    // Should render the nav.
    cy.findByRole("navigation");
    // Should render the heading.
    cy.findByRole("heading", { name: /sign up/i });
    // Should render labels.
    cy.findByText(/name:/i);
    cy.findByText(/password:/i);
    // Should render input elements.
    cy.findByRole("textbox");
    cy.findByPlaceholderText(/password/i);
    // Should render login button.
    cy.findByRole("button", { name: /sign up/i });
    // Should render subtitle with button to change to login form.
    cy.findByText(/already have an account\?/i);
    cy.findByRole("button", { name: /log in/i });
  });
  it("Should be able to change to switch from sign up form to log in form.", () => {
    cy.findByRole("button", { name: /log in/i }).click();
    // Should have changed to the log in form.
    cy.findByRole("heading", { name: /log in/i });
    cy.findByText(/don't have an account\?/i);
    cy.findByRole("button", { name: /sign up/i });
  });
  describe("Form Validation", () => {
    it("Should render messages asking user to input their data if input is clicked and no data is given.", () => {
      cy.findByRole("textbox").click();
      cy.findByPlaceholderText(/password/i).click();
      cy.findByRole("button", { name: /sign up/i }).click();
      // Should render message to users.
      cy.findByText(/please enter your username/i);
      cy.findByText(/please enter your password/i);
    });
    // TODO: make message consistent.
    it("Should tell user about min character lengths", () => {
      cy.findByRole("textbox").type("ab");
      cy.findByRole("button", { name: /sign up/i }).click();
      cy.findByText(/name: minimum 3 characters/i);
      cy.findByPlaceholderText(/password/i).type("1234");
      cy.findByRole("button", { name: /sign up/i }).click();
      cy.findByText(/password: min 5 characters/i);
    });
    it("Should tell user about max character lengths", () => {
      cy.findByRole("textbox").type("abcdefghijklmnop");
      cy.findByRole("button", { name: /sign up/i }).click();
      cy.location().should((loc) => expect(loc.pathname).to.eq("/signin"));
      cy.findByText(/Name cannot be longer than 12 characters/i);
      cy.findByPlaceholderText(/password/i).type("123456789012345678901");
      cy.findByRole("button", { name: /sign up/i }).click();
      cy.location().should((loc) => expect(loc.pathname).to.eq("/signin"));
      cy.findByText(/Password cannot be longer than 20 characters/i);
    });
    it("Should log user in with correct information", () => {
      const user = { name: "tom", password: "password" };
      cy.location().should((loc) => expect(loc.pathname).to.eq("/signin"));
      cy.findByRole("button", { name: /log in/i }).click();
      cy.findByRole("textbox").type(user.name);
      cy.findByPlaceholderText(/password/i).type(user.password);
      cy.findByRole("button", { name: /log in/i }).click();
      cy.location().should((loc) => expect(loc.pathname).to.eq("/dashboard"));
    });
  });
});
