/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

import { ModalInterface } from "../../../src/types";

describe("ModalController", () => {
  it("should load", function () {
    cy.visit("/cypress").then((window) => {
      expect(window.Modal).to.exist;
    });
  });

  it("should open/close via methods", function () {
    cy.visit("/cypress").then((window) => {
      const superModal = new window.Modal("super-modal") as ModalInterface;

      cy.get("#super-modal.open")
        .should("not.exist")
        .then(() => superModal.openModal());

      cy.get("#super-modal.open")
        .should("exist")
        .then(() => superModal.closeModal());

      cy.get("#super-modal.open").should("not.exist");
    });
  });

  it("should open/close via isOpen setter", function () {
    cy.visit("/cypress").then(async (window) => {
      const superModal = new window.Modal("super-modal") as ModalInterface;

      cy.get("#super-modal.open")
        .should("not.exist")
        .then(() => (superModal.isOpen = true));

      cy.get("#super-modal.open")
        .should("exist")
        .then(() => (superModal.isOpen = false));

      cy.get("#super-modal.open").should("not.exist");
    });
  });
});
