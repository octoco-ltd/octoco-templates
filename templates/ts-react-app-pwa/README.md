# Octoco Front-End Standard for PWAs #
ReactJS Template with TypeScript and a manifest + service worker to ensure PWA creation and offline working with auto sync to firestore realtime database.

## Get Started
1. run `yarn install`
2. Ensure your IDE is configured for ESLint using the `eslintrc.json` file
3. Add your firebase credentials inside src/index.tsx
4. run `yarn start`

## Folder Structure
TODO: 
   
### What is this repository for? ###

### Current Features

## Atomic Design Principle
[Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)

Atomic Design is a methodology that breaks down UI components into five categories based on their complexity and reusability:

1. **Atoms**: The smallest and most basic building blocks of the user interface. These components represent individual HTML elements and have minimal or no dependencies on other components.

2. **Molecules**: Combinations of atoms that form small, functional units of UI. Molecules are slightly more complex than atoms and often represent distinct UI elements or features.

3. **Organisms**: Larger, more complex components composed of molecules and atoms. Organisms represent reusable sections or sections of a page, such as a header, footer, or sidebar.

4. **Templates**: Complete page layouts composed of organisms, molecules, and atoms. Templates define the overall structure and layout of a page but do not contain any specific content.

5. **Pages**: Actual pages of the application, which are specific instances of templates. Pages contain the content and data relevant to a particular route or view.

### What is the stack? ###
* [React](https://reactjs.org/) for the framework
* [Typescript](https://www.typescriptlang.org/) for the language and strong typing
* [Firebase](https://firebase.google.com/) for auth, nosql storage and analytics
* [Material UI](https://mui.com/) for styling
* [React Router](https://v5.reactrouter.com/web/guides/quick-start) for routing

### Extras / Variations

### Contribution guidelines ###
* Anyone can contribute 🥳 more feedback is always better

### Who do I talk to? ###
* emile@octoco.ltd
* christiaan@octoco.ltd
* james@octoco.ltd

### Future Iterations
* Reduce the dependency on firebase by creating general purpose AuthProvider
* 
