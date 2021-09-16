import React, {useEffect} from 'react';
import Container from "@material-ui/core/Container";
import CircularProgress from '@material-ui/core/CircularProgress';
import {Header} from "../components/Header/Header";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializedAppTC, RequestStatusType} from "./app-reducer";
import LinearProgress from '@material-ui/core/LinearProgress';
import './App.scss'
import {BrowserRouter, Route} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {Grid} from "@material-ui/core";



export const App = () => {

   const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
   const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.initialized);
   const dispatch = useDispatch();


   useEffect(() => {
      dispatch(initializedAppTC())
      // eslint-disable-next-line
   }, []);


   if (!isInitialized) {
      return <Container>
         <Grid container justify={'center'} alignItems={'center'} style={{height: '100vh'}}>
            <CircularProgress color={'secondary'} size={130}/>
         </Grid>
      </Container>
   }

   return (
      <BrowserRouter>
         <div className="App">
            <ErrorSnackbar/>
            <Header/>
            <div className={'progress'}>
               {status === 'loading' && <LinearProgress color="secondary"/>}
            </div>
            <Container fixed>
               <Route exact path={'/'} render={() => <TodolistsList/>}/>
               <Route path={'/login'} render={() => <Login/>}/>
            </Container>
         </div>
      </BrowserRouter>
   );
}



