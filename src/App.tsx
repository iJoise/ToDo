import React, {useCallback, useEffect} from 'react';
import {TodoList} from "./components/TodoList/TodoList";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {Container, Grid, Paper} from "@material-ui/core";
import {
   addTodolistTC,
   changeTodolistFilterAC,
   changeTodolistTitleTC,
   fetchTodolistsTC,
   FilterValuesType,
   TodolistDomainType
} from "./state/todolists-reducer";
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
   }, []);

   const addTodoListForm = useCallback((title: string) => {
      const action = addTodolistTC(title)
      dispatch(action);
   }, [dispatch]);

   const changeTodoListTitle = useCallback((newTitle: string, todolistId: string) => {
      dispatch(changeTodolistTitleTC(todolistId, newTitle));
   }, [dispatch]);

   const changeTodoListFilter = useCallback((filterValue: FilterValuesType, todolistId: string) => {
      dispatch(changeTodolistFilterAC(todolistId, filterValue));
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
                              todolistID={tl.id}
                              title={tl.title}
                              filter={tl.filter}
                              changeTodoListFilter={changeTodoListFilter}
                              changeTodoListTitle={changeTodoListTitle}
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





