# Utils Folder

In our React TypeScript application, the `utils` folder serves as a dedicated repository for utility functions. These utility functions are designed to perform specific tasks or provide common functionality across our application. This folder follows a straightforward structure, and the utility functions within it are expected to be pure functions, meaning they produce the same output for the same input and have no side effects. Thus, being peer functions.

## Utility Functions

Utility functions stored in the `utils` folder can include, but are not limited to:

- **Formatters**: Functions for formatting data, such as date formatting, currency formatting, or string manipulation.

- **Helpers**: Functions that provide commonly used functionality, such as data validation, sorting, or filtering.

- **Pure Functions**: Emphasis is placed on keeping utility functions pure, meaning they don't have side effects and produce deterministic results based solely on their inputs.

## Example Utility Function

Let's take a look at an example utility function:

```typescript
// utils/dateFormatter.ts

/**
 * Formats a given date in a user-friendly format.
 * @param {Date} date - The date to format.
 * @returns {string} - The formatted date as a string.
 */
export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
```

In this example, the formatDate utility function takes a Date object and returns a formatted date string. It exemplifies the type of pure utility functions that belong in the utils folder.

## Guidelines
`Keep It Simple:` Utility functions in this folder should be straightforward and focused on a single task.

`Pure Functions:` Whenever possible, strive to create pure functions that produce deterministic results.

`Documentation:` Ensure that utility functions are well-documented with comments describing their purpose, parameters, and return values.

`Tests:` Ensure that utility functions are well-tested as it can be re-used quite a lot

