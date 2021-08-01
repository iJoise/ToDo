import {ResultsCode, taskAPI, TaskPriorities, TaskStatuses, TaskType} from "../../api/todolists-api";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {AppThunkType} from "../../App/store";
import {setAppStatusAC} from "../../App/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: TasksStateType = {}

const taskSlice = createSlice({
   name: 'tasks',
   initialState,
   reducers: {
      removeTaskAC: (state, action: PayloadAction<RemoveTaskPayloadType>) => {
         const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId);
         state[action.payload.todolistId].splice(index, 1);
      },
      addTaskAC: (state, action: PayloadAction<AddTaskPayloadType>) => {
         state[action.payload.task.todoListId].unshift(action.payload.task);
      },
      updateTaskAC: (state, action: PayloadAction<UpdateTaskPayloadType>) => {
         const task = state[action.payload.todolistId];
         const index = task.findIndex(t => t.id === action.payload.taskId);
         task[index] = {...task[index], ...action.payload.model};
      },
      setTasksAC: (state, action: PayloadAction<SetTasksPayloadType>) => {
         state[action.payload.todolistId] = action.payload.tasks;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(addTodolistAC, (state, action) => {
         state[action.payload.todolist.id] = [];
      });
      builder.addCase(removeTodolistAC, (state, action) => {
         delete state[action.payload.todolistId];
      });
      builder.addCase(setTodolistsAC, (state, action) => {
         action.payload.todolists.forEach(tl => state[tl.id] = []);
      });
   }
})

export const tasksReducer = taskSlice.reducer
export const {
   removeTaskAC,
   addTaskAC,
   updateTaskAC,
   setTasksAC} = taskSlice.actions;
// /**
//  * Action Creator
//  */
// export const removeTaskAC = (taskId: string, todolistId: string) => {
//    return {type: 'REMOVE-TASK', taskId, todolistId} as const
// }
// export const addTaskAC = (task: TaskType) => {
//    return {type: 'ADD-TASK', task} as const
// }
// export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => {
//    return {type: 'UPDATE-TASK', todolistId, taskId, model} as const
// }
// export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
//    return {type: 'SET-TASKS', tasks, todolistId} as const
// }
/**
 * Thunk Creator
 */
export const fetchTaskTC = (todolistId: string): AppThunkType => async dispatch => {
   dispatch(setAppStatusAC({status: 'loading'}));
   try {
      const res = await taskAPI.getTasks(todolistId);
      dispatch(setTasksAC({tasks: res.data.items, todolistId}));
   } catch (err) {
      handleServerNetworkError(err, dispatch)
   } finally {
      dispatch(setAppStatusAC( {status: 'succeeded'}));
   }
}
export const removeTaskTC = (taskId: string, todolistId: string): AppThunkType => async dispatch => {
   dispatch(setAppStatusAC({status: 'loading'}));
   try {
      const res = await taskAPI.deleteTask(todolistId, taskId);
      if (res.data.resultCode === ResultsCode.OK) {
         dispatch(removeTaskAC({taskId, todolistId}));
      } else {
         handleServerAppError(res.data, dispatch);
      }
   } catch (err) {
      handleServerNetworkError(err, dispatch);
   } finally {
      dispatch(setAppStatusAC({status: 'succeeded'}));
   }
}
export const addTaskTC = (title: string, todolistID: string): AppThunkType => async dispatch => {
   dispatch(setAppStatusAC({status: 'loading'}));
   try {
      const res = await taskAPI.createTask(todolistID, title);
      if (res.data.resultCode === ResultsCode.OK) {
         dispatch(addTaskAC({task: res.data.data.item}));
      } else {
         handleServerAppError(res.data, dispatch);
      }
   } catch (err) {
      handleServerNetworkError(err, dispatch);
   } finally {
      dispatch(setAppStatusAC({status: 'succeeded'}));
   }
}
export const updateTaskTC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): AppThunkType =>
   async (dispatch,
          getState) => {
      dispatch(setAppStatusAC({status: 'loading'}));
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
            ...model
         }
         const res = await taskAPI.updateTask(todolistId, taskId, apiModel)
         if (res.data.resultCode === ResultsCode.OK) {
            dispatch(updateTaskAC({taskId, model, todolistId}));
         } else {
            handleServerAppError(res.data, dispatch)
         }
      } catch (err) {
         handleServerNetworkError(err, dispatch)
      } finally {
         dispatch(setAppStatusAC({status: 'succeeded'}));
      }
   }

/**
 * types
 */
type RemoveTaskPayloadType = {taskId: string, todolistId: string}
type AddTaskPayloadType = {task: TaskType}
type UpdateTaskPayloadType = {taskId: string, model: UpdateDomainTaskModelType, todolistId: string}
type SetTasksPayloadType = {tasks: TaskType[], todolistId: string}

export type TasksStateType = {
   [key: string]: TaskType[]
};
export type TasksActionsType =
   | RemoveTasksActionType
   | TasksTodolistActionType
   | UpdateTaskActionType
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