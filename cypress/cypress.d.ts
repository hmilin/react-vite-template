import { mount } from 'cypress/react';

/// <reference types="cypress" />

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;

      // commands

      initWebInfo: () => Chainable<void>;
    }
  }
}
