import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {setAppStatusAC} from "../../App/app-reducer";
import {authAPI, LoginParamsType, ResultsCode} from "../../api/todolists-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";


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
export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch) => {
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

export const logoutTC = () => async (dispatch: Dispatch) => {
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

type ActionPayloadType = {
   value: boolean
}