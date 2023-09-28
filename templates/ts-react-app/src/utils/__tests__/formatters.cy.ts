import {
    getEllipsisTxt,
    addSeparator,
    currencyFormat,
    capitalize,
} from '../formatters';

describe('Formatter Functions', () => {
    it('getEllipsisTxt should return truncated string with ellipsis', () => {
        // Use Cypress to test the getEllipsisTxt function
        cy.wrap(getEllipsisTxt('This is a long string that needs to be truncated', 10)).should((result) => {
            expect(result).to.equal('This is a ... truncated');
        });
    });

    it('getEllipsisTxt should return empty string if input is empty', () => {
        // Use Cypress to test the getEllipsisTxt function with an empty input
        cy.wrap(getEllipsisTxt('')).should((result) => {
            expect(result).to.equal('');
        });
    });

    it('addSeparator should add comma separators to numbers', () => {
        // Use Cypress to test the addSeparator function
        cy.wrap(addSeparator('1000000')).should((result) => {
            expect(result).to.equal('1,000,000');
        });
    });

    it('currencyFormat should format number as currency', () => {
        // Use Cypress to test the currencyFormat function
        cy.wrap(currencyFormat(123456.789, 'R')).should((result) => {
            expect(result).to.equal('R 123,456.79');
        });
    });

    it('capitalize should capitalize the first letter of a string', () => {
        // Use Cypress to test the capitalize function
        cy.wrap(capitalize('hello')).should((result) => {
            expect(result).to.equal('Hello');
        });
    });

    it('capitalize should capitalize the first letter and make the rest lowercase', () => {
        // Use Cypress to test the capitalize function with all uppercase input
        cy.wrap(capitalize('HELLO')).should((result) => {
            expect(result).to.equal('Hello');
        });
    });
});
