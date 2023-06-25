describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://www.mr-fothergills.co.uk')
    cy.get('[data-action="acceptAll"]').click()
    cy.get('.klaviyo-close-form').click()
    cy.get('#site-header > div:nth-child(2) > div.header-main-wrapper > nav > div > div.header-search-wrapper > div > div > div > div > form > div > div > span > input.itemssearcher-input.typeahead.data-hj-allow.tt-input').type('12345')
    cy.get('.itemssearcher-item-results').click()
    cy.get('.product-details-full-add-to-basket').click()
    cy.get('.header-mini-cart-button-checkout').click()
  })
})