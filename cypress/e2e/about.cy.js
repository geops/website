describe("about", () => {
  it("should navigate to the about page form the url", () => {
    // Start from the index page
    cy.visit("about");

    // The new page should contain an h1 with "About page"
    cy.get('[data-cy="pageMainTitle"]').should("be.visible");
  });

  it("should show desktop header image on desktop", () => {
    cy.viewport("macbook-15");
    cy.visit("about");

    cy.get('[data-cy="pageHeaderImage"]').should("be.visible");
  });
});
