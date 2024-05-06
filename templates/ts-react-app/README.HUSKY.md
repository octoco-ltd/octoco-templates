# Husky Pre-Commit Hooks

This repository uses Husky to set up pre-commit hooks for lint-staged and Prettier.

## Installation

* NOTE - Before we get started. It is recommended to format your entire project with Prettier before setting up Husky. This will ensure that all files are formatted correctly before you start using Husky to enforce code formatting standards.

    To do so, you can install and run the following command:

    ```shell
    yarn add --dev prettier
    ```

    Then add the following to your `package.json` file:

    ```json
    "scripts": {
        "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,json}\""
    }
    ```

    Feel free to modify the `src/**/*.{js,jsx,ts,tsx,json}` pattern to match the files you want to format.
    Then run the following command:

    ```shell
    yarn format
    ```   

To get started, follow these steps:


1. Install Husky and lint-staged as dev dependencies:

    ```shell
    yarn add --dev husky lint-staged
    ```

    This will add for example the following to your package,json file: 
    
    ```json
    "devDependencies": {
        "husky": "^7.0.2",
        "lint-staged": "^11.0.0",
        "prettier": "^2.3.2"
    }
    ```

2. Next run the following command to set up Husky:

    ```shell
    yarn husky init
    ```

    This will add the following scripts to your package.json file as well as add a .husky folder to the root your project:
    
    ```json
    "scripts": {
        ...
        "prepare": "husky"
    }
    
    ```

    And a .husky/pre-commit file will also be created in your root directory

3. Add the following to the .husky/pre-commit file:

    ```shell
    #!/usr/bin/env sh
    . "$(dirname -- "$0")/_/husky.sh"

    # Lint and format staged files
    echo "Running lint-staged..."
    yarn lint-staged

    # Run tests
    echo "Running tests..."
    yarn test
    ```

    This will run lint-staged whenever you commit changes to your repository.

4. Next Add and Configure lint-staged in your `package.json` file (just below `"scripts"`):

    ```json
    {
    "lint-staged": {
        "*.{js,jsx,ts,tsx}": [
            "prettier --write",
            "eslint --max-warnings=0"
            ]
        },
    }
    ```

    This will run Prettier and ESLint on the staged files whenever you run `yarn lint-staged` which husky pre-commit hook will run whenever you commit changes to your repository.

5. Create a `.prettierrc.json` file in the root of your project and paste the following configuration:

    ```json
    {
        "trailingComma": "es5",
        "tabWidth": 2,
        "semi": true,
        "singleQuote": true,
        "printWidth": 100,
        "bracketSpacing": true,
        "arrowParens": "always",
        "parser": "typescript"
    }
    ```

    This will configure Prettier to use the specified settings when formatting your code. Feel free to modify these settings to suit your preferences.

6. Add the `prettier` plugin to your `eslintConfig` in your `package.json` file. Eg:

    ```json
    "eslintConfig": {
        "extends": [
            "react-app"
        ],
        "overrides": [
            {
                "files": [
                    "**/*.stories.*"
                ],
                "rules": {
                    "import/no-anonymous-default-export": "off"
                }
            }
        ],
        "plugins": [
            "prettier"
        ]
    }
    ```

    This will configure ESLint to use the specified settings when linting your code.

7. To update the eslint rules you can do so in the `.eslintrc.json` file in the root of your project. 



## Usage

Now, whenever you commit changes to your repository, Husky will automatically run lint-staged, which in turn will run Prettier on the staged files and also check of any eslint errors or warnings. This ensures that your code is formatted consistently and without errors and warnings before it is committed.

## Prettier Format on Save

To enable Prettier to format your code whenever you save a file, you can install the Prettier extension in your code editor (VS Code). And then turn on the `Format On Save` option in your editor settings Also make sure prettier is configured as the `Default Formatter`. This will automatically format your code whenever you save a file.

## Testing
To easily test the pre-commit linting and formatting, you can run the following command in your terminal when you have staged changes in your repository just before commiting them:
    
    ```shell    
    yarn lint-staged
    ```

## Conclusion

By setting up Husky with lint-staged and Prettier, you can enforce code formatting standards in your repository and catch formatting issues before they are committed.