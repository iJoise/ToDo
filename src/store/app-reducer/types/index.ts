import {setAppErrorAC, setAppInitializedAC, setAppStatusAC} from "../actions";

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
