import { generateNumArray, generateYearsArray } from '../generators';

describe('Generator Functions', () => {
    it('generateYearsArray should generate an array of years from current year to current year + numYears', () => {
        // Use Cypress to test the generateYearsArray function
        cy.window().then((win) => {
            const numYears = 20;
            const yearsArray = generateYearsArray(numYears);
            const currentYear = new Date().getFullYear();
            const endYear = currentYear + numYears;

            expect(yearsArray).to.have.length(numYears + 1);

            for (let i = 0; i < yearsArray.length; i++) {
                expect(yearsArray[i]).to.equal(currentYear + i);
            }
        });
    });

    it('generateYearsArray should generate an array of years from current year to current year + numYears', () => {
        // Use Cypress to test the generateYearsArray function with different input
        cy.window().then((win) => {
            const numYears = 5;
            const yearsArray = generateYearsArray(numYears);
            const currentYear = new Date().getFullYear();
            const endYear = currentYear + numYears;

            expect(yearsArray).to.have.length(numYears + 1);

            for (let i = 0; i < yearsArray.length; i++) {
                expect(yearsArray[i]).to.equal(currentYear + i);
            }
        });
    });

    it('generateNumArray should generate an array of consecutive numbers from 1 to numItems', () => {
        // Use Cypress to test the generateNumArray function
        cy.window().then((win) => {
            const numItems = 10;
            const numArray = generateNumArray(numItems);

            expect(numArray).to.have.length(numItems);

            for (let i = 0; i < numArray.length; i++) {
                expect(numArray[i]).to.equal(i + 1);
            }
        });
    });

    it('generateNumArray should generate an array of consecutive numbers from 1 to numItems', () => {
        // Use Cypress to test the generateNumArray function with different input
        cy.window().then((win) => {
            const numItems = 3;
            const numArray = generateNumArray(numItems);

            expect(numArray).to.have.length(numItems);

            for (let i = 0; i < numArray.length; i++) {
                expect(numArray[i]).to.equal(i + 1);
            }
        });
    });
});
