/// <reference path="../cypress.d.ts" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

//初始化-web信息
Cypress.Commands.add('initWebInfo', () => {
  cy.viewport(1920, 1080);
  cy.fixture('user.json').then((user) => {
    // 手动设置cookies

    const userData = user.fakeUser;

    cy.setCookie('token', userData.token, { domain: userData.domain });
    window.localStorage.setItem('logined_' + userData.userID, 'true');
  });

  //账号信息配置
  // cy.fixture('staros-uat.json')
  //   .then((user) => user.login.realNameUser)
  //   .as('userData');
});

export {};
