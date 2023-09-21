# Components Folder

In our React TypeScript project, we follow a feature-driven structure and adhere to the Atomic Design principle for organizing our components. The `components` folder is a critical part of our project structure, and it primarily contains the smallest building blocks of our user interface, which are categorized as "atoms" and "molecules" in the Atomic Design hierarchy. These components are designed to be highly reusable and provide the foundational elements for constructing more complex UI components.

## What can we find in this folder
The components will be items that will be used globally over the application within the features, other molecules, or maybe even in pages

## Atomic Design Principle
[Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)

Atomic Design is a methodology that breaks down UI components into five categories based on their complexity and reusability:

1. **Atoms**: The smallest and most basic building blocks of the user interface. These components represent individual HTML elements and have minimal or no dependencies on other components.

2. **Molecules**: Combinations of atoms that form small, functional units of UI. Molecules are slightly more complex than atoms and often represent distinct UI elements or features.

3. **Organisms**: Larger, more complex components composed of molecules and atoms. Organisms represent reusable sections or sections of a page, such as a header, footer, or sidebar.

4. **Templates**: Complete page layouts composed of organisms, molecules, and atoms. Templates define the overall structure and layout of a page but do not contain any specific content.

5. **Pages**: Actual pages of the application, which are specific instances of templates. Pages contain the content and data relevant to a particular route or view.

## Components in the `components` Folder

Our `components` folder contains two main ideas: `atoms` and `molecules`. Let's take a closer look at what each of these contains:

### `atoms`

The `atoms` folder contains the smallest and most basic building blocks of our UI. These components are highly reusable and typically represent individual HTML elements or simple UI elements. Here are some examples of what you can find in the `atoms` folder:

- **Button**: A generic button component that can be used throughout the application.
- **Input**: An input field for text, numbers, or other forms of user input.
- **Icon**: Icons that are commonly used in the application, such as icons for navigation or actions.
- **Text**: Simple text elements for displaying static content.
- **Link**: Hyperlinks that can be used for navigation.

### `molecules`

The `molecules` folder contains more complex UI components that are composed of one or more `atoms`. These components are designed to be functional units of the user interface. Here are some examples of what you can find in the `molecules` folder:

- **SearchBar**: A search bar that combines an input field with a search button.
- **ProductCard**: A card component that displays information about a product, often including an image, title, and description.

These `atoms` and `molecules` components serve as the building blocks for constructing larger and more complex UI elements in our application. By organizing our UI components in this way, we promote reusability, maintainability, and consistency in our codebase.

Remember that while `atoms` and `molecules` are the focus of this documentation, our project may also include `organisms`, `templates`, and `pages` folders to further organize and structure our UI components as needed.
