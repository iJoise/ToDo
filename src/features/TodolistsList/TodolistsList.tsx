import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../App/store";
import {addTodolistTC, fetchTodolistsTC, TodolistDomainType} from "./todolists-reducer";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";

export const TodolistsList: React.FC = () => {

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
      <>
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
                        <Todolist
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
      </>
   )
}