
describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    .should("have.class", "day-list__item--selected");
    /*
    cy.contains("li", "Tuesday")
      .click()
      .should("have.css", "background-color", "rgb(242, 242, 242)");
    //cy.get("li").contains("Tuesday").click();
    //to find the list item that has a descendent with the text content "Tuesday". The action we take on the element is a click. 
    //cy.get("li").contains("Tuesday").should("have.css", "background-color", "rgb(242, 242, 242)");
    */
  });
});