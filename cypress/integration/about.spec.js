describe("about", () => {
  it("should navigate to the about page form the url", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/about");

    // The new page should contain an h1 with "About page"
    cy.get("h1").contains("We map the future");
  });
});
