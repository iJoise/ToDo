import React, {useCallback} from 'react';
import {TodoList} from "./components/TodoList/TodoList";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {makeStyles} from "@material-ui/styles";
import {
   addTodolistAC,
   changeTodolistFilterAC,
   changeTodolistTitleAC, FilterValuesType,
   removeTodolistAC, TodolistDomainType
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType, TodolistType} from "./api/todolists-api";




export type TasksStateType = {
   [key: string]: TaskType[]
};

const useStyles = makeStyles({
   header: {
      background: 'linear-gradient(90deg, rgba(43,86,123,1) 0%, rgba(66,123,172,1) 43%, rgba(93,151,200,1) 100%)'
   },
});


export const  App = () => {
   const classes = useStyles();

   const dispatch = useDispatch()
   const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)

   const addTodoListForm = useCallback((title: string) => {
      const action = addTodolistAC(title)
      dispatch(action);
   }, [dispatch]);
   const removeTodoList = useCallback( (todolistId: string) => {
      dispatch(removeTodolistAC(todolistId));
   }, [dispatch])
   const changeTodoListTitle = useCallback( (newTitle: string, todolistId: string) => {
      dispatch(changeTodolistTitleAC(todolistId, newTitle));
   }, [dispatch])
   const changeTodoListFilter = useCallback( (filterValue: FilterValuesType, todolistId: string) => {
      dispatch(changeTodolistFilterAC(todolistId, filterValue));
   }, [dispatch])

   return (
      <div className="App">
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
                              removeTodoList={removeTodoList}
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





