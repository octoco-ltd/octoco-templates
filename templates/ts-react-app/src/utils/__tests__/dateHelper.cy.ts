import dayjs from 'dayjs';
import {
    toUnix,
    DateTimeNow,
    isFutureDate,
    isAfter,
    getTimeDifference,
    timeUntilNow,
    addHours,
} from '../dateHelper';

describe('Date Utility Functions', () => {
    const now = dayjs();
    const tomorrow = now.add(1, 'day').toDate();

    it('toUnix converts date to Unix timestamp', () => {
        // Use Cypress to test the toUnix function
        cy.wrap(toUnix(now.toDate())).should((unixTimestamp) => {
            expect(unixTimestamp).to.equal(Math.floor(now.toDate().getTime() / 1000));
        });
    });

    it('DateTimeNow returns current date', () => {
        // Use Cypress to test the DateTimeNow function
        cy.window().then((win) => {
            const currentDate = DateTimeNow();
            expect(currentDate).to.be.instanceOf(Date);
        });
    });

    it('isFutureDate correctly identifies future dates', () => {
        // Use Cypress to test the isFutureDate function
        cy.wrap(isFutureDate(tomorrow)).should('be.true');
        cy.wrap(isFutureDate(now.toDate())).should('be.false');
    });

    it('isAfter compares two dates correctly', () => {
        // Use Cypress to test the isAfter function
        cy.wrap(isAfter(now.toDate(), tomorrow)).should('be.false');
        cy.wrap(isAfter(tomorrow, now.toDate())).should('be.true');
    });

    it('getTimeDifference calculates time difference', () => {
        // Use Cypress to test the getTimeDifference function
        cy.wrap(getTimeDifference(tomorrow, now.toDate())).should('eq', 24 * 60 * 60 * 1000); // 24 hours in milliseconds
    });

    it('addHours adds hours to a date', () => {
        // Use Cypress to test the addHours function
        const hoursToAdd = 5;
        cy.wrap(addHours(now.toDate(), hoursToAdd)).should((newDate) => {
            expect(newDate).to.deep.equal(now.add(hoursToAdd, 'hours').toDate());
        });
    });
});
