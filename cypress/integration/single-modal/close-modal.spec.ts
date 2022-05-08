/// <reference types="cypress" />

describe("as a closing modal", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".open-main-modal").click();
  });

  it("should close on click .modal-overlay", () => {
    // eslint-disable-next-line cypress/no-force
    cy.get(".modal-overlay").click({ force: true });
  });

  it("should close on click .x-icon.modal-close", () => {
    cy.get(".x-icon.modal-close").click();
  });

  it("should close on click button.modal-close", () => {
    cy.get("button.modal-close").click();
  });

  it("should close on closeModal()", () => {
    cy.window().then((window) => {
      new window.OpenModalJs("main-modal").closeModal();
    });
  });

  it("should close on isOpen = false", () => {
    cy.window().then((window) => {
      new window.OpenModalJs("main-modal").isOpen = false;
    });
  });

  afterEach(() => {
    cy.get("#main-modal.open").should("not.exist");
    cy.get("#main-modal").should("exist");
  });
});
