/* eslint-disable no-undef */
/// <reference types="cypress" />

// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

import "cypress-watch-and-reload/support";

/// <reference types="cypress" />
Cypress.Commands.add("mainModal", () => {
  return cy.get("#main-modal");
});

Cypress.Commands.add("cloneMainModal", (newModalId: string) => {
  return cy.mainModal().then((mainModal) => {
    const newModal = mainModal.clone(false, false);
    const card = newModal.find(".modal-card");
    const header = newModal.find(".modal-header");
    const content = newModal.find(".modal-content");
    newModal.attr("id", newModalId);
    card.attr("aria-labelledby", `${newModalId}-label`);
    card.attr("aria-describedby", `${newModalId}-description`);
    header.attr("id", `${newModalId}-label`);
    content.attr("id", `${newModalId}-description`);
    content.html("<p>Cloned modal before main modal</p>");
    return { mainModal, newModal };
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      mainModal(): Chainable<JQuery>;
      cloneMainModal(newModalId: string): Chainable<{
        mainModal: JQuery;
        newModal: JQuery;
      }>;
    }
  }
}
