# Changelog

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

See bottom of document for convention.

## 1.0.4 - 2024-03-26

### Added

- Zustand added (christiaan@octoco.ltd)
- Zustand stores added for theme, user, drawers, dialogs (christiaan@octoco.ltd)

### Changed

- Move redux slices to zustand stores (christiaan@octoco.ltd)
- Update theme provider because of MUI styles deprecation (christiaan@octoco.ltd)

### Removed

- Remove user redux slice (christiaan@octoco.ltd)
- Removed unneeded redux thunks because of zustand addition (christiaan@octoco.ltd)

### Fixed

- MUI Styles deprecated (christiaan@octoco.ltd)
- Minor fixes (christiaan@octoco.ltd)

## 1.0.3 - 2024-02-05

### Added

- Improved CASL RBAC control over app (christiaan@octoco.ltd)
- Invalid Environment Vars component to show if the env is not right (christiaan@octoco.ltd)
- Make some env vars to be exactly certain values (christiaan@octoco.ltd)
- Added custom logger MVP (christiaan@octoco.ltd, daniel@octoco.ltd)
- Add place to set models and types (christiaan@octoco.ltd)

### Changed

- Moved all providers to an AppProvider to allow for easier management (christiaan@octoco.ltd)
- Updated and checked node version 20.11.0 (christiaan@octoco.ltd)
- Removed Pokemon API and add more relevant mock API (christiaan@octoco.ltd)
- Upgraded all packages to latest and do relevant fixes (christiaan@octoco.ltd)

### Deprecated

- N/A

### Removed

- Commented Dashboard component from home page as it is still WIP

### Fixed

- Minor text fixes (christiaan@octoco.ltd)
- Sidebar Typography Text not adapting to light and dark mode (christiaan@octoco.ltd)

## 1.0.2 - 2023-10-05

### Added

- A hook that works like useState to set state with a debounce time in milliseconds. (daniel@octoco.ltd)

### Changed

- Updated Storybook (daniel@octoco.ltd)

### Deprecated

- N/A

### Removed

- N/A

### Fixed

- Fixed Storybook (daniel@octoco.ltd)

## 1.0.1 - 2023-09-27

### Added

- Add Cypress testing to repo with minor tests (christiaan@octoco.ltd)
- add og descriptions in index.html for better link paste displays and description (christiaan@octoco.ltd)
- Add ts-react-app github workflows that build and tests app every time a change is made (christiaan@octoco.ltd)
- Added some README documentation to folder structures and features (christiaan@octoco.ltd)

### Changed

- textProps in CopyText component to be optional prop (christiaan@octoco.ltd)

### Deprecated

- N/A

### Removed

- Feature Authentication: Removed class based services (christiaan@octoco.ltd)
- Removed (Replaced) Jest tests (christiaan@octoco.ltd)

### Fixed

- Fixed eslint file

## 1.0.0 - 2023-09-27

### Added

- Added ts-react-app to repo with init commits (christiaan@octoco.ltd)
- Feature Authentication: add Firebase Provider (christiaan@octoco.ltd)
- Feature Authentication: add Cognito Provider (christiaan@octoco.ltd)

### Changed

- N/A

### Deprecated

- N/A

### Removed

- Feature Authentication: Removed class based services (christiaan@octoco.ltd)

### Fixed

- N/A

# Changelog Convention

Unreleased changes are omitted for this repo

## 1.0.0 - 2023-09-27

### Added

- Feature 1: Describe the new feature or enhancement briefly.
- Feature 2: Another new feature or enhancement.

### Changed

- Change 1: Describe a change or improvement made to an existing feature.
- Change 2: Another change or improvement.

### Deprecated

- Deprecated 1: List any features or functions that are being deprecated in this release.

### Removed

- Describe code that has been removed and why

### Fixed

- Bug fix 1: Describe a bug that has been fixed.
- Bug fix 2: Another bug fix.
