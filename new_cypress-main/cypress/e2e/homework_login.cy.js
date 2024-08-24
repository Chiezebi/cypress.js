import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"


describe('Проверка авторизации', function () {
    beforeEach('Начало теста', function () {
        cy.visit('/');
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
          });
afterEach('Конец теста', function () {
            cy.get(result_page.close).should('be.visible');
          });

    it('1.Позитивный кейс авторизации', function () {
         cy.get(main_page.email).type(data.login);
         cy.get(main_page.password).type(data.password);
         cy.get(main_page.login_button).click();
         cy.get(result_page.title).should('be.visible');
         cy.get(result_page.title).contains('Авторизация прошла успешно');
     })
    it('2.Проверка логики восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click();
        cy.get(recovery_password_page.email).type(data.login);
        cy.get(recovery_password_page.send_button).click();
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');
    })
     it('3.Негативный кейс авторизации - неправильный пароль', function () {
         cy.get(main_page.email).type(data.login);
         cy.get(main_page.password).type('123fd452');
         cy.get(main_page.login_button).click();
         cy.get(result_page.title).should('be.visible');
         cy.get(result_page.title).contains('Такого логина или пароля нет');
     })
    it('4.Негативный кейс авторизации - неправильный логин', function () {
            cy.get(main_page.email).type('babazina@yandex.ru');
            cy.get(main_page.password).type(data.password);
            cy.get(main_page.login_button).click();
            cy.get(result_page.title).should('be.visible');
            cy.get(result_page.title).contains('Такого логина или пароля нет');
     })
     it('5.Негативный кейс валидации', function () {
        cy.get(main_page.email).type('germandolnikov.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible');
        cy.get(result_page.title).contains('Нужно исправить проблему валидации');
     })
     it('6.Приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible');
        cy.get(result_page.title).contains('Авторизация прошла успешно');
    })
 })