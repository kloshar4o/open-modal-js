/// <reference types="cypress" />

describe("as a opening modal", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should open on click", () => {
    cy.get(".open-main-modal").click();
  });

  it("should open on openModal()", () => {
    cy.window().then((window) => {
      new window.OpenModalJs("main-modal").openModal();
    });
  });

  it("should open on isOpen = true", () => {
    cy.window().then((window) => {
      new window.OpenModalJs("main-modal").isOpen = true;
    });
  });

  it("should open on openOnInit = true", () => {
    cy.window().then((window) => {
      new window.OpenModalJs("main-modal", { openOnInit: true });
    });
  });

  afterEach(() => {
    cy.get("#main-modal.open").should("exist");
  });
});
