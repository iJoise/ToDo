import {taskAPI, TaskPriorities, TaskStatuses, TaskType} from "../../api/todolists-api";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {AppRootStateType, AppThunkType} from "../../App/store";


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
   try {
      const res = await taskAPI.getTasks(todolistID);
      dispatch(setTasksAC(res.data.items, todolistID));
   } catch (err) {
      console.warn(err);
   }
}
export const removeTaskTC = (taskId: string, todolistID: string): AppThunkType => async dispatch => {
   try {
      await taskAPI.deleteTask(todolistID, taskId);
      dispatch(removeTaskAC(taskId, todolistID));
   } catch (err) {
      console.warn(err);
   }
}
export const addTaskTC = (title: string, todolistID: string): AppThunkType => async dispatch => {
   try {
      const res = await taskAPI.createTask(todolistID, title);
      dispatch(addTaskAC(res.data.data.item));
   } catch (err) {
      console.warn(err);
   }
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunkType =>
   async (dispatch,
          getState: () => AppRootStateType) => {
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
         await taskAPI.updateTask(todolistId, taskId, apiModel)
         dispatch(updateTaskAC(taskId, domainModel, todolistId));
      } catch(err) {
         console.warn(err);
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