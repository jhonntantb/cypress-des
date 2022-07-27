/// <reference types="cypress" />

describe('Testing module To Do List', () => {
    let loginData, listOfTasks;
    before("we bring the necessary information stored in fixture", () => {
        cy.fixture("loginData").then( (data) => {
            loginData = data;
        })
        cy.fixture("listOfTasks").then( (tasks) => {
            listOfTasks = tasks
        })
    })

    beforeEach("Enter login credentials and click in module To Do List", () => {
        cy.visit("/");
        cy.get('#registertoggle').dblclick()
        cy.get('#user').type(loginData.username)
        cy.get('#pass').type(loginData.password)
        cy.get('button[type="submit"]').click()
        cy.get('#todolistlink').should('be.visible').click();

    })
    it('Enter five tasks in the module To Do List',() => {
        cy.get('#task').type(listOfTasks.task1)
        cy.get('#sendTask').click()
        cy.get('input[name="task"]').type(listOfTasks.task2)
        cy.get('button#sendTask').click()
        cy.xpath('/html/body/div[1]/div/div[2]/form/div/div/input').type(listOfTasks.task3)
        cy.xpath('/html/body/div[1]/div/div[2]/form/div/div/button').click()
        cy.xpath('//*[@id="task"]').type(listOfTasks.task4)
        cy.xpath('//*[@id="sendTask"]').click()
        cy.xpath('//input[contains(@cy-get,"task")]').type(listOfTasks.task5)
        cy.xpath('//button[contains(@type,"submit")]').click()
    })
    it('Verify that the buttons "All", "Completed", "Active" and "Remove all" exist',() => {
        cy.get('button#all').should('exist')
        cy.xpath('//*[text()="Active" and (@id="active")]').should('exist')
        cy.xpath('//button[@id="completed"]').should('exist')
        cy.contains('Remove all').should('exist')
    })
    it('Delete a completed task',() => {
        const taskComplete = "My complete task"
        cy.get('#task').type(taskComplete)
        cy.get('#sendTask').click()
        cy.contains(taskComplete).should('exist').click()
        cy.xpath(`//*[text()="${taskComplete}" and contains(@style,"text-decoration: line-through")]`).siblings().click()
    })
    it('Delete an active task',() => {
        const taskActive = "My active task"
        cy.get('#task').type(taskActive)
        cy.get('#sendTask').click()
        cy.xpath(`//*[text()="${taskActive}" and contains(@style,"none")]`).siblings().click()
    })
    after("remove all tasks Created", () => {
        cy.get('#removeAll').click()
    })
})