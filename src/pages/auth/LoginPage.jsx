import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { useForm } from '../../Hooks/useForm';
import { FormHelperText } from '@mui/material';
import { AuthContext } from '../../contexts/AuthContext';

export const LoginPage = () => {
    //Instanciando el reducer AuthReducer por medio de su contexto AuthContext
    const { state, login } = useContext(AuthContext);
    const title = 'DashDummy';//Solamente se fija el titulo
    //Instancia de custom Hook useForm , desesctructura de funcion onChangeInput dentro de hook useForm
    const { formState, onChangeInput } = useForm();
    const handleSubmitLogin = (event) => {
      event.preventDefault();
      //Envio datos al Reducer
      if(formState.username!==undefined && formState.password!==undefined)
      login(formState.username, formState.password);
    }

  return (
    <>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography data-testid='titleLogin' component="h1" variant="h5">
            { title }
          </Typography>
          <Box component="form" onSubmit={handleSubmitLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              // error
              aria-label='user'
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={onChangeInput}/>
            <TextField
              // error
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChangeInput}/>
            <FormHelperText
              id="component-helper-text"
              sx={{ color:'red' }}>
            </FormHelperText>
            <Button
              aria-label='btn-login'
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              INGRESAR
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Recuperar Contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Registrarse"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          {/* Recordatorio de usuario para ingresar */}
          <Box marginTop={5} textAlign={'left'}>
            <Typography variant='body2' data-testid='test-login'>User: kminchelle</Typography>
            <Typography variant='body2' data-testid='test-login'>Pass: 0lelplR</Typography>
          </Box>
    </>
  )
}
