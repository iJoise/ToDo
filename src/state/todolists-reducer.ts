import {FilterValuesType, TodoListItemType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>


type ActionsType = RemoveTodolistActionType
   | AddTodolistActionType
   | ChangeTodolistTitleActionType
   | ChangeTodolistFilterActionType

export const todolistsReducer = (state: TodoListItemType[], action: ActionsType): TodoListItemType[] => {
   switch (action.type) {
      case 'REMOVE-TODOLIST': {
         return state.filter(tl => tl.id !== action.todolistId)
      }
      case 'ADD-TODOLIST': {
         const newTodoListForm: TodoListItemType = {
            id: action.todolistId,
            title: action.title,
            filter: 'all'
         }
         return [
            ...state,
            newTodoListForm
         ]
      }
      case 'CHANGE-TODOLIST-TITLE': {
         const titleForTodoList = state.map(t => t.id === action.todolistId
            ? {...t, title: action.title}
            : t);
         return [...titleForTodoList]
      }
      case 'CHANGE-TODOLIST-FILTER': {
         return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
      }
      default:
         throw new Error("I don't understand this type")
   }
}
/**
 * Action Creator
 */
export const removeTodolistAC = (todolistId: string) => {
   return {type: 'REMOVE-TODOLIST', todolistId: todolistId} as const
}
export const addTodolistAC = (title: string) => {
   return {type: 'ADD-TODOLIST', title: title, todolistId: v1()} as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
   return {type: 'CHANGE-TODOLIST-TITLE', todolistId: todolistId, title: title} as const
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
   return {type: 'CHANGE-TODOLIST-FILTER', todolistId: todolistId, filter: filter} as const
}
