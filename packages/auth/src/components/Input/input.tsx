import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  '@global': {
    a: {
      textDecoration: 'none',
    },
  },
  error: {
    color: '#f44336',
    margin: '5px',
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
  }
}));
interface InputProps {
  id: string;
  label: string;
  name?: string;
  autoComplete?: string;
  value: string;
  type: string;
  error: string;
  onBlur(): void;
  onChange(): void;
}

const Input = ({ 
  id,
  value, 
  label,
  type, 
  name,
  onBlur, 
  onChange,
  error,
  autoComplete
}: any) => {

  const classes = useStyles();
  return (
    <>
    <TextField
      error={error ? true : false}
      variant="outlined"
      margin="normal"
      required
      fullWidth
      type={type}
      label={label}
      id={id}
      name={name}
      value={value}
      autoComplete={autoComplete}
      onChange={onChange}
      onBlur={onBlur}
      // autoFocus
    />
     {error && <p className={classes.error}>{error}</p>}
    </>
  )
}

export default Input;