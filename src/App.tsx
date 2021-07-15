import React, {useCallback, useEffect} from 'react';
import {TodoList} from "./components/TodoList/TodoList";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {Container, Grid, Paper} from "@material-ui/core";
import {addTodolistTC, fetchTodolistsTC, TodolistDomainType} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./api/todolists-api";
import {Header} from "./components/Header/Header";


export type TasksStateType = {
   [key: string]: TaskType[]
};


export const App = () => {

   const dispatch = useDispatch();
   const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists);

   useEffect(() => {
      dispatch(fetchTodolistsTC());
      // eslint-disable-next-line
   }, []);

   const addTodoListForm = useCallback((title: string) => {
      const action = addTodolistTC(title)
      dispatch(action);
   }, [dispatch]);

   return (
      <div className="App">
         <Header/>
         <Container fixed>
            <Grid container style={{padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
               <Paper style={{padding: '10px'}}>
                  <AddItemForm addItem={addTodoListForm}/>
               </Paper>
            </Grid>
            <Grid container spacing={5}>
               {
                  todolists.map(tl => {
                     return <Grid item key={tl.id}>
                        <Paper elevation={3} style={{padding: '10px'}}>
                           <TodoList
                              key={tl.id}
                              todolistId={tl.id}
                              title={tl.title}
                              filter={tl.filter}
                           />
                        </Paper>
                     </Grid>
                  })
               }
            </Grid>
         </Container>
      </div>
   );
}





