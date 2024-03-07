
# *APP-NAME*

Give a short description on what this application is about

### Who do I talk to?
* add developers company emails here

# Getting Started Locally

### 1. Frontend app location
The frontend application directory can be found here:
`apps>*add-app-folder-name-or-its-location*`

### 2. Configure Environment:
```
cd `apps>*add-app-folder-name-or-its-location*`
```

Create a `.env` file within the *root* of the [frontend directory](#1-frontend-app-location) of application and add the following content:
```
REACT_APP_BASE_API_URL=<INSERT-VALUE-HERE>
REACT_APP_APP_NAME=<INSERT-VALUE-HERE>
REACT_APP_ENV=<INSERT-VALUE-HERE>
REACT_APP_AUTH0_DOMAIN=<INSERT-VALUE-HERE>
REACT_APP_AUTH0_CLIENTID=<INSERT-VALUE-HERE>
REACT_APP_AUTH0_AUDIENCE=<INSERT-VALUE-HERE>
<ADD ANY OTHER VARS NEEDED FOR PROJECT HERE>
```
>Please feel free to contact repo developers to for any of the values.

* `REACT_APP_BASE_API_URL`: 
The base url of the api the app is connecting with (Application API)
	* If running the API locally, use the localhost URL.
	* If connecting to the deployed development API, use the corresponding URL.
	
* `REACT_APP_APP_NAME`: 
The name of the application if needed for development purpouses (unique localstorage entries)

* `REACT_APP_ENV`: 
The environment you are running from. This will configure things like logs, sentry etc.
The values can be one of the following:
	* local
	* development
	* staging
	* production

* `REACT_APP_AUTH0_DOMAIN`:
Holds the domain of your Auth0 tenant, used to identify your Auth0 account.

* `REACT_APP_AUTH0_CLIENTID`:
Holds the Client ID for your Auth0 application, used for authentication requests.

* `REACT_APP_AUTH0_AUDIENCE`:
Represents the intended audience for the Access Token (JWT), typically referring to the API or resource server being accessed.

### 3. Install dependencies:
Install all dependencies to make application work. 

> Within the app [frontend directory](#1-frontend-app-location) run: 
```
yarn install
```

### 4. Make sure the app builds:
It is always best practice to build your app constantly to make sure that it does not fail.

> Within the app [frontend directory](#1-frontend-app-location) run: 
```
yarn build
```

### 5. Make sure the app tests pass:
It is always best practice to test your app constantly to make sure that it does not fail. This should always be run before pushing code to the repository.

> Within the app [frontend directory](#1-frontend-app-location) run: 
```
yarn test
```

### 6. Starting local app:
Start local app. React typically starts on port 3000. If you prefer a different port, please make sure to update the `.env` file to reflect the port as well.

> Within the app [frontend directory](#1-frontend-app-location) run: 
```
yarn start
```

# Folder Structure
This project uses a advanced approach for large projects and scalability. It is built on top of a feature driven approach.
> Each folder's README can be investigated for more info:
```
src/
└── backend-models/
└── components/
└── config/
└── constants/
└── contexts/
└── features/
└── guards/
└── hooks/
└── layouts/
└── lib/
└── models/
└── pages/
└── router/
└── services/
└── store/
└── theme/
└── utils/
``` 

# Project Stack

- [React](https://reactjs.org/) for the framework
- [Typescript](https://www.typescriptlang.org/) for the language and strong typing
- [React Router](https://v5.reactrouter.com/web/guides/quick-start) for routing
- [Material UI](https://mui.com/) for styling
- [Redux](https://redux.js.org/) for state management
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) as a API service and caching
- [Formik](https://formik.org/) for form management
- [Yup](https://github.com/jquense/yup) for validation
- [ZOD](https://zod.dev/) for typing and validation
- [Auth0](https://firebase.google.com/) for auth
- [Toast](https://ireade.github.io/Toast.js/) for messages and popups
- [Axios](https://axios-http.com/docs/intro) for a supplementary http client
- [Storybook](https://storybook.js.org/) for building UI components and pages in isolation
- [CASL](https://casl.js.org/v6/en/) for RBAC management
 
# Atomic Design Principle
[Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)

Atomic Design is a methodology that breaks down UI components into five categories based on their complexity and reusability:

1.  **Atoms**: The smallest and most basic building blocks of the user interface. These components represent individual HTML elements and have minimal or no dependencies on other components.

2.  **Molecules**: Combinations of atoms that form small, functional units of UI. Molecules are slightly more complex than atoms and often represent distinct UI elements or features.

3.  **Organisms**: Larger, more complex components composed of molecules and atoms. Organisms represent reusable sections or sections of a page, such as a header, footer, or sidebar.

4.  **Templates**: Complete page layouts composed of organisms, molecules, and atoms. Templates define the overall structure and layout of a page but do not contain any specific content.

5.  **Pages**: Actual pages of the application, which are specific instances of templates. Pages contain the content and data relevant to a particular route or view.


  
