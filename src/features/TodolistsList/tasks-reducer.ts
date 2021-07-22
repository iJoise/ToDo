import {ResultsCode, taskAPI, TaskPriorities, TaskStatuses, TaskType} from "../../api/todolists-api";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {AppThunkType} from "../../App/store";
import {setAppStatusAC} from "../../App/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
   switch (action.type) {
      case 'REMOVE-TASK':
         return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)};
      case 'ADD-TASK':
         return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]};
      case 'UPDATE-TASK':
         return {
            ...state,
            [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)
         };
      case "ADD-TODOLIST":
         return {...state, [action.todolist.id]: []};
      case "REMOVE-TODOLIST": {
         const stateCopy = {...state};
         delete stateCopy[action.todolistId];
         return stateCopy;
      }
      case "SET_TODOLISTS": {
         const copyState = {...state};
         action.todolists.forEach(tl => copyState[tl.id] = []);
         return copyState;
      }
      case "SET-TASKS":
         return {...state, [action.todolistId]: action.tasks};
      default:
         return state;
   }
}

/**
 * Action Creator
 */
export const removeTaskAC = (taskId: string, todolistId: string) => {
   return {type: 'REMOVE-TASK', taskId, todolistId} as const
}
export const addTaskAC = (task: TaskType) => {
   return {type: 'ADD-TASK', task} as const
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => {
   return {type: 'UPDATE-TASK', todolistId, taskId, model} as const
}
export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
   return {type: 'SET-TASKS', tasks, todolistId} as const
}

/**
 * Thunk Creator
 */
export const fetchTaskTC = (todolistID: string): AppThunkType => async dispatch => {
   dispatch(setAppStatusAC('loading'));
   try {
      const res = await taskAPI.getTasks(todolistID);
      dispatch(setTasksAC(res.data.items, todolistID));
   } catch (err) {
      handleServerNetworkError(err, dispatch)
   } finally {
      dispatch(setAppStatusAC('succeeded'));
   }
}
export const removeTaskTC = (taskId: string, todolistID: string): AppThunkType => async dispatch => {
   dispatch(setAppStatusAC('loading'));
   try {
      const res = await taskAPI.deleteTask(todolistID, taskId);
      if (res.data.resultCode === ResultsCode.OK) {
         dispatch(removeTaskAC(taskId, todolistID));
      } else {
         handleServerAppError(res.data, dispatch);
      }
   } catch (err) {
      handleServerNetworkError(err, dispatch);
   } finally {
      dispatch(setAppStatusAC('succeeded'));
   }
}
export const addTaskTC = (title: string, todolistID: string): AppThunkType => async dispatch => {
   dispatch(setAppStatusAC('loading'));
   try {
      const res = await taskAPI.createTask(todolistID, title);
      if (res.data.resultCode === ResultsCode.OK) {
         dispatch(addTaskAC(res.data.data.item));
      } else {
         handleServerAppError(res.data, dispatch);
      }
   } catch (err) {
      handleServerNetworkError(err, dispatch);
   } finally {
      dispatch(setAppStatusAC('succeeded'));
   }
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunkType =>
   async (dispatch,
          getState) => {
      dispatch(setAppStatusAC('loading'));
      try {
         const state = getState();
         const task = state.tasks[todolistId].find(t => t.id === taskId);
         if (!task) {
            console.warn('Task not found in the state');
            return;
         }
         const apiModel = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
         }
         const res = await taskAPI.updateTask(todolistId, taskId, apiModel)
         if (res.data.resultCode === ResultsCode.OK) {
            dispatch(updateTaskAC(taskId, domainModel, todolistId));
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
 * types
 */
export type TasksStateType = {
   [key: string]: TaskType[]
};
export type TasksActionsType =
   | RemoveTasksActionType
   | TasksTodolistActionType
   | UpdateTaskActionType
   | AddTodolistActionType
   | RemoveTodolistActionType
   | SetTodolistsActionType
   | SetTasksType

type RemoveTasksActionType = ReturnType<typeof removeTaskAC>
type TasksTodolistActionType = ReturnType<typeof addTaskAC>
type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
type SetTasksType = ReturnType<typeof setTasksAC>

type UpdateDomainTaskModelType = {
   title?: string
   description?: string
   status?: TaskStatuses
   priority?: TaskPriorities
   startDate?: string
   deadline?: string
}