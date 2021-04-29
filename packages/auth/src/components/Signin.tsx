import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Input from './Input/input';
import useFrom from '../hooks/useForm';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import style from '../global.module.css';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    a: {
      textDecoration: 'none',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  snackbar: {
    background: '#2d816a',
    borderRadius: 3,
    border: 0,
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
}));

interface SignInFormData {
  email: string;
  password: string;
}

type Snackbar = {
  text: any,
  message: any,
  open: any,
}

export default function SignIn({ onSignIn }: any) {
  const styles = useStyles();
  const [snackBar, setSnackBar] = useState<any>({text: "", message: "", open: false})
  const [disabled, setDisabled] = useState<any>(true)
  const inputEmail = useFrom('email')
  const inputPassword = useFrom('password')

  const user = {
    email: inputEmail.value,
    password: inputPassword.value,
  }

  useEffect(() => {
    if(inputEmail.validate() && inputPassword.validate()){
      setDisabled(false);
    }else{
      setDisabled(true);
    }
  },[inputEmail,inputPassword])

  function handleSubmit(event: any) {
   event.preventDefault();
  }

  const signIn = useCallback(
    async ({ email, password }: SignInFormData) => {
      try {
        const response = await api.post('sessions', {
          email,
          password,
        });

        const { token, user } = response.data;
        localStorage.setItem('@Mfe:token', token);
        localStorage.setItem('@Mfe:user', JSON.stringify(user));
        onSignIn();
        api.defaults.headers.authorization = `Bearer ${token}`;
      } catch (error) {
        setSnackBar(
          {message:`
          Erro na autenticação
          Ocorreu um erro ao fazer login,
          cheque as credenciais`,
          open:true
        })
      }
    }, [onSignIn]);

  return (
    <Container component="main" maxWidth="xs">
      <div className={styles.paper}>
        <Avatar className={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          onSubmit={handleSubmit}
          className={styles.form}
          noValidate
        >
          <Input 
          id='email' 
          label="Email Address " 
          name="email" 
          type="email"
          autoComplete="Email Address "
          {...inputEmail}
          />
          <Input 
          id='password' 
          label="Password" 
          type="password"
          name="password" 
          autoComplete="Password " 
          {...inputPassword}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={disabled}
            color="primary"
            className={styles.submit}
            onClick={() => signIn(user)}
          >
            Sign In
          </Button>
          <Grid container className={styles.typography}>
            <Grid item >
              <Link to="/auth/signup">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Snackbar 
        message={snackBar.message}
        open={snackBar.open}
        onClose={() => setSnackBar({open:false})}
        autoHideDuration={3000}
        ContentProps={{
          "aria-describedby": "message-id",
          className: styles.snackbar
        }}
      />
    </Container>
  );
}
