# Custom SVG Icon Folder

## Overview
This folder contains custom SVG icons integrated with Material UI's SvgIcon component for a React application. The icons are organized to allow easy access and modularity across the application.

## Structure
`iconsFolder/`: This directory stores all the SVG icon files and the corresponding TypeScript file for exporting these icons as React components.
* `*.svg`: Each SVG file represents a unique icon used in the application. For example, `clients.svg`, `close.svg`, etc.
* `index.ts`: This file imports all the SVG files as React components and exports them collectively as a single module. The types of the icons are also defined in this file.

## Adding a New Icon
1. Drop your `.svg` file into the `iconsFolder`.
2. Open `index.ts` inside `iconsFolder`.
3. Import your new SVG file as a ReactComponent and export it. For example, if you have `example.svg`, add the following line:

```tsx
import { ReactComponent as Example } from './example.svg';

// then add it to the `SvgIcons` object
const SvgIcons = {
  ...,
  Example,
};
```

## Usage
1. Import the `CustomSvgIcon` component from `@components/SvgIcons`.
2. Use the `CustomSvgIcon` component in your React components by specifying the icon name as a prop. For example:

```tsx
import CustomSvgIcon from '@components/SvgIcons';

const MyComponent: React.FC = () => {
  return (
    <div>
        {/* Use the CustomSvgIcon component with the icon name */}
      <CustomSvgIcon name="example" /> 
    </div>
  );
};
```

## Customization