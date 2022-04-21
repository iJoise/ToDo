import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../App/store';
import { Grid, Paper } from '@material-ui/core';
import { AddItemForm } from '../../components/AddItemForm/AddItemForm';
import { Todolist } from './Todolist/Todolist';
import { Redirect } from 'react-router-dom';
import { TodolistDomainType } from '../../store/todolist-reducer/types';
import { addTodolist, fetchTodolist } from '../../store/todolist-reducer/sagas';

export const TodolistsList: React.FC = () => {

  const dispatch = useDispatch();
  const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists);
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(fetchTodolist());
    // eslint-disable-next-line
  }, []);

  const addTodoListForm = useCallback((title: string) => {
    const action = addTodolist(title);
    dispatch(action);
  }, [dispatch]);

  if (!isLoggedIn) {
    return <Redirect to={'/login'} />;
  }

  return (
    <>
      <Grid container style={{ padding: '20px' }}>
        <Paper style={{ padding: '10px' }}>
          <AddItemForm addItem={addTodoListForm} />
        </Paper>
      </Grid>
      <Grid container spacing={5}>
        {
          todolists.map(tl => {
            return <Grid item key={tl.id}>
              <Paper elevation={3} style={{ padding: '10px' }}>
                <Todolist
                  key={tl.id}
                  todolist={tl}
                />
              </Paper>
            </Grid>;
          })
        }
      </Grid>
    </>
  );
};
