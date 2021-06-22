
import {
   AddTodolistActionType,
   RemoveTodolistActionType,
   todolistID_1,
   todolistID_2,
   todolistID_3
} from "./todolists-reducer";
import {v1} from "uuid";
import {TasksStateType, TaskType} from "../AppWithRedux";

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

const initialState: TasksStateType = {
   [todolistID_1]: [
      {id: v1(), title: 'HTML', isDone: true},
      {id: v1(), title: 'CSS', isDone: true},
      {id: v1(), title: 'React', isDone: false},
      {id: v1(), title: 'Rest API', isDone: true},
      {id: v1(), title: 'GraphQL', isDone: false},
   ],
   [todolistID_2]: [
      {id: v1(), title: 'Gin', isDone: true},
      {id: v1(), title: 'Whisky', isDone: true},
      {id: v1(), title: 'Hennessy', isDone: false},
      {id: v1(), title: 'Angostura', isDone: true},
      {id: v1(), title: 'Jagermeister', isDone: false},
   ],
   [todolistID_3]: [
      {id: v1(), title: 'Husqvarna 701 Enduro', isDone: false},
      {id: v1(), title: 'Find a job in IT', isDone: false},
      {id: v1(), title: 'Move to another city', isDone: false},
      {id: v1(), title: 'Buy a garage there', isDone: false},
   ],
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
   switch (action.type) {
      case 'REMOVE-TASK': {
         return {
            ...state,
            [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)
         };
      }
      case 'ADD-TASK': {
         const newTask: TaskType = {id: v1(), title: action.title, isDone: false};
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
               isDone: action.newIsDoneValue
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
export const changeTaskStatusAC = (taskId: string, newIsDoneValue: boolean, todolistId: string) => {
   return {type: 'CHANGE-TASK-STATUS', todolistId: todolistId, taskId: taskId, newIsDoneValue: newIsDoneValue} as const
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => {
   return {type: 'CHANGE-TASK-TITLE', todolistId: todolistId, newTitle: newTitle, taskId: taskId} as const
}
