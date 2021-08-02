import {ResultsCode, todolistsAPI, TodolistType} from "../../api/todolists-api";
import {AppThunkType} from "../../App/store";
import {RequestStatusType, setAppStatusAC} from "../../App/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: TodolistDomainType[] = [];

const todolistsSlice = createSlice({
   name: 'todolists',
   initialState,
   reducers: {
      removeTodolistAC: (state, action: PayloadAction<RemoveTodolistPayloadType>) => {
         const index = state.findIndex(tl => tl.id === action.payload.todolistId);
         state.splice(index, 1);
      },
      addTodolistAC: (state, action: PayloadAction<AddTodolistPayloadType>) => {
         state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"});
      },
      changeTodolistTitleAC: (state, action: PayloadAction<ChangeTodolistTitlePayloadType>) => {
         const index = state.findIndex(tl => tl.id === action.payload.todolistId);
         state[index].title = action.payload.title;
      },
      changeTodolistFilterAC: (state, action: PayloadAction<ChangeTodolistFilterPayloadType>) => {
         const index = state.findIndex(tl => tl.id === action.payload.todolistId);
         state[index].filter = action.payload.filter;
      },
      changeTodolistEntityStatusAC: (state, action: PayloadAction<ChangeTodolistEntityStatusPayloadType>) => {
         const index = state.findIndex(tl => tl.id === action.payload.todolistId);
         state[index].entityStatus = action.payload.status;
      },
      setTodolistsAC: (state, action: PayloadAction<SetTodolistsPayloadType>) => {
         return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}));
      }
   }
})

export const todolistsReducer = todolistsSlice.reducer;
export const {
   removeTodolistAC,
   addTodolistAC,
   changeTodolistTitleAC,
   changeTodolistFilterAC,
   changeTodolistEntityStatusAC,
   setTodolistsAC,
} = todolistsSlice.actions;

/**
 * Thunk Creator
 */
export const fetchTodolistsTC = (): AppThunkType => async dispatch => {
   dispatch(setAppStatusAC({status: 'loading'}));
   try {
      const res = await todolistsAPI.getTodolist();
      dispatch(setTodolistsAC({todolists: res.data}));
   } catch (err) {
      handleServerNetworkError(err, dispatch)
   } finally {
      dispatch(setAppStatusAC({status: 'succeeded'}));
   }
}
export const addTodolistTC = (title: string): AppThunkType => async dispatch => {
   dispatch(setAppStatusAC({status: 'loading'}));
   try {
      const res = await todolistsAPI.createTodolist(title);
      if (res.data.resultCode === ResultsCode.OK) {
         dispatch(addTodolistAC({todolist: res.data.data.item}));
      } else {
         handleServerAppError(res.data, dispatch)
      }
   } catch (err) {
      handleServerNetworkError(err, dispatch)
   } finally {
      dispatch(setAppStatusAC({status: 'succeeded'}));
   }
}
export const removeTodolistTC = (todolistId: string): AppThunkType => async dispatch => {
   dispatch(setAppStatusAC({status: 'loading'}));
   dispatch(changeTodolistEntityStatusAC({todolistId, status: 'loading'}));
   try {
      const res = await todolistsAPI.deleteTodolist(todolistId);
      if (res.data.resultCode === ResultsCode.OK) {
         dispatch(removeTodolistAC({todolistId: todolistId}));
      } else {
         handleServerAppError(res.data, dispatch)
      }
   } catch (err) {
      handleServerNetworkError(err, dispatch)
   } finally {
      dispatch(setAppStatusAC({status: 'succeeded'}));
   }
}
export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunkType => async dispatch => {
   dispatch(setAppStatusAC({status: 'loading'}));
   try {
      const res = await todolistsAPI.updateTodolistTitle(todolistId, title);
      if (res.data.resultCode === ResultsCode.OK) {
         dispatch(changeTodolistTitleAC({todolistId, title}));
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
 * Types
 */
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
   filter: FilterValuesType
   entityStatus: RequestStatusType
}

export type RemoveTodolistPayloadType = { todolistId: string }
export type AddTodolistPayloadType = { todolist: TodolistType }
type ChangeTodolistTitlePayloadType = { todolistId: string, title: string }
type ChangeTodolistFilterPayloadType = { todolistId: string, filter: FilterValuesType }
type ChangeTodolistEntityStatusPayloadType = { todolistId: string, status: RequestStatusType }
export type SetTodolistsPayloadType = { todolists: TodolistType[] }



