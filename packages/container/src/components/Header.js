import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { FiUser} from 'react-icons/fi';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { useTransaction } from '../hooks/useTransaction';
import styles from './Header/header.module.css';
import SubMenu from './Header/Submenu';
import logo from '../../assets/logo.svg';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      margin: '0',
      padding: '0',
    },
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
    a: {
      textDecoration: 'none',
    },
  },
  appBar: {
    // borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    background: 'rgb(32, 32, 36)',
    color: 'rgb(115, 115, 128)',
  },
  link: {
    margin: theme.spacing(1, 1.5),
    fontSize: '1rem'
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  login:{
    display: 'flex',
    alignItems: 'baseline',
    text:{
      marginRight: theme.spacing(2),
    }
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const Header = () =>{
  const classes = useStyles();
  const {authenticated, user } = useTransaction();
  return (
    <React.Fragment>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <div className={styles.navlink}>
          <Typography 
            variant="h6"
            color="inherit"
            noWrap
            component={RouterLink}
            to="/"
          >
            <img className={styles.logo} src={logo} alt="appsoftware" />
          </Typography>
          {authenticated && (
            <>
            <Typography  className={styles.link}
              variant="h6"
              color="inherit"
              size={12}
              noWrap
              component={RouterLink}
              to="/dashboard"
            >
              Dashboard 
            </Typography>
            <Typography  className={styles.link}
              variant="h6"
              color="inherit"
              noWrap
              component={RouterLink}
              to="/dashboard"
            >
              Home 
            </Typography>
            </>
          )}
          </div>
          {!authenticated ? (
            <Button
            color="primary"
            variant="outlined"
            className={classes.link}
            component={RouterLink}
            to='/auth/signin'
           > Login
             </Button>
          ) : (
            <div className={styles.container}>
           <section className={styles.content}>
             <span className={styles.avatar}>
              {user?.avatar_url ? (
                <img src={user?.avatar_url} alt="avatar"/>
              ):(
                 <FiUser className={styles.fiuser} size={20}/>
              )}
              <div className={styles.submenuFlex}>
               <strong className={styles.users}>{user?.name ?? ' Bem vindo!'}</strong>
               <small className={styles.users}>{user?.email ?? ''}</small>
              </div>
             </span>
           </section>
            <SubMenu /> 
          </div>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
export default Header;
