/// <reference types="cypress" />

describe("as a lockable body", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should lock scroll on opened modal", () => {
    // Initial scroll
    cy.window().scrollTo(100, 100);

    cy.window().then((window) => {
      // Cypress will wait for this Promise to resolve
      // we need this to wait for "opened:modal"
      // https://docs.cypress.io/api/utilities/promise#Basic-Promise
      return new Cypress.Promise((resolve) => {
        new window.OpenModalJs("main-modal").openModal();
        window.document.addEventListener("opened:modal", () => {
          cy.window().scrollTo(-100, -100);

          // Check if the body is overflow hidden, fixed and correctly shifted
          cy.get("body").then((body) => {
            const { position, overflow, left, top } = body[0].style;
            expect(position).eq("fixed");
            expect(overflow).eq("hidden");
            expect(parseInt(top)).approximately(-100, 1);
            expect(parseInt(left)).approximately(-100, 1);
          });

          // Close the modal and check if styles are removed
          cy.get(".x-icon").click();
          cy.get("body").invoke("css", "overflow").should("equal", "visible");
          resolve();
        });
      });
    });
  });
});
