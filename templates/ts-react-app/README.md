# Octoco Front-End Standard

### ReactJS Template with TypeScript

## Get Started

1. run `yarn install`
2. Ensure your IDE is configured for ESLint using the `eslintrc.json` file
3. Choose your Auth Provider (replace to the necessary exports in authentication feature)
   ```
   templates/ts-react-app/src/features/authentication/index.tsx
   ```
4. run `yarn storybook` in root to run storybook on your localhost (default port: 6006)
5. Add .env file and add applicable vars (feel free to remove those not needed)
   You will need to update the env.ts file and most likely remove the clients not used

   ```
   REACT_APP_BASE_API_URL=https://jsonplaceholder.typicode.com
   REACT_APP_APP_BASE_URL=http://localhost:3000
   REACT_APP_APP_NAME=baseRepo
   REACT_APP_DEPLOYMENT_ENV=development
   REACT_APP_REDIRECT_SUCCESS=http://localhost:3000/status/success
   REACT_APP_REDIRECT_FAILURE=http://localhost:3000/status/failure
   REACT_APP_REDIRECT_CANCEL=http://localhost:3000/status/cancel
   REACT_APP_SENTRY_AUTH_TOKEN=19bff3931ee8453987abc4da7dc5cbd57f759a25323d434c804e7ac0dffe92bc
   REACT_APP_SENTRY_DSN=
   SENTRY_ORG=
   SENTRY_PROJECT=
   VERSION=`sentry-cli releases propose-version`
   REACT_APP_APP_COGNITO_USERPOOL_ID=
   REACT_APP_APP_COGNITO_CLIENT_ID=
   REACT_APP_FIREBASE_API_KEY=
   REACT_APP_FIREBASE_AUTH_DOMAIN=
   REACT_APP_FIREBASE_PROJECT_ID=
   REACT_APP_FIREBASE_STORAGE_BUCKET=
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
   REACT_APP_FIREBASE_APP_ID=
   ```

6. run `yarn start`

## Folder Structure

TODO:

- [How To Structure React Projects From Beginner To Advanced](https://blog.webdevsimplified.com/2022-07/react-folder-structure/)

### What is this repository for?

- The purpose of this repository is to document the general stack which Octoco would like to use when scaffolding new web projects.
- The goal is to provide guidelines to be followed in terms of frameworks, libraries and architectural standards
- This should serve as a guideline and is not intended to be completely prescriptive in terms of implementation
- There are times where specific projects may differ from this standard (e.g. auth implementations based on client)

### Current Features

- ESLint and Prettier for code styling and formatting

## Atomic Design Principle

[Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)

Atomic Design is a methodology that breaks down UI components into five categories based on their complexity and reusability:

1. **Atoms**: The smallest and most basic building blocks of the user interface. These components represent individual HTML elements and have minimal or no dependencies on other components.

2. **Molecules**: Combinations of atoms that form small, functional units of UI. Molecules are slightly more complex than atoms and often represent distinct UI elements or features.

3. **Organisms**: Larger, more complex components composed of molecules and atoms. Organisms represent reusable sections or sections of a page, such as a header, footer, or sidebar.

4. **Templates**: Complete page layouts composed of organisms, molecules, and atoms. Templates define the overall structure and layout of a page but do not contain any specific content.

5. **Pages**: Actual pages of the application, which are specific instances of templates. Pages contain the content and data relevant to a particular route or view.

### What is the stack?

- [React](https://reactjs.org/) for the framework
- [Redux](https://redux.js.org/) for state management
- [zustand](https://zustand-demo.pmnd.rs/) for state management
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) as a API service and caching
- [Formik](https://formik.org/) for form management
- [React Hook Form](https://react-hook-form.com/) for form state management
- [Yup](https://github.com/jquense/yup) for validation
- [Typescript](https://www.typescriptlang.org/) for the language and strong typing
- [Firebase](https://firebase.google.com/) for auth, nosql storage and analytics
- [Auth0](https://firebase.google.com/) for auth
- [AWS Cognito](https://firebase.google.com/) for auth
- [Material UI](https://mui.com/) for styling
- [React Router](https://v5.reactrouter.com/web/guides/quick-start) for routing
- [Toast](https://ireade.github.io/Toast.js/) for messages
- [Axios](https://axios-http.com/docs/intro) for the http client, with a custom base api service as implemented and reused by Octoco
- [Storybook](https://storybook.js.org/) for building UI components and pages in isolation. It streamlines UI development, testing, and documentation.
- [CASL](https://casl.js.org/v6/en/) for RBAC management

### Contribution guidelines

- Anyone can contribute 🥳 more feedback is always better

### Who do I talk to?

- heinrich@octoco.ltd
- christiaan@octoco.ltd
- james@octoco.ltd
- todd@octoco.ltd
- alidaf@octoco.ltd

### Future Iterations

- Scaffold a project in this repo as a working example
- Add commonly reused helper functions to that project
- Add detailed justification for tech decisions, explain why
- Start building custom 'Octoco Components' for reuse across projects e.g. standard file upload component
- Consider using Material UI as one package for various functions (styling, forms, wizards, validation, notifications, prebuilt components)

TODO / WIP:
//storybook full implementation
//Debug mode
//protected routes
//index all exports
//rbac -> CASL = fully document
//refresh token //get new token //needed?
//feature flags
//unverified
//login
//register
//table
//api service (RTK) REST
//api service (RTK) GraphQL
//mobile bottom bar
//breadcrumbs
//useConfirmLeave
//add chromatic docs etc etc
//app config

// set \"GENERATE_SOURCEMAP=true\" && && yarn run sentry:sourcemaps
// "sentry:sourcemaps": "sentry-cli sourcemaps inject --org <org> --project <proj> ./build && sentry-cli sourcemaps upload --org <org> --project <proc> ./build",
