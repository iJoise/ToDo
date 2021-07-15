import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {AppThunkType} from "../../App/store";


const initialState: TodolistDomainType[] = [];


export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistsActionsType): TodolistDomainType[] => {
   switch (action.type) {
      case 'REMOVE-TODOLIST':
         return state.filter(tl => tl.id !== action.todolistId);
      case 'ADD-TODOLIST':
         return [{...action.todolist, filter: "all"}, ...state];
      case 'CHANGE-TODOLIST-TITLE':
         return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl);
      case 'CHANGE-TODOLIST-FILTER':
         return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl);
      case "SET_TODOLISTS":
         return action.todolists.map(tl => ({...tl, filter: "all"}));
      default:
         return state;
   }
}

/**
 * Action Creator
 */
export const removeTodolistAC = (todolistId: string) => {
   return {type: 'REMOVE-TODOLIST', todolistId} as const
}
export const addTodolistAC = (todolist: TodolistType) => {
   return {type: 'ADD-TODOLIST', todolist} as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
   return {type: 'CHANGE-TODOLIST-TITLE', todolistId, title} as const
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
   return {type: 'CHANGE-TODOLIST-FILTER', todolistId, filter} as const
}
export const setTodolistsAC = (todolists: TodolistType[]) => {
   return {type: 'SET_TODOLISTS', todolists} as const
}

/**
 * Thunk Creator
 */
export const fetchTodolistsTC = (): AppThunkType => async dispatch => {
      try {
         const res = await todolistsAPI.getTodolist();
         dispatch(setTodolistsAC(res.data));
      } catch(err) {
         console.warn(err);
      }
   }
export const addTodolistTC = (title: string): AppThunkType => async dispatch => {
   try {
      const res = await todolistsAPI.createTodolist(title);
      dispatch(addTodolistAC(res.data.data.item));
   } catch (err) {
      console.warn(err);
   }
}
export const removeTodolistTC = (todolistId: string): AppThunkType => async dispatch => {
   try {
      await todolistsAPI.deleteTodolist(todolistId);
      dispatch(removeTodolistAC(todolistId));
   } catch (err) {
      console.warn(err);
   }
}
export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunkType => async dispatch => {
   try {
      await todolistsAPI.updateTodolistTitle(todolistId, title);
      dispatch(changeTodolistTitleAC(todolistId, title));
   } catch (err) {
      console.warn(err);
   }
}

/**
 * Types
 */
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
   filter: FilterValuesType
}

export type TodolistsActionsType =
   | RemoveTodolistActionType
   | AddTodolistActionType
   | ChangeTodolistTitleActionType
   | ChangeTodolistFilterActionType
   | SetTodolistsActionType
