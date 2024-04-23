import { LoginTwoTone, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Card, CardActions, CardContent, Container, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import globalStyles from '../../../../utils/constants/globalStyles';
import { useAuth } from '../../hooks/useAuth';
import { actionTypes, initialState, loginFormReducer } from '../../reducers/loginFormReducer';

export const Login = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(loginFormReducer, initialState);
    const [showPassword, setShowPassword] = useState(false);
    const { loginWithEmailAndPassword, isAuthenticated, loading } = useAuth();

    const handleClickShowPassword = () => setShowPassword(prevState => !prevState);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated]);

    const loginUser = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            loginWithEmailAndPassword(state.email.value, state.password.value)
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Card sx={{ ...globalStyles.card, textAlign: 'center' }}>
            <Container maxWidth='xs' >
                <Typography variant='h2' sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
                    Login
                </Typography>
            </Container>
            <CardContent style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Box
                    component='form'
                    onSubmit={loginUser}
                    sx={{
                        '& .MuiTextField-root': { width: '25ch' },
                    }}
                    noValidate
                    autoComplete='off'
                >
                    <div>
                        <TextField
                            required
                            id='outlined-required'
                            label='Email'
                            disabled={loading}
                            style={globalStyles.textField}
                            autoComplete={'email'}
                            value={state.email.value}
                            error={!state.email.valid}
                            helperText={state.email.error}
                            onChange={(event) => dispatch({ type: actionTypes.EMAIL, payload: event.target.value })}
                        />
                    </div>
                    <div>
                        <TextField
                            id='outlined-password-input'
                            label='Password'
                            type={showPassword ? 'text' : 'password'}
                            disabled={loading}
                            style={globalStyles.textField}
                            autoComplete='current-password'
                            error={!state.password.valid}
                            helperText={state.password.error}
                            value={state.password.value}
                            onChange={(event) =>
                                dispatch({ type: actionTypes.PASSWORD, payload: event.target.value })
                            }
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Tooltip title={showPassword ? 'Hide Password' : 'Show Password'}>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleClickShowPassword}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                    <CardActions sx={{ justifyContent: 'center' }}>
                        <LoadingButton
                            loading={loading}
                            disabled={loading}
                            variant='outlined'
                            color='primary'
                            type='submit'
                            startIcon={<LoginTwoTone />}
                        >
                            Login
                        </LoadingButton>
                    </CardActions>
                </Box>
            </CardContent>
        </Card>
    );
};


