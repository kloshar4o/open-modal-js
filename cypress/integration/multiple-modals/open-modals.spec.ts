/// <reference types="cypress" />

describe("as a opening modals", () => {
  beforeEach(() => {
    cy.visit("/");

    // Clone modal
    cy.cloneMainModal("second-modal").then(({ mainModal, newModal }) => {
      // Appends cloned modal after the main modal
      mainModal.after(newModal);

      // Create OpenModalJs object and add open button
      cy.window().then((window) => {
        const secondModal = new window.OpenModalJs("second-modal");
        const openSecondModalButton = document.createElement("button");
        openSecondModalButton.innerText = "Open Second Modal";
        openSecondModalButton.classList.add("open-second-modal");
        openSecondModalButton.addEventListener("click", secondModal.openModal.bind(secondModal));
        mainModal.find(".modal-footer div").prepend(openSecondModalButton);
      });
    });
  });

  it("should not be opened", function () {
    cy.get("#main-modal.open").should("not.exist");
    cy.get(`#second-modal.open`).should("not.exist");
  });

  it("should open only main modal", function () {
    cy.get(".open-main-modal").click();
    cy.get("#main-modal.open").should("exist");
    cy.get(`#second-modal.open`).should("not.exist");
  });

  it("should open both modals ", function () {
    cy.get(".open-main-modal").click();
    cy.get(`.open-second-modal`).click();
    cy.get("#main-modal.open").should("exist");
    cy.get(`#second-modal.open`).should("exist");
  });
});
