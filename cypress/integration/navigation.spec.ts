// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

describe("Navigation", () => {
  it("should navigate to the credit simulation page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="solicitar-credito"]').click({
      multiple: true,
      force: true,
    });

    // The new url should include "/about"
    cy.url().should("include", "/solicitar-credito");

    // The new page should contain an h1 with "About page"
    cy.get("h2").contains("QUERO AVALIAR MEU CRÉDITO");
  });
});

export {};
