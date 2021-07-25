import React, {useCallback} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useDispatch, useSelector} from "react-redux";
import {logoutTC} from "../../features/Login/auth-reducer";
import {AppRootStateType} from "../../App/store";


const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         flexGrow: 1,
      },
      menuButton: {
         marginRight: theme.spacing(2),

      },
      header: {
         background: 'linear-gradient(90deg, rgba(43,86,123,1) 0%, rgba(66,123,172,1) 43%, rgba(93,151,200,1) 100%)'
      },
      toolbar: {
         display: 'flex',
         justifyContent: 'space-between'
      }
   }),
);

export const Header: React.FC = () => {
   const classes = useStyles();
   const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
   const dispatch = useDispatch();

   const logoutHandler = useCallback(() => {
      dispatch(logoutTC());
   },[dispatch])

   return (
      <div className={classes.root}>
         <AppBar position="static" className={classes.header}>
            <Toolbar className={classes.toolbar}>
               <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon/>
               </IconButton>
               {isLoggedIn
                  ? <Button onClick={logoutHandler} color="inherit">Log out</Button>
                  : <Button color="inherit"><a href={'https://social-network.samuraijs.com/'}
                                               rel={'noreferrer'}
                                               target={'_blank'}
                                               style={{color: 'inherit'}}> Registration
                  </a></Button>
               }
            </Toolbar>
         </AppBar>
      </div>
   )
}
