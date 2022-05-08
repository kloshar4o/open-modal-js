/// <reference types="cypress" />

describe("as a closing modals", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".open-main-modal").click();

    // Clone modal
    cy.cloneMainModal("second-modal").then(({ mainModal, newModal }) => {
      // Appends cloned modal after the main modal
      mainModal.after(newModal);

      // Create and opened OpenModalJs object modal
      cy.window().then((window) => {
        new window.OpenModalJs("second-modal", { openOnInit: true });
      });
    });
  });

  it("should both modals be opened", () => {
    cy.get("#main-modal.open").should("exist");
    cy.get(`#second-modal.open`).should("exist");
  });

  it("should close above modal", () => {
    cy.get("button.modal-close").last().click();
    cy.get("#main-modal.open").should("exist");
    cy.get(`#second-modal.open`).should("not.exist");
  });

  it("should close both modals", () => {
    cy.get("button.modal-close").last().click();
    cy.get("button.modal-close").first().click();
    cy.get("#main-modal.open").should("not.exist");
    cy.get(`#second-modal.open`).should("not.exist");
  });
});
