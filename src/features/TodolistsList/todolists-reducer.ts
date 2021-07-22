import {ResultsCode, todolistsAPI, TodolistType} from "../../api/todolists-api";
import {AppThunkType} from "../../App/store";
import {RequestStatusType, setAppStatusAC} from "../../App/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const initialState: TodolistDomainType[] = [];


export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistsActionsType): TodolistDomainType[] => {
   switch (action.type) {
      case 'REMOVE-TODOLIST':
         return state.filter(tl => tl.id !== action.todolistId);
      case 'ADD-TODOLIST':
         return [{...action.todolist, filter: "all", entityStatus: "idle"}, ...state];
      case 'CHANGE-TODOLIST-TITLE':
         return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl);
      case 'CHANGE-TODOLIST-FILTER':
         return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl);
      case "CHANGE-TODOLIST-ENTITY-STATUS":
         return state.map(tl => tl.id === action.todolistId ? {...tl, entityStatus: action.status}: tl);
      case "SET_TODOLISTS":
         return action.todolists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}));
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
export const changeTodolistEntityStatusAC = (todolistId: string, status: RequestStatusType) => {
   return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', todolistId, status} as const
}
export const setTodolistsAC = (todolists: TodolistType[]) => {
   return {type: 'SET_TODOLISTS', todolists} as const
}

/**
 * Thunk Creator
 */
export const fetchTodolistsTC = (): AppThunkType => async dispatch => {
   dispatch(setAppStatusAC('loading'));
   try {
      const res = await todolistsAPI.getTodolist();
      dispatch(setTodolistsAC(res.data));
   } catch (err) {
      handleServerNetworkError(err, dispatch)
   } finally {
      dispatch(setAppStatusAC('succeeded'));
   }
}
export const addTodolistTC = (title: string): AppThunkType => async dispatch => {
   dispatch(setAppStatusAC('loading'));
   try {
      const res = await todolistsAPI.createTodolist(title);
      if (res.data.resultCode === ResultsCode.OK) {
         dispatch(addTodolistAC(res.data.data.item));
      } else {
         handleServerAppError(res.data, dispatch)
      }
   } catch (err) {
      handleServerNetworkError(err, dispatch)
   } finally {
      dispatch(setAppStatusAC('succeeded'));
   }
}
export const removeTodolistTC = (todolistId: string): AppThunkType => async dispatch => {
   dispatch(setAppStatusAC('loading'));
   dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'));
   try {
      const res = await todolistsAPI.deleteTodolist(todolistId);
      if (res.data.resultCode === ResultsCode.OK) {
         dispatch(removeTodolistAC(todolistId));
      } else {
         handleServerAppError(res.data, dispatch)
      }
   } catch (err) {
      handleServerNetworkError(err, dispatch)
   } finally {
      dispatch(setAppStatusAC('succeeded'));
   }
}
export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunkType => async dispatch => {
   dispatch(setAppStatusAC('loading'));
   try {
      const res = await todolistsAPI.updateTodolistTitle(todolistId, title);
      if (res.data.resultCode === ResultsCode.OK) {
         dispatch(changeTodolistTitleAC(todolistId, title));
      } else {
         handleServerAppError(res.data, dispatch)
      }
   } catch (err) {
      handleServerNetworkError(err, dispatch)
   } finally {
      dispatch(setAppStatusAC('succeeded'));
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
type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>


export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
   filter: FilterValuesType
   entityStatus: RequestStatusType
}

export type TodolistsActionsType =
   | RemoveTodolistActionType
   | AddTodolistActionType
   | ChangeTodolistTitleActionType
   | ChangeTodolistFilterActionType
   | SetTodolistsActionType
   | ChangeTodolistEntityStatusActionType
