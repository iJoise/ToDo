import React from 'react';
import {Container} from "@material-ui/core";
import {Header} from "../components/Header/Header";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";
import LinearProgress from '@material-ui/core/LinearProgress';
import './App.scss'


export const App = () => {

   const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);

   return (
      <div className="App">
         <ErrorSnackbar/>
         <Header/>
         <div className={'progress'}>
            {status === 'loading' && <LinearProgress color="secondary"/>}
         </div>
         <Container fixed>
            <TodolistsList/>
         </Container>
      </div>
   );
}



