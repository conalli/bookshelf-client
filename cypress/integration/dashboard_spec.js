describe("dashboard", () => {
  describe("New user", () => {
    beforeEach(() => {
      cy.visit("/signin");
      cy.findByRole("textbox").type("newuser");
      cy.findByPlaceholderText(/password/i).type("12345");
      cy.findByRole("button", { name: /sign up/i }).click();
    });
    it("Should see all dashboard elements.", () => {
      cy.location().should((loc) => expect(loc.pathname).to.eq("/dashboard"));
      // Should see the nav.
      cy.findByRole("navigation");
      // Should see a heading including their username.
      cy.findByRole("heading", { name: /newuser's bookmarks:/i });
      // Should see setup guide, add cmd and logout buttons.
      cy.findByRole("button", { name: /setup guide/i });
      cy.findByRole("button", { name: /add/i });
      cy.findByRole("button", { name: /log out/i });
      // Should see table placeholder message
      cy.findByText(/add your commands here\./i);
    });
  });
  describe("Current user", () => {
    beforeEach(() => {
      cy.visit("/signin");
      cy.findByRole("button", { name: /log in/i }).click();
      cy.findByRole("textbox").type("tom");
      cy.findByPlaceholderText(/password/i).type("password");
      cy.findByRole("button", { name: /log in/i }).click();
    });
    it("Should see all dashboard elements.", () => {
      cy.location().should((loc) => expect(loc.pathname).to.eq("/dashboard"));
      // Should see the nav.
      cy.findByRole("navigation");
      // Should see a heading including their username.
      cy.findByRole("heading", { name: /tom's bookmarks:/i });
      // Should see setup guide, add cmd and logout buttons.
      cy.findByRole("button", { name: /setup guide/i });
      cy.findByRole("button", { name: /add/i });
      cy.findByRole("button", { name: /log out/i });
      // Should see the table of with their bookmarks.
      cy.findByRole("table");
      cy.findByRole("cell", { name: /^g$/i });
      cy.findByRole("cell", { name: /www\.google\.com/i });
      cy.findByRole("cell", { name: /fb/i });
      cy.findByRole("cell", { name: /www\.facebook\.com/i });
      cy.findByRole("cell", { name: /^tw$/i });
      cy.findByRole("cell", { name: /www\.twitter\.com/i });
    });
  });
  describe("Bookmark functionality", () => {
    beforeEach(() => {
      cy.visit("/signin");
      cy.findByRole("textbox").type("newuser");
      cy.findByPlaceholderText(/password/i).type("12345");
      cy.findByRole("button", { name: /sign up/i }).click();
    });
    it("Should be able to open the add modal.", () => {
      cy.findByRole("button", { name: /add/i }).click();
      // Should see the modal with add command inputs.
      cy.findByRole("heading", { name: /add command:/i });
      cy.findByRole("textbox", { name: /command:/i });
      cy.findByRole("textbox", { name: /url:/i });
      cy.findByRole("button", { name: /cancel/i });
      cy.findByRole("button", { name: /add/i });
      // Add button should be disabled initially.
      cy.findByRole("button", { name: /add/i }).should("be.disabled");
    });
    it("Should be able to close the modal", () => {
      cy.findByRole("button", { name: /add/i }).click();
      cy.findByRole("button", { name: /cancel/i }).click();
      cy.findByRole("heading", { name: /newuser's bookmarks:/i });
    });
    it("Should be able to add a bookmark.", () => {
      cy.findByRole("button", { name: /add/i }).click();
      cy.findByRole("textbox", { name: /command:/i }).type("bbc");
      cy.findByRole("textbox", { name: /url:/i }).type("bbc.co.uk");
      cy.findByRole("button", { name: /add/i }).click();
      // Modal should close and should see table with new command.
      cy.findByRole("table");
      cy.findByRole("cell", { name: /^bbc$/i });
      cy.findByRole("cell", { name: /bbc\.co\.uk/i });
    });
    it("Should be able to close the modal", () => {
      cy.findByRole("button", { name: /add/i }).click();
      cy.findByRole("button", { name: /cancel/i }).click();
      cy.findByRole("heading", { name: /newuser's bookmarks:/i });
    });
    it("Should be able to open the delete modal.", () => {
      cy.findByRole("button", { name: /add/i }).click();
      cy.findByRole("textbox", { name: /command:/i }).type("bbc");
      cy.findByRole("textbox", { name: /url:/i }).type("bbc.co.uk");
      cy.findByRole("button", { name: /add/i }).click();
      cy.get("button.flex.justify-center.items-center.w-full").click();
      // Should see the modal with add command inputs.
      cy.findByRole("heading", { name: /delete command:/i });
      cy.findByText(/are you sure you want to delete command:/i);
      cy.findByText(/bbc \- bbc\.co\.uk/i);
      cy.findByRole("button", { name: /cancel/i });
      cy.findByRole("button", { name: /delete/i });
    });
    it("Should be able to close the delete modal.", () => {
      cy.findByRole("button", { name: /add/i }).click();
      cy.findByRole("textbox", { name: /command:/i }).type("bbc");
      cy.findByRole("textbox", { name: /url:/i }).type("bbc.co.uk");
      cy.findByRole("button", { name: /add/i }).click();
      cy.get("button.flex.justify-center.items-center.w-full").click();
      cy.findByRole("button", { name: /cancel/i }).click();
      cy.findByRole("table");
      cy.findByRole("cell", { name: /^bbc$/i });
      cy.findByRole("cell", { name: /bbc\.co\.uk/i });
    });
    it("Should be able to delete a bookmark.", () => {
      cy.findByRole("button", { name: /add/i }).click();
      cy.findByRole("textbox", { name: /command:/i }).type("fb");
      cy.findByRole("textbox", { name: /url:/i }).type("facebook.com");
      cy.findByRole("button", { name: /add/i }).click();
      // Delete bookmark.
      cy.get("button.flex.justify-center.items-center.w-full").click();
      cy.findByRole("button", { name: /delete/i }).click();
      // Modal should close and should see not table/ command.
      cy.findByText(/add your commands here\./i);
    });
  });
});
