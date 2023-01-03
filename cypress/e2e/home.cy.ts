describe('首页', () => {
  beforeEach('登录页', () => {
    cy.viewport(1920, 1080);
    cy.visit('/home');
  });

  it('元素检查', () => {
    cy.get('main div').should('contain', 'home');
  });
});

export {};
