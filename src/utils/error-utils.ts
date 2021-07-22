import {setAppErrorAC, setAppStatusAC} from "../App/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
   if (data.messages.length) {
      dispatch(setAppErrorAC(data.messages[0]))
   } else {
      dispatch(setAppErrorAC('Some error occurred'))
   }
   dispatch(setAppStatusAC('failed'));
 }

 export const handleServerNetworkError = (err: { message: string}, dispatch: Dispatch) => {
    dispatch(setAppErrorAC(err.message ? err.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'));
 }