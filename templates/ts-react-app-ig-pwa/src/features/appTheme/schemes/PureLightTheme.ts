import {
  alpha,
  createTheme,
  lighten,
  darken,
  InputLabel,
  popoverClasses
} from '@mui/material';
import '@mui/lab/themeAugmentation';
// import '@fontsource/inter';
// import '@fontsource/noto-sans';
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    outlinedHover: true;
  }
}
const themeColors = {
  // from the Design System spec
  forestGreenMain: '#509E2F',
  forestGreenShade: '#284F17',
  forestGreenTint: '#F2FFED',
  riverBedMain: '#4B4F54',
  riverBedShade: '#262729',
  riverBedTint: '#F4F4F4',
  asphalt: '#000000',
  stormDust: '#C6C6C6',
  silverSands: '#EDEDED',
  success: '#58DD5E',
  warning: '#FFBA17',
  error: '#F92C2C',
  info: '#33C2FF',
  black: '#000000',
  white: '#FFFFFF',
  grey1: '#F9F9FB',
  grey2: '#CFCFCF',
  grey3: '#9B9B9B',
  grey4: '#727272',
  grey5: '#343434',

  // from the Desktop designs
  successTint: '#EEFFF7'
};

const colors = {
  gradients: {
    blue1: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
    blue2: 'linear-gradient(135deg, #ABDCFF 0%, #0396FF 100%)',
    blue3: 'linear-gradient(127.55deg, #141E30 3.73%, #243B55 92.26%)',
    blue4: 'linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)',
    blue5: 'linear-gradient(135deg, #97ABFF 10%, #123597 100%)',
    orange1: 'linear-gradient(135deg, #FCCF31 0%, #F55555 100%)',
    orange2: 'linear-gradient(135deg, #FFD3A5 0%, #FD6585 100%)',
    orange3: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
    purple1: 'linear-gradient(135deg, #43CBFF 0%, #9708CC 100%)',
    purple3: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    pink1: 'linear-gradient(135deg, #F6CEEC 0%, #D939CD 100%)',
    pink2: 'linear-gradient(135deg, #F761A1 0%, #8C1BAB 100%)',
    green1: 'linear-gradient(135deg, #FFF720 0%, #3CD500 100%)',
    green2: 'linear-gradient(to bottom, #00b09b, #96c93d)',
    black1: 'linear-gradient(100.66deg, #434343 6.56%, #000000 93.57%)',
    black2: 'linear-gradient(60deg, #29323c 0%, #485563 100%)'
  },
  shadows: {
    success:
      '0px 1px 4px rgba(68, 214, 0, 0.25), 0px 3px 12px 2px rgba(68, 214, 0, 0.35)',
    error:
      '0px 1px 4px rgba(255, 25, 67, 0.25), 0px 3px 12px 2px rgba(255, 25, 67, 0.35)',
    info: '0px 1px 4px rgba(51, 194, 255, 0.25), 0px 3px 12px 2px rgba(51, 194, 255, 0.35)',
    primary:
      '0px 1px 4px rgba(85, 105, 255, 0.25), 0px 3px 12px 2px rgba(85, 105, 255, 0.35)',
    warning:
      '0px 1px 4px rgba(255, 163, 25, 0.25), 0px 3px 12px 2px rgba(255, 163, 25, 0.35)',
    card: '0px 9px 16px rgba(159, 162, 191, .18), 0px 2px 2px rgba(159, 162, 191, 0.32)',
    cardSm:
      '0px 2px 3px rgba(159, 162, 191, .18), 0px 1px 1px rgba(159, 162, 191, 0.32)',
    cardLg:
      '0 5rem 14rem 0 rgb(255 255 255 / 30%), 0 0.8rem 2.3rem rgb(0 0 0 / 60%), 0 0.2rem 0.3rem rgb(0 0 0 / 45%)'
  },
  layout: {
    general: {
      bodyBg: themeColors.riverBedTint
    },
    sidebar: {
      background: themeColors.forestGreenMain,
      textColor: themeColors.white,
      dividerBg: themeColors.grey1,
      menuItemColor: themeColors.forestGreenShade,
      menuItemColorActive: themeColors.forestGreenMain,
      menuItemBg: themeColors.white,
      menuItemBgActive: themeColors.grey2,
      menuItemIconColor: lighten(themeColors.riverBedMain, 0.3),
      menuItemIconColorActive: themeColors.forestGreenMain,
      menuItemHeadingColor: darken(themeColors.riverBedMain, 0.3)
    }
  },
  alpha: {
    white: {
      10: alpha(themeColors.white, 0.1),
      25: alpha(themeColors.white, 0.25),
      50: alpha(themeColors.white, 0.5),
      60: alpha(themeColors.white, 0.6),
      80: alpha(themeColors.white, 0.8),
      100: themeColors.white
    },
    trueWhite: {
      5: alpha(themeColors.white, 0.05),
      10: alpha(themeColors.white, 0.1),
      30: alpha(themeColors.white, 0.3),
      50: alpha(themeColors.white, 0.5),
      70: alpha(themeColors.white, 0.7),
      100: themeColors.white
    },
    black: {
      10: alpha(themeColors.black, 0.1),
      20: alpha(themeColors.black, 0.2),
      25: alpha(themeColors.black, 0.25),
      60: alpha(themeColors.black, 0.6),
      65: alpha(themeColors.black, 0.65),
      80: alpha(themeColors.black, 0.8),
      100: themeColors.black
    },
    grey: {
      1: themeColors.grey1,
      2: themeColors.grey2,
      3: themeColors.grey3,
      4: themeColors.grey4,
      5: themeColors.grey5
    }
  },
  secondary: {
    lighter: themeColors.riverBedTint,
    light: lighten(themeColors.riverBedMain, 0.3),
    main: themeColors.riverBedMain,
    dark: themeColors.riverBedShade
  },
  primary: {
    lighter: themeColors.forestGreenTint,
    light: lighten(themeColors.forestGreenMain, 0.3),
    main: themeColors.forestGreenMain,
    dark: themeColors.forestGreenShade
  },
  success: {
    lighter: themeColors.successTint,
    light: lighten(themeColors.success, 0.3),
    main: themeColors.success,
    dark: darken(themeColors.success, 0.2)
  },
  warning: {
    lighter: lighten(themeColors.warning, 0.85),
    light: lighten(themeColors.warning, 0.3),
    main: themeColors.warning,
    dark: darken(themeColors.warning, 0.2)
  },
  error: {
    lighter: lighten(themeColors.error, 0.85),
    light: lighten(themeColors.error, 0.3),
    main: themeColors.error,
    dark: darken(themeColors.error, 0.3)
  },
  info: {
    lighter: lighten(themeColors.info, 0.85),
    light: lighten(themeColors.info, 0.3),
    main: themeColors.info,
    dark: darken(themeColors.info, 0.2)
  }
};

export const PureLightTheme = createTheme({
  colors: {
    gradients: {
      blue1: colors.gradients.blue1,
      blue2: colors.gradients.blue2,
      blue3: colors.gradients.blue3,
      blue4: colors.gradients.blue4,
      blue5: colors.gradients.blue5,
      orange1: colors.gradients.orange1,
      orange2: colors.gradients.orange2,
      orange3: colors.gradients.orange3,
      purple1: colors.gradients.purple1,
      purple3: colors.gradients.purple3,
      pink1: colors.gradients.pink1,
      pink2: colors.gradients.pink2,
      green1: colors.gradients.green1,
      green2: colors.gradients.green2,
      black1: colors.gradients.black1,
      black2: colors.gradients.black2
    },
    shadows: {
      success: colors.shadows.success,
      error: colors.shadows.error,
      primary: colors.shadows.primary,
      info: colors.shadows.info,
      warning: colors.shadows.warning
    },
    alpha: {
      white: {
        10: colors.alpha.white[10],
        25: colors.alpha.white[25],
        50: colors.alpha.white[50],
        60: colors.alpha.white[60],
        80: colors.alpha.white[80],
        100: colors.alpha.white[100]
      },
      trueWhite: {
        5: colors.alpha.trueWhite[5],
        10: colors.alpha.trueWhite[10],
        30: colors.alpha.trueWhite[30],
        50: colors.alpha.trueWhite[50],
        70: colors.alpha.trueWhite[70],
        100: colors.alpha.trueWhite[100]
      },
      black: {
        10: colors.alpha.black[10],
        20: colors.alpha.black[20],
        25: colors.alpha.black[25],
        60: colors.alpha.black[60],
        65: colors.alpha.black[65],
        80: colors.alpha.black[80],
        100: colors.alpha.black[100]
      },
      grey: {
        1: colors.alpha.grey[1],
        2: colors.alpha.grey[2],
        3: colors.alpha.grey[3],
        4: colors.alpha.grey[4],
        5: colors.alpha.grey[5]
      }
    },
    secondary: {
      lighter: colors.secondary.lighter,
      light: colors.secondary.light,
      main: colors.secondary.main,
      dark: colors.secondary.dark
    },
    primary: {
      lighter: colors.primary.lighter,
      light: colors.primary.light,
      main: colors.primary.main,
      dark: colors.primary.dark
    },
    success: {
      lighter: colors.success.lighter,
      light: colors.success.light,
      main: colors.success.main,
      dark: colors.success.dark
    },
    warning: {
      lighter: colors.warning.lighter,
      light: colors.warning.light,
      main: colors.warning.main,
      dark: colors.warning.dark
    },
    error: {
      lighter: colors.error.lighter,
      light: colors.error.light,
      main: colors.error.main,
      dark: colors.error.dark
    },
    info: {
      lighter: colors.info.lighter,
      light: colors.info.light,
      main: colors.info.main,
      dark: colors.info.dark
    }
  },
  general: {
    reactFrameworkColor: '#00D8FF',
    borderRadiusSm: '6px',
    borderRadius: '10px',
    borderRadiusLg: '12px',
    borderRadiusXl: '16px'
  },
  sidebar: {
    background: colors.layout.sidebar.background,
    textColor: colors.layout.sidebar.textColor,
    dividerBg: colors.layout.sidebar.dividerBg,
    menuItemColor: colors.layout.sidebar.menuItemColor,
    menuItemColorActive: colors.layout.sidebar.menuItemColorActive,
    menuItemBg: colors.layout.sidebar.menuItemBg,
    menuItemBgActive: colors.layout.sidebar.menuItemBgActive,
    menuItemIconColor: colors.layout.sidebar.menuItemIconColor,
    menuItemIconColorActive: colors.layout.sidebar.menuItemIconColorActive,
    menuItemHeadingColor: colors.layout.sidebar.menuItemHeadingColor,
    boxShadow:
      '2px 0 3px rgba(159, 162, 191, .18), 1px 0 1px rgba(159, 162, 191, 0.32)',
    width: '312px'
  },
  header: {
    height: '100px',
    background: colors.alpha.white[100],
    boxShadow: colors.shadows.cardSm,
    textColor: colors.secondary.main
  },
  spacing: 9,
  palette: {
    common: {
      black: colors.alpha.black[100],
      white: colors.alpha.white[100]
    },
    mode: 'light',
    primary: {
      light: colors.primary.light,
      main: colors.primary.main,
      dark: colors.primary.dark
    },
    secondary: {
      light: colors.secondary.light,
      main: colors.secondary.main,
      dark: colors.secondary.dark
    },
    error: {
      light: colors.error.light,
      main: colors.error.main,
      dark: colors.error.dark,
      contrastText: colors.alpha.white[100]
    },
    success: {
      light: colors.success.light,
      main: colors.success.main,
      dark: colors.success.dark,
      contrastText: colors.alpha.white[100]
    },
    info: {
      light: colors.info.light,
      main: colors.info.main,
      dark: colors.info.dark,
      contrastText: colors.alpha.white[100]
    },
    warning: {
      light: colors.warning.light,
      main: colors.warning.main,
      dark: colors.warning.dark,
      contrastText: colors.alpha.white[100]
    },
    text: {
      primary: colors.alpha.black[100],
      secondary: colors.alpha.black[65],
      disabled: colors.alpha.grey[2]
    },
    background: {
      paper: colors.alpha.white[100],
      default: colors.layout.general.bodyBg
    },
    action: {
      active: colors.alpha.black[100],
      hover: colors.primary.lighter,
      hoverOpacity: 0.1,
      selected: colors.alpha.black[10],
      selectedOpacity: 0.1,
      disabled: colors.alpha.grey[2],
      disabledBackground: colors.alpha.black[10],
      disabledOpacity: 0.38,
      focus: colors.alpha.black[10],
      focusOpacity: 0.05,
      activatedOpacity: 0.12
    },
    tonalOffset: 0.5
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1840
    }
  },
  components: {
    MuiBreadcrumbs: {
      styleOverrides: {
        separator: {
          color: colors.alpha.black[100]
        }
      }
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(darken(colors.primary.main, 0.4), 0.2),
          backdropFilter: 'blur(2px)',

          '&.MuiBackdrop-invisible': {
            backgroundColor: 'transparent'
          }
        }
      }
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontFamily: 'Noto Sans',
          fontWeight: 600,
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'Noto Sans',
          fontWeight: 700,
          fontSize: 16,
          letterSpacing: '0.01em',
          lineHeight: '140%',
          paddingBottom: '5.5px',
          color: colors.alpha.black[100]
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          padding: 0
        }
      }
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontFamily: 'Noto Sans',
          fontWeight: 400,
          fontSize: 14,
          letterSpacing: '0.01em',
          lineHeight: '130%',
          margin: '8px 0px '
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 30
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: '16px 16px 7px 16px'
        }
      }
    },

    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: colors.alpha.black[80]
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        'html, body': {
          width: '100%',
          height: '100%'
        },
        body: {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
          flex: 1
        },
        '#root': {
          width: '100%',
          height: '100%',
          display: 'flex',
          flex: 1,
          flexDirection: 'column'
        },
        html: {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased'
        },
        '.child-popover .MuiPaper-root .MuiList-root': {
          flexDirection: 'column'
        },
        '#nprogress': {
          pointerEvents: 'none'
        },
        '#nprogress .bar': {
          background: colors.primary.lighter
        },
        '#nprogress .spinner-icon': {
          borderTopColor: colors.primary.lighter,
          borderLeftColor: colors.primary.lighter
        },
        '#nprogress .peg': {
          boxShadow:
            '0 0 15px ' +
            colors.primary.lighter +
            ', 0 0 8px' +
            colors.primary.light
        },
        ':root': {
          '--swiper-theme-color': colors.primary.main
        },
        code: {
          background: colors.info.lighter,
          color: colors.info.dark,
          borderRadius: 4,
          padding: 4
        },
        '@keyframes ripple': {
          '0%': {
            transform: 'scale(.8)',
            opacity: 1
          },
          '100%': {
            transform: 'scale(2.8)',
            opacity: 0
          }
        },
        '@keyframes float': {
          '0%': {
            transform: 'translate(0%, 0%)'
          },
          '100%': {
            transform: 'translate(3%, 3%)'
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        iconOutlined: {
          color: colors.alpha.black[100]
        }
      }
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontFamily: 'Noto Sans',
          fontWeight: 400,
          fontSize: 16,
          letterSpacing: '0.01em',
          lineHeight: '140%',
          borderRadius: '16px',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.alpha.grey[2]
          },
          '& .MuiInputAdornment-positionEnd.MuiInputAdornment-outlined': {
            paddingRight: 6
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            //borderColor: colors.alpha.grey[2]
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px'
            // borderColor: colors.primary.main
          }
        }
      }
    },
    MuiListSubheader: {
      styleOverrides: {
        colorPrimary: {
          fontWeight: 'bold',
          lineHeight: '40px',
          fontSize: 13,
          background: colors.alpha.black[10],
          color: colors.alpha.black[65]
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 30
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        action: {
          marginTop: -5,
          marginBottom: -5
        },
        title: {
          // fontSize: 15
        }
      }
    },

    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 0
        }
      }
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          borderRadius: '50px'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        colorPrimary: {
          background: colors.alpha.white[10]
        },
        colorSecondary: {
          background: colors.alpha.black[10],
          color: colors.alpha.black[100],

          '&:hover': {
            background: colors.alpha.black[10]
          }
        },
        deleteIcon: {
          color: colors.error.light,

          '&:hover': {
            color: colors.error.main
          }
        },
        label: {
          fontFamily: 'Noto Sans',
          fontWeight: 400,
          fontSize: 14,
          letterSpacing: '0.01em',
          lineHeight: '130%',
          color: colors.alpha.white[100]
        }
      }
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'none',

          '&.Mui-expanded': {
            margin: 0
          },
          '&::before': {
            display: 'none'
          }
        }
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 'bold'
        },
        colorDefault: {
          background: colors.alpha.black[25],
          color: colors.alpha.white[100]
        }
      }
    },
    MuiAvatarGroup: {
      styleOverrides: {
        root: {
          alignItems: 'center'
        },
        avatar: {
          background: colors.alpha.black[10],
          fontSize: 13,
          color: colors.alpha.black[65],
          fontWeight: 'bold',

          '&:first-of-type': {
            border: 0,
            background: 'transparent'
          }
        }
      }
    },
    MuiListItemAvatar: {
      styleOverrides: {
        alignItemsFlexStart: {
          marginTop: 0
        }
      }
    },
    MuiPaginationItem: {
      styleOverrides: {
        page: {
          fontSize: 13,
          fontWeight: 'bold',
          transition: 'all .2s'
        },
        textPrimary: {
          '&.Mui-selected': {
            boxShadow: colors.shadows.primary
          },
          '&.MuiButtonBase-root:hover': {
            background: colors.alpha.black[10]
          },
          '&.Mui-selected.MuiButtonBase-root:hover': {
            background: colors.primary.main
          }
        }
      }
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'outlinedHover' },
          style: {
            border: '2px solid transparent',
            '&:hover': {
              backgroundColor: 'transparent',
              border: '2px solid',
              borderColor: colors.alpha.black[100],
              display: 'flex'
            }
          }
        }
      ],

      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: {
          fontWeight: '700',
          letterSpacing: '0.01em',
          textTransform: 'none',
          paddingLeft: 16,
          paddingRight: 16,
          borderRadius: 64,
          '.MuiSvgIcon-root': {
            transition: 'all .2s'
          }
        },
        endIcon: {
          //marginRight: -8
        },

        containedSecondary: {
          backgroundColor: colors.secondary.main,
          color: colors.alpha.white[100],
          border: '1px solid ' + colors.alpha.black[25]
        },
        outlinedSecondary: {
          backgroundColor: colors.alpha.white[100],
          border: '1.5px solid ' + colors.alpha.black[100],
          '&:hover, &.MuiSelected': {
            backgroundColor: colors.alpha.black[10],
            color: colors.alpha.black[100],
            border: '1.5px solid ' + colors.alpha.black[100]
          }
        },
        sizeSmall: {
          padding: '10px 16px',
          fontSize: 12,
          lineHeight: '16px'
        },
        sizeMedium: {
          padding: '16px 24px',
          fontSize: 16
        },
        sizeLarge: {
          padding: '11px 24px'
        }
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false
      },
      styleOverrides: {
        root: {
          borderRadius: 6
        }
      }
    },
    MuiToggleButton: {
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: {
          color: colors.primary.main,
          background: colors.alpha.white[100],
          transition: 'all .2s',

          '&:hover, &.Mui-selected, &.Mui-selected:hover': {
            color: colors.alpha.white[100],
            background: colors.primary.main
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          backgroundColor: 'transparent',
          padding: 8,
          '&:hover': {
            backgroundColor: colors.alpha.grey[1]
          },

          '& .MuiTouchRipple-root': {
            borderRadius: 8
          }
        },
        sizeSmall: {
          padding: 4
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          margin: 0,
          fontWeight: '400',
          fontSize: '16px',
          fontFamily: 'Nato Sans'
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '15px',
          '& .MuiTouchRipple-root': {
            opacity: 0.3
          },
          '& .MuiListItemIcon-root': {
            color: colors.alpha.white[100],
            minWidth: '24px'
          },
          '&:hover': {
            background: colors.primary.dark,
            borderRadius: '15px'
          }
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          background: colors.alpha.black[10],
          border: 0,
          height: 1
        },
        vertical: {
          height: 'auto',
          width: 2,

          '&.MuiDivider-flexItem.MuiDivider-fullWidth': {
            // height: 'auto'

          },
          '&.MuiDivider-absolute.MuiDivider-fullWidth': {
            height: '100%'
          }
        },
        withChildren: {
          '&:before, &:after': {
            // border: 0
          }
        },
        wrapper: {
          background: colors.alpha.white[100],
          fontWeight: 'bold',
          height: 24,
          lineHeight: '24px',
          marginTop: -12,
          color: 'inherit',
          textTransform: 'uppercase'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: 0
          //borderRadius: '12px'
        },
        elevation0: {
          boxShadow: 'none'
        },
        elevation: {
          boxShadow: colors.shadows.card
        },
        elevation2: {
          boxShadow: colors.shadows.cardSm
        },
        elevation24: {
          boxShadow: colors.shadows.cardLg
        },
        outlined: {
          boxShadow: colors.shadows.card
        }
      }
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover'
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          height: 6
        }
      }
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '& .MuiSlider-valueLabelCircle, .MuiSlider-valueLabelLabel': {
            transform: 'none'
          },
          '& .MuiSlider-valueLabel': {
            borderRadius: 6,
            background: colors.alpha.black[100],
            color: colors.alpha.white[100]
          }
        }
      }
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,

          '& .MuiListItem-button': {
            transition: 'all .2s',

            '& > .MuiSvgIcon-root': {
              minWidth: 34
            },

            '& .MuiTouchRipple-root': {
              opacity: 0.2
            }
          },
          '& .MuiListItem-root.MuiButtonBase-root.Mui-selected': {
            backgroundColor: alpha(colors.primary.lighter, 0.4)
          },
          '& .MuiMenuItem-root.MuiButtonBase-root:active': {
            backgroundColor: alpha(colors.primary.lighter, 0.4)
          },
          '& .MuiMenuItem-root.MuiButtonBase-root .MuiTouchRipple-root': {
            opacity: 0.2
          }
        },
        padding: {
          padding: '16px',

          '& .MuiListItem-button': {
            borderRadius: 6,
            margin: '1px 0'
          }
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          height: '60px',
          minHeight: '60px',
          padding: 0,
          overflow: 'visible'
        },
        indicator: {
          height: '60px',
          minHeight: '60px',
          borderRadius: 0,
          border: '1px solid ' + colors.success.lighter,
          boxShadow: 'none',
          background: colors.success.lighter
        },
        scrollableX: {
          overflow: 'visible !important'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          padding: 0,
          height: '60px',
          minHeight: '60px',
          borderRadius: 0,
          transition: 'color .2s',
          textTransform: 'capitalize',
          '&.MuiButtonBase-root': {
            minWidth: 'auto',
            paddingLeft: 25,
            paddingRight: 25,
            color: themeColors.riverBedMain
          },
          '&.Mui-selected, &.Mui-selected:hover': {
            color: themeColors.forestGreenMain,
            zIndex: 5
          },
          '&:hover': {
            color: colors.alpha.black[60]
          }
        }
      }
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          padding: 12
        },
        list: {
          padding: 12,

          '& .MuiMenuItem-root.MuiButtonBase-root': {
            fontSize: 14,
            marginTop: 1,
            marginBottom: 1,
            transition: 'all .2s',
            color: colors.alpha.black[65],

            '& .MuiTouchRipple-root': {
              opacity: 0.2
            },

            '&:hover, &:active, &.active, &.Mui-selected': {
              color: colors.alpha.black[100],
              background: alpha(colors.primary.lighter, 0.4)
            }
          }
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          background: 'transparent',
          transition: 'all .2s',

          '&:hover, &:active, &.active, &.Mui-selected': {
            color: colors.alpha.black[100],
            background: alpha(colors.primary.lighter, 0.4)
          },
          '&.Mui-selected:hover': {
            background: alpha(colors.primary.lighter, 0.4)
          }
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.MuiButtonBase-root': {
            color: colors.secondary.main,

            '&:hover, &:active, &.active, &.Mui-selected': {
              color: colors.alpha.black[100],
              background: lighten(colors.primary.lighter, 0.5)
            }
          }
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        tag: {
          margin: 1
        },
        root: {
          '.MuiAutocomplete-inputRoot.MuiOutlinedInput-root .MuiAutocomplete-endAdornment':
          {
            right: 14
          }
        },
        clearIndicator: {
          background: colors.error.lighter,
          color: colors.error.main,
          marginRight: 8,

          '&:hover': {
            background: colors.error.lighter,
            color: colors.error.dark
          }
        },
        popupIndicator: {
          color: colors.alpha.black[60],

          '&:hover': {
            background: colors.primary.lighter,
            color: colors.primary.main
          }
        }
      }
    },
    MuiTablePagination: {
      styleOverrides: {
        toolbar: {
          '& .MuiIconButton-root': {
            padding: 8
          }
        },
        select: {
          '&:focus': {
            backgroundColor: 'transparent'
          }
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '0 !important',
          padding: '0 !important'
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        head: {
          background: colors.alpha.black[10]
        },
        root: {
          transition: 'background-color .2s',

          '&.MuiTableRow-hover:hover': {
            backgroundColor: colors.alpha.black[10]
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: colors.alpha.black[10],
          fontSize: 14
        },
        head: {
          fontSize: 13,
          fontWeight: 'bold',
          color: colors.alpha.black[65]
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        message: {
          lineHeight: 1.5,
          fontSize: 14
        },
        standardInfo: {
          color: colors.info.main
        },
        action: {
          color: colors.alpha.black[65]
        }
      }
    },
    // @ts-ignore
    MuiTimelineDot: {
      styleOverrides: {
        root: {
          margin: 0,
          zIndex: 5,
          position: 'absolute',
          top: '50%',
          marginTop: -6,
          left: -6
        },
        outlined: {
          backgroundColor: colors.alpha.white[100],
          boxShadow: '0 0 0 6px ' + colors.alpha.white[100]
        },
        outlinedPrimary: {
          backgroundColor: colors.alpha.white[100],
          boxShadow: '0 0 0 6px ' + colors.alpha.white[100]
        }
      }
    },
    MuiTimelineConnector: {
      styleOverrides: {
        root: {
          position: 'absolute',
          height: '100%',
          top: 0,
          borderRadius: 50,
          backgroundColor: colors.alpha.black[10]
        }
      }
    },
    MuiTimelineItem: {
      styleOverrides: {
        root: {
          minHeight: 0,
          padding: '8px 0',

          '&:before': {
            display: 'none'
          }
        },
        missingOppositeContent: {
          '&:before': {
            display: 'none'
          }
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: alpha(colors.alpha.black['100'], 0.95),
          padding: '8px 16px',
          fontFamily: 'Noto Sans',
          fontWeight: 400,
          fontSize: 14,
          letterSpacing: '0.01em',
          lineHeight: '130%'
        },
        arrow: {
          color: alpha(colors.alpha.black['100'], 0.95)
        }
      }
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          height: 33,
          overflow: 'visible',

          '& .MuiButtonBase-root': {
            position: 'absolute',
            padding: 6,
            transition:
              'left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
          },
          '& .MuiIconButton-root': {
            borderRadius: 100
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            opacity: 0.3
          }
        },
        thumb: {
          border: '1px solid ' + colors.alpha.black[25],
          boxShadow:
            '0px 9px 14px ' +
            colors.alpha.black[10] +
            ', 0px 2px 2px ' +
            colors.alpha.black[10]
        },
        track: {
          backgroundColor: colors.alpha.black[10],
          border: '1px solid ' + colors.alpha.black[10],
          boxShadow: 'inset 0px 1px 1px ' + colors.alpha.black[10],
          opacity: 1
        },
        colorPrimary: {
          '& .MuiSwitch-thumb': {
            backgroundColor: colors.alpha.white[100]
          },

          '&.Mui-checked .MuiSwitch-thumb': {
            backgroundColor: colors.primary.main
          }
        }
      }
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          paddingTop: 20,
          paddingBottom: 20,
          background: colors.alpha.black[10]
        }
      }
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          '&.MuiStepIcon-completed': {
            color: colors.success.main
          }
        }
      }
    },
    MuiMobileStepper: {
      styleOverrides: {
        root: {
          fontFamily: 'Noto Sans',
          fontWeight: 400,
          fontSize: 16,
          letterSpacing: '0.01em',
          lineHeight: '140%',
          backgroundColor: 'transparent'
        }
      }
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          h5: 'h5',
          h6: 'h6',
          subtitle1: 'div',
          subtitle2: 'div',
          body1: 'div',
          body2: 'div',
          h1Bold: 'h1',
          h2Bold: 'h2',
          h3Bold: 'h3',
          h4Bold: 'h4',
          h5Bold: 'h5',
          h6Bold: 'h6',
          body: 'body',
          bodyBold: 'body',
          bodySmall: 'body',
          bodySmallBold: 'body',
          bodySmaller: 'body',
          bodySmallerBold: 'body',
          button: 'body',
          buttonSmall: 'body',
          link: 'div'
        }
      },
      styleOverrides: {
        gutterBottom: {
          marginBottom: 4
        },
        paragraph: {
          fontSize: 17,
          lineHeight: 1.7
        }
      }
    }
  },
  shape: {
    borderRadius: 30
  },
  typography: {
    fontFamily: [
      'Inter',
      'Noto Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Helvetica',
      'Arial',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji'
    ].join(' '),

    allVariants: {
      fontFamily: 'Noto Sans',
      fontWeight: 400,
      fontSize: 16,
      letterSpacing: '0.01em'
    },
    h1Bold: {
      fontFamily: 'Inter',
      fontWeight: 700,
      fontSize: 64,
      letterSpacing: '-0.01em'
    },
    h1: {
      fontFamily: 'Inter',
      fontWeight: 300,
      fontSize: 64,
      letterSpacing: '-0.01em'
    },
    h2Bold: {
      fontFamily: 'Inter',
      fontWeight: 700,
      fontSize: 50,
      letterSpacing: '-0.01em'
    },
    h2: {
      fontFamily: 'Inter',
      fontWeight: 300,
      fontSize: 50,
      letterSpacing: '-0.01em'
    },
    h3Bold: {
      fontFamily: 'Inter',
      fontWeight: 700,
      fontSize: 40,
      letterSpacing: '-0.02em'
    },
    h3: {
      fontFamily: 'Inter',
      fontWeight: 300,
      fontSize: 40,
      letterSpacing: '-0.02em'
    },
    h4Bold: {
      fontFamily: 'Inter',
      fontWeight: 700,
      fontSize: 32,
      letterSpacing: '-0.02em'
    },
    h4: {
      fontFamily: 'Inter',
      fontWeight: 300,
      fontSize: 32,
      letterSpacing: '-0.02em'
    },
    h5Bold: {
      fontFamily: 'Inter',
      fontWeight: 700,
      fontSize: 24,
      letterSpacing: '-0.02em'
    },
    h5: {
      fontFamily: 'Inter',
      fontWeight: 300,
      fontSize: 24,
      letterSpacing: '-0.02em'
    },
    h6Bold: {
      fontFamily: 'Inter',
      fontWeight: 700,
      fontSize: 20,
      letterSpacing: '-0.02em'
    },
    h6: {
      fontFamily: 'Inter',
      fontWeight: 300,
      fontSize: 20,
      letterSpacing: '-0.02em'
    },
    body: {
      fontFamily: 'Noto Sans',
      fontWeight: 400,
      fontSize: 16,
      letterSpacing: '0.01em',
      lineHeight: '140%',
      backgroundColor: 'transparent'
    },
    bodyBold: {
      fontFamily: 'Noto Sans',
      fontWeight: 700,
      fontSize: 16,
      letterSpacing: '0.01em',
      lineHeight: '140%',
      backgroundColor: 'transparent'
    },
    bodySmall: {
      fontFamily: 'Noto Sans',
      fontWeight: 400,
      fontSize: 14,
      letterSpacing: '0.01em',
      lineHeight: '130%',
      backgroundColor: 'transparent'
    },
    bodySmallBold: {
      fontFamily: 'Noto Sans',
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: '0.01em',
      lineHeight: '140%',
      backgroundColor: 'transparent'
    },
    bodySmaller: {
      fontFamily: 'Noto Sans',
      fontWeight: 400,
      fontSize: 10,
      letterSpacing: '0.01em',
      lineHeight: '130%',
      backgroundColor: 'transparent'
    },
    bodySmallerBold: {
      fontFamily: 'Noto Sans',
      fontWeight: 700,
      fontSize: 10,
      letterSpacing: '0.01em',
      lineHeight: '140%',
      backgroundColor: 'transparent'
    },
    button: {
      fontFamily: 'Noto Sans',
      fontWeight: 700,
      fontSize: 16,
      letterSpacing: '0.03em',
      textTransform: 'none'
    },
    buttonSmall: {
      fontFamily: 'Noto Sans',
      fontWeight: 700,
      fontSize: 12,
      letterSpacing: '0.03em'
    },
    link: {
      fontFamily: 'Noto Sans',
      fontWeight: 600,
      fontSize: 16,
      letterSpacing: '0.01em',
      lineHeight: '150%',
      textDecoration: 'Underline',
      color: colors.primary.main
    },
    body1: {},
    body2: {},
    caption: {},
    subtitle1: {},
    subtitle2: {},
    overline: {}
  },
  shadows: [
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none'
  ]
});
