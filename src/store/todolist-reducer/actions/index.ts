import { TodolistType } from '../../../api/todolists-api';
import { RequestStatusType } from '../../app-reducer/types';
import { FilterValuesType } from '../types';

/**
 * Action Creator
 */
export const removeTodolistAC = (todolistId: string) => {
  return { type: 'REMOVE-TODOLIST', todolistId } as const;
};
export const addTodolistAC = (todolist: TodolistType) => {
  return { type: 'ADD-TODOLIST', todolist } as const;
};
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
  return { type: 'CHANGE-TODOLIST-TITLE', todolistId, title } as const;
};
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
  return { type: 'CHANGE-TODOLIST-FILTER', todolistId, filter } as const;
};
export const changeTodolistEntityStatusAC = (todolistId: string, status: RequestStatusType) => {
  return { type: 'CHANGE-TODOLIST-ENTITY-STATUS', todolistId, status } as const;
};
export const setTodolistsAC = (todolists: TodolistType[]) => {
  return { type: 'SET_TODOLISTS', todolists } as const;
};
