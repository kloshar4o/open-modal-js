/// <reference types="cypress" />

describe("as a lockable body", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should lock scroll on opened modal", () => {
    // Initial scroll
    cy.window().scrollTo(100, 100);

    cy.window().then((window) => {
      new window.OpenModalJs("main-modal").openModal();
    });

    // Wait for the body to lock scroll
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100).then(() => {
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
    });
  });
});
