# Components Folder

The `components` folder is a critical part of our project structure, and it primarily contains the smallest building blocks of our user interface, which are categorized as "atoms" and "molecules" in the Atomic Design hierarchy. These components are designed to be highly reusable and provide the foundational elements for constructing more complex UI components. 

> These are also components that will be re-used in different pages and features.

## Structure
The component folders follow the following structure
```
src/
└── components/
    │   ├── componentName
    │   |   ├── Component.tsx -> Component Code
```

## What can we find in this folder
The components will be items that will be used globally over the application within the features, other molecules, or maybe even in pages

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