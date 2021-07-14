import React from "react";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {makeStyles} from "@material-ui/styles";


const useStyles = makeStyles({
   header: {
      background: 'linear-gradient(90deg, rgba(43,86,123,1) 0%, rgba(66,123,172,1) 43%, rgba(93,151,200,1) 100%)'
   },
});

export const Header: React.FC = () => {
   const classes = useStyles();

   return (
      <AppBar position="static" className={classes.header}>
         <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
               <Menu/>
            </IconButton>
            <Typography variant="h6">
               News
            </Typography>
            <Button color="inherit">Login</Button>
         </Toolbar>
      </AppBar>
   )
}
