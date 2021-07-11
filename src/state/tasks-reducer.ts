
import {v1} from "uuid";
import {TasksStateType} from "../App";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type RemoveTasksActionType = ReturnType<typeof removeTaskAC>
type TasksTodolistActionType = ReturnType<typeof addTaskAC>
type ChangeTasksTitleActionType = ReturnType<typeof changeTaskTitleAC>
type ChangeTasksStatusActionType = ReturnType<typeof changeTaskStatusAC>


type ActionsType = RemoveTasksActionType
   | TasksTodolistActionType
   | ChangeTasksTitleActionType
   | ChangeTasksStatusActionType
   | AddTodolistActionType
   | RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
   switch (action.type) {
      case 'REMOVE-TASK': {
         return {
            ...state,
            [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)
         };
      }
      case 'ADD-TASK': {
         const newTask: TaskType = {
            id: v1(),
            title: action.title,
            status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.low,
            startDate: '',
            todoListId: action.todolistId
         };
         return {
            ...state,
            [action.todolistId]: [newTask, ...state[action.todolistId]]
         };
      }
      case 'CHANGE-TASK-TITLE': {
         return {
            ...state,
            [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
               ...t,
               title: action.newTitle
            } : t)
         };
      }
      case 'CHANGE-TASK-STATUS': {
         return {
            ...state,
            [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
               ...t,
               status: action.status
            } : t)
         };
      }
      case "ADD-TODOLIST": {
         return {
            ...state,
            [action.todolistId]: []
         };
      }
      case "REMOVE-TODOLIST": {
         const stateCopy = {...state};
         delete stateCopy[action.todolistId];
         return stateCopy;
      }
      default:
         return state;
   }
}

/**
 * Action Creator
 */
export const removeTaskAC = (id: string, todolistId: string) => {
   return {type: 'REMOVE-TASK', id: id, todolistId: todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
   return {type: 'ADD-TASK', title: title, todolistId: todolistId} as const
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
   return {type: 'CHANGE-TASK-STATUS', todolistId: todolistId, taskId: taskId, status} as const
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => {
   return {type: 'CHANGE-TASK-TITLE', todolistId: todolistId, newTitle: newTitle, taskId: taskId} as const
}
