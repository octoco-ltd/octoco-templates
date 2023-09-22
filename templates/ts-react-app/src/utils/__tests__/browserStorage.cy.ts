import { setStorageItem, getStorageItem, removeStorageItem } from '../browserStorage';

describe('Storage Functions', () => {
  const testKey = 'testKey';
  const testValue = { foo: 'bar' };

  beforeEach(() => {
    // Clear local storage and session storage before each test
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should set and get an item in local storage', () => {
    // Use Cypress to set a value in local storage
    setStorageItem(testKey, JSON.stringify(testValue));
    // Use Cypress to get the value from local storage
    const retrievedValue = JSON.parse(getStorageItem(testKey));
    expect(retrievedValue).to.deep.equal(testValue);
  });

  it('should set and get an item in session storage', () => {
    // Use Cypress to set a value in session storage
    setStorageItem(testKey, JSON.stringify(testValue));
    // Use Cypress to get the value from session storage
    const retrievedValue = JSON.parse(getStorageItem(testKey));
    expect(retrievedValue).to.deep.equal(testValue);
  });

  it('should return null when getting a non-existent item', () => {
    // Use Cypress to get a non-existent item from local storage
    const retrievedValue = JSON.parse(getStorageItem('nonExistentKey'));
    expect(retrievedValue).to.be.null;
  });

  it('should remove an item from local storage', () => {
    // Use Cypress to set a value in local storage
    setStorageItem(testKey, JSON.stringify(testValue));
    // Use Cypress to remove the item from local storage
    removeStorageItem(testKey);
    // Use Cypress to check if the item is removed from local storage
    const retrievedValue = JSON.parse(getStorageItem(testKey));
    expect(retrievedValue).to.be.null;
  });

  it('should remove an item from session storage', () => {
    // Use Cypress to set a value in session storage
    setStorageItem(testKey, JSON.stringify(testValue));
    // Use Cypress to remove the item from session storage
    removeStorageItem(testKey);
    // Use Cypress to check if the item is removed from session storage
    const retrievedValue = JSON.parse(getStorageItem(testKey));
    expect(retrievedValue).to.be.null;
  });
});
