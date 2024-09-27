describe("Checklist", () => {
  beforeEach(() => {
    // visit the site
    cy.visit("http://localhost:3000");
  });
  it("renders the component properly", () => {
    // check header elemnt exists and has correct text
    cy.get('[data-testid="headerText"]').should("exist");
    cy.get('[data-testid="headerText"]').should("have.text", "My checklist");

    // items container exists
    cy.get('[data-testid="checklistItemsContainer"]').should("exist");

    // not items exists initially
    cy.get('[data-testid^="checklistItem-container-"]').should(
      "have.length",
      0
    );

    // add button and status text exists and has correct text
    cy.get('[data-testid="btnAddItem"]').should("exist");
    cy.get('[data-testid="btnAddItem"]').should("contain.text", "Add Item");

    cy.get('[data-testid="status-text"]').should("exist");
    cy.get('[data-testid="status-text"]').should(
      "have.text",
      "Completed 0 of 0"
    );
  });
  it("renders the component properly when add button is clicked", () => {
    // click the add button
    cy.get('[data-testid="btnAddItem"]')
      .click()
      .then(() => {
        // an item is added to the list
        cy.get('[data-testid^="checklistItem-container-"]').should(
          "have.length",
          1
        );
        cy.get('[data-testid="checklistItem-text-0"]').should("exist");

        // check the count on status has changed
        cy.get('[data-testid="status-text"]').should(
          "have.text",
          "Completed 0 of 1"
        );
      });
  });
  it("renders the component properly when task is toggled", () => {
    // click the add button
    cy.get('[data-testid="btnAddItem"]')
      .click()
      .then(() => {
        cy.get('[data-testid="checkbox-0"]').click();

        // check the count on status has changed
        cy.get('[data-testid="status-text"]').should(
          "have.text",
          "Completed 1 of 1"
        );
      });
  });
  it("renders the component properly when task is moved up", () => {
    // click the add button 3 times
    cy.get('[data-testid="btnAddItem"]').click();
    cy.get('[data-testid="checklistItem-text-0"]').type("first task");

    cy.get('[data-testid="btnAddItem"]').click();
    cy.get('[data-testid="checklistItem-text-0"]').type("second task");

    cy.get('[data-testid="btnAddItem"]')
      .click()
      .then(() => {
        cy.get('[data-testid="checklistItem-text-0"]').type("third task");

        // confirm the order of items initially
        cy.get('[data-testid="checklistItem-text-0"]')
          .find("input")
          .invoke("val")
          .should("equal", "third task");
        cy.get('[data-testid="checklistItem-text-1"]')
          .find("input")
          .invoke("val")
          .should("equal", "second task");

        cy.get('[data-testid="btnMoveUp-1"]').click();

        // confirm the order of items after move up
        cy.get('[data-testid="checklistItem-text-0"]')
          .find("input")
          .invoke("val")
          .should("equal", "second task");
        cy.get('[data-testid="checklistItem-text-1"]')
          .find("input")
          .invoke("val")
          .should("equal", "third task");

        // check the count on status has changed
        cy.get('[data-testid="status-text"]').should(
          "have.text",
          "Completed 0 of 3"
        );
      });
  });
  it("renders the component properly when task is moved down", () => {
    // click the add button 3 times
    cy.get('[data-testid="btnAddItem"]').click();
    cy.get('[data-testid="checklistItem-text-0"]').type("first task");

    cy.get('[data-testid="btnAddItem"]').click();
    cy.get('[data-testid="checklistItem-text-0"]').type("second task");

    cy.get('[data-testid="btnAddItem"]')
      .click()
      .then(() => {
        cy.get('[data-testid="checklistItem-text-0"]').type("third task");

        // confirm the order of items initially
        cy.get('[data-testid="checklistItem-text-1"]')
          .find("input")
          .invoke("val")
          .should("equal", "second task");
        cy.get('[data-testid="checklistItem-text-2"]')
          .find("input")
          .invoke("val")
          .should("equal", "first task");

        cy.get('[data-testid="btnMoveDown-1"]').click();

        // confirm the order of items after move up
        cy.get('[data-testid="checklistItem-text-1"]')
          .find("input")
          .invoke("val")
          .should("equal", "first task");
        cy.get('[data-testid="checklistItem-text-2"]')
          .find("input")
          .invoke("val")
          .should("equal", "second task");

        // check the count on status has changed
        cy.get('[data-testid="status-text"]').should(
          "have.text",
          "Completed 0 of 3"
        );
      });
  });
});
