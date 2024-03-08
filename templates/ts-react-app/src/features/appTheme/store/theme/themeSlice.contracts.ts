/**
 * Enum representing the available theme names.
 */
export enum themeNames {
  dark = 'NebulaFighterTheme',
  light = 'PureLightTheme',
}

export interface IThemeState {
  theme: themeNames | string;
}
