import React from 'react';
import {Container} from "@material-ui/core";
import {Header} from "../components/Header/Header";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";


export const App = () => {

   return (
      <div className="App">
         <Header/>
         <Container fixed>
            <TodolistsList/>
         </Container>
      </div>
   );
}



