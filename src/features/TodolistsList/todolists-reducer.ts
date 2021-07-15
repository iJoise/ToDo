import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";


const initialState: TodolistDomainType[] = [];


export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
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
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
   todolistsAPI.getTodolist()
      .then(res => {
         dispatch(setTodolistsAC(res.data));
      })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
   todolistsAPI.createTodolist(title)
      .then(res => {
         dispatch(addTodolistAC(res.data.data.item));
      })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
   todolistsAPI.deleteTodolist(todolistId)
      .then(res => {
         dispatch(removeTodolistAC(todolistId));
      })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
   todolistsAPI.updateTodolistTitle(todolistId, title)
      .then(res => {
         dispatch(changeTodolistTitleAC(todolistId, title))
      })
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

type ActionsType =
   | RemoveTodolistActionType
   | AddTodolistActionType
   | ChangeTodolistTitleActionType
   | ChangeTodolistFilterActionType
   | SetTodolistsActionType
