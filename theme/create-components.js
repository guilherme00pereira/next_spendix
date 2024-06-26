import {
    createTheme,
    filledInputClasses,
    inputLabelClasses,
    outlinedInputClasses,
    paperClasses,
    tableCellClasses,
    typographyClasses
} from '@mui/material';
import { neutral } from './colors';
import {alpha} from "@mui/material/styles";
import { maxHeight, typography } from '@mui/system';

// Used only to create transitions
const muiTheme = createTheme();

export function createComponents() {


    return {
        MuiAvatar: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: 0
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '6px',
                    textTransform: 'none'
                },
                sizeSmall: {
                    padding: '2px 12px',
                    maxHeight: '32px'
                },
                sizeMedium: {
                    padding: '8px 20px'
                },
                sizeLarge: {
                    padding: '11px 24px'
                },
                textSizeSmall: {
                    padding: '4px 8px'
                },
                textSizeMedium: {
                    padding: '9px 16px'
                },
                textSizeLarge: {
                    padding: '12px 16px'
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: ({theme}) => ({
                    backgroundColor: theme.vars.palette.background.paper,
                    backgroundImage: 'none',
                })
            }
        },
        MuiCard: {
            styleOverrides: {
                root: ({theme}) => ({
                    backgroundColor: theme.vars.palette.background.paper,
                    backgroundImage: 'none',
                    borderRadius: 20,
                    [`&.${paperClasses.elevation1}`]: {
                        boxShadow: '0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)'
                    }
                })
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '32px 24px',
                    '&:last-child': {
                        paddingBottom: '32px'
                    }
                }
            }
        },
        MuiCardHeader: {
            defaultProps: {
                titleTypographyProps: {
                    variant: 'h6'
                },
                subheaderTypographyProps: {
                    variant: 'body2'
                }
            },
            styleOverrides: {
                root: {
                    padding: '32px 24px 16px'
                }
            }
        },
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    boxSizing: 'border-box'
                },
                html: {
                    MozOsxFontSmoothing: 'grayscale',
                    WebkitFontSmoothing: 'antialiased',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100%',
                    width: '100%'
                },
                body: {
                    display: 'flex',
                    flex: '1 1 auto',
                    flexDirection: 'column',
                    minHeight: '100%',
                    width: '100%'
                },
                '#__next': {
                    display: 'flex',
                    flex: '1 1 auto',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%'
                },
                '#nprogress': {
                    pointerEvents: 'none'
                },
                '#nprogress .bar': ({theme}) => ({
                    backgroundColor: theme.vars.palette.primary.main,
                    height: 3,
                    left: 0,
                    position: 'fixed',
                    top: 0,
                    width: '100%',
                    zIndex: 2000
                })
            }
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    '&::placeholder': {
                        opacity: 1
                    }
                }
            }
        },
        MuiInput: {
            styleOverrides: {
                input: {
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: '24px',
                    '&::placeholder': ({theme}) => ({
                        color: theme.vars.palette.text.secondary
                    })
                }
            }
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                    borderRadius: 8,
                    borderStyle: 'solid',
                    borderWidth: 1,
                    overflow: 'hidden',
                    borderColor: neutral[200],
                    transition: muiTheme.transitions.create([
                        'border-color',
                        'box-shadow'
                    ]),
                    '&:hover': {
                        backgroundColor: alpha(neutral[900], 0.04),//palette.action.hover
                    },
                    '&:before': {
                        display: 'none'
                    },
                    '&:after': {
                        display: 'none'
                    },
                    [`&.${filledInputClasses.disabled}`]: {
                        backgroundColor: 'transparent'
                    },
                    [`&.${filledInputClasses.focused}`]: ({theme}) => ({
                        backgroundColor: 'transparent',
                        borderColor: theme.vars.primary.main,
                        boxShadow: `${theme.vars.primary.main} 0 0 0 2px`
                    }),
                    [`&.${filledInputClasses.error}`]: ({theme}) => ({
                        borderColor: theme.vars.error.main,
                        boxShadow: `${theme.vars.error.main} 0 0 0 2px`
                    })
                },
                input: {
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: '24px'
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&:hover': ({theme}) => ({
                        backgroundColor: theme.vars.palette.action.hover,
                        [`& .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: neutral[200]
                        }
                    }),
                    // [`&.${outlinedInputClasses.focused}`]: {
                    //   backgroundColor: 'transparent',
                    //   [`& .${outlinedInputClasses.notchedOutline}`]: {
                    //     borderColor: palette.primary.main,
                    //     boxShadow: `${palette.primary.main} 0 0 0 2px`
                    //   }
                    // },
                    [`&.${filledInputClasses.error}`]: ({theme}) => ({
                        [`& .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: theme.vars.error.main,
                            boxShadow: `${theme.vars.error.main} 0 0 0 2px`
                        }
                    })
                },
                input: {
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: '24px',
                    padding: '6px 14px'
                },
                notchedOutline: {
                    borderColor: neutral[200],
                    transition: muiTheme.transitions.create([
                        'border-color',
                        'box-shadow'
                    ])
                }
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                    fontWeight: 500,
                    [`&.${inputLabelClasses.filled}`]: {
                        transform: 'translate(12px, 18px) scale(1)'
                    },
                    [`&.${inputLabelClasses.shrink}`]: {
                        [`&.${inputLabelClasses.standard}`]: {
                            transform: 'translate(0, -1.5px) scale(0.85)'
                        },
                        [`&.${inputLabelClasses.filled}`]: {
                            transform: 'translate(12px, 6px) scale(0.85)'
                        },
                        [`&.${inputLabelClasses.outlined}`]: {
                            transform: 'translate(14px, -9px) scale(0.85)'
                        }
                    }
                }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: 1.71,
                    minWidth: 'auto',
                    paddingLeft: 0,
                    paddingRight: 0,
                    textTransform: 'none',
                    '& + &': {
                        marginLeft: 24
                    }
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: ({theme}) => ({
                    borderBottomColor: theme.vars.divider,
                    padding: '15px 16px'
                }),
            }
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    borderBottom: 'none',
                    [`& .${tableCellClasses.root}`]: {
                        borderBottom: 'none',
                        backgroundColor: neutral[600],
                        color: neutral[25],
                        fontSize: 12,
                        fontWeight: 600,
                        lineHeight: 1,
                        letterSpacing: 0.5,
                        textTransform: 'uppercase'
                    },
                    [`& .${tableCellClasses.paddingCheckbox}`]: {
                        paddingTop: 4,
                        paddingBottom: 4
                    },
                }
            }
        },
        MuiTextField: {
            defaultProps: {
                variant: 'filled'
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    minWidth: 36
                }
            }
        },
        MuiListItemText: {
            styleOverrides: {
                root: {
                    [`& .${typographyClasses.root}`]: {
                    fontSize: '16px',
                    }
                }
            }
    }   ,
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    h1: 'h1',
                    h2: 'h2',
                    h3: 'h3',
                    h4: 'h4',
                    h5: 'h5',
                    h6: 'h6',
                    subtitle1: 'h6',
                    subtitle2: 'span',
                    body1: 'span',
                    body2: 'span',
                }
            },
        }
    };
}
