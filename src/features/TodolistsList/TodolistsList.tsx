import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../App/store";
import {addTodolistTC, fetchTodolistsTC, TodolistDomainType} from "../../store/todolist-reducer/todolists-reducer";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Redirect} from "react-router-dom";

export const TodolistsList: React.FC = () => {

   const dispatch = useDispatch();
   const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists);
   const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)


   useEffect(() => {
      if (!isLoggedIn) {
         return
      }
      dispatch(fetchTodolistsTC());
      // eslint-disable-next-line
   }, []);

   const addTodoListForm = useCallback((title: string) => {
      const action = addTodolistTC(title)
      dispatch(action);
   }, [dispatch]);

   if (!isLoggedIn) {
      return <Redirect to={'/login'}/>
   }

   return (
      <>
         <Grid style={{padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
                           todolist={tl}
                        />
                     </Paper>
                  </Grid>
               })
            }
         </Grid>
      </>
   )
}
