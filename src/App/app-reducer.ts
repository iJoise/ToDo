import {AppThunkType} from "./store";
import {authAPI, ResultsCode} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";


const initialState: InitialStateType = {
   status: 'idle',
   error: null,
   initialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
   switch (action.type) {
      case 'APP/SET-STATUS':
         return {...state, status: action.status};
      case 'APP/SET-ERROR':
         return {...state, error: action.error};
      case "APP/SET-IS-INITIALIZED":
         return {...state, initialized: action.value};
      default:
         return state;
   }
}


export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const);

export const initializedAppTC = (): AppThunkType => async dispatch => {
   try {
      const res = await authAPI.me()
      dispatch(setAppInitializedAC(true));
      if (res.data.resultCode === ResultsCode.OK) {
         dispatch(setIsLoggedInAC(true))
      } else {
         handleServerAppError(res.data, dispatch)
      }
   } catch (err) {
      handleServerNetworkError(err, dispatch);
   }
}


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
   status: RequestStatusType
   error: string | null
   initialized: boolean
}
export type AppActionType =
   | ReturnType<typeof setAppStatusAC>
   | ReturnType<typeof setAppErrorAC>
   | ReturnType<typeof setAppInitializedAC>