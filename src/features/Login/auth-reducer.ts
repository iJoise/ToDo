import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {setAppStatusAC} from "../../App/app-reducer";
import {authAPI, LoginParamsType, ResultsCode} from "../../api/todolists-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunkType} from "../../App/store";

const initialState = {
   isLoggedIn: false
}

const authSlice = createSlice({
   name: 'auth',
   initialState: initialState,
   reducers: {
      setIsLoggedInAC: (state, action: PayloadAction<ActionPayloadType>) => {
         state.isLoggedIn = action.payload.value
      },
   },
})
export const authReducer = authSlice.reducer;
export const {setIsLoggedInAC} = authSlice.actions;
/**
 * Thunk Creator
 */
export const loginTC = (data: LoginParamsType): AppThunkType => async dispatch  => {
   dispatch(setAppStatusAC({status: 'loading'}));
   try {
      const res = await authAPI.auth(data);
      if (res.data.resultCode === ResultsCode.OK) {
         dispatch(setIsLoggedInAC({value: true}));
      } else {
         handleServerAppError(res.data, dispatch);
      }
   } catch (err) {
      handleServerNetworkError(err, dispatch);
   } finally {
      dispatch(setAppStatusAC({status: 'succeeded'}));
   }
};
export const logoutTC = ():AppThunkType => async dispatch => {
   dispatch(setAppStatusAC({status: 'loading'}));
   try {
      const res = await authAPI.logout()
      if (res.data.resultCode === ResultsCode.OK) {
         dispatch(setIsLoggedInAC({value: false}));
      } else {
         handleServerAppError(res.data, dispatch);
      }
   } catch (err) {
      handleServerNetworkError(err, dispatch);
   } finally {
      dispatch(setAppStatusAC({status: 'succeeded'}));
   }
}
/**
 * Types
 */
type ActionPayloadType = {
   value: boolean
}