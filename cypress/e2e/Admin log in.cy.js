const selectors = require("../fixtures/selectors.json");
const sets = require("../fixtures/chairs");

describe("Admin login", () => {
  it("correct input", () => {
    cy.visit("/")
    cy.login("qamid@qamid.ru", "qamid")
    cy.get(".page-header > .page-header__subtitle")
    cy.contains('Администраторррская').should('be.visible')
  });
  it("invalid entry", () => {
    cy.visit("/");
    cy.login("qamid@qami.ru", "qamid");
    cy.get("body").contains("Ошибка авторизации!").should("be.visible");
  });


  describe("Movie selection", () => {
    sets.forEach((current) => {
      it("admin title", () => {
        cy.visit("/");
        cy.login("qamid@qamid.ru", "qamid");

        cy.get(selectors.movieTitle)
          .then(($el) => $el.textContent)
          .should("have.text", "Терминатор-заржавел");
      
    

        cy.get(selectors.movieTitle)
          .invoke("text")
          .then((text) => {
            cy.visit("http://qamid.tmweb.ru");
            cy.get(selectors.movieTitle2)
              .then(($el) => $el.textContent)
              .should("have.text", text);

            cy.get(".page-nav__day:nth-of-type(3)").click();
            cy.get("li").contains("10:00").click();

            current.data.forEach((chair) => {
              cy.get(`.buying-scheme__wrapper > :nth-child(${chair.row}) > :nth-child(${chair.chair})`)
                .click()
            
              cy.contains("Забронировать").click();
              cy.get(".ticket__check-title").contains("Вы выбрали билеты:").should("be.visible")
            });
          });
      });
    });
  });

});
describe("Correct display of the main page", () => {
  it("allows you to choose 7 days", () => {
    cy.visit("http://qamid.tmweb.ru");
    cy.get(".page-nav__day").should("have.length", 7);
  });
  it("number of movies per page", () => {
    cy.visit("http://qamid.tmweb.ru");
    cy.get(".movie").should("have.length", 1);
  });
});
