import React from 'react'
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@material-ui/core'
import {useFormik} from "formik";
import {loginTC} from "./auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../App/store";
import {Redirect} from 'react-router-dom';

export const Login = React.memo(() => {

   const dispatch = useDispatch();

   const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

   const formik = useFormik({
      validate: (values) => {
         if (!values.email) {
            return {
               email: 'Email is required'
            }
         } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            return {
               email: 'Invalid email address'
            }
         }
         if (!values.password) {
            return {
               password: 'Password is required'
            }
         }
      },
      initialValues: {
         email: '',
         password: '',
         rememberMe: false,
      },
      onSubmit: values => {
         dispatch(loginTC(values))
      },
   });

   if (isLoggedIn) {
      return <Redirect to={'/'}/>
   }

   return <Grid container justify="center" alignItems="center" style={{height: '80vh'}}>
         <form onSubmit={formik.handleSubmit}
               style={{backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px'}}>
            <FormControl>
               <FormLabel style={{lineHeight: '24px', fontSize: '18px'}}>
                  <p>To log in get registered
                     <a href={'https://social-network.samuraijs.com/'}
                        rel={'noreferrer'}
                        target={'_blank'}> here
                     </a>
                  </p>
                  <p>or use common test account credentials:</p>
                  <p>Email: free@samuraijs.com</p>
                  <p>Password: free</p>
               </FormLabel>
               <FormGroup>
                  <TextField
                     {...formik.getFieldProps('email')}
                     error={!!formik.errors.email}
                     label="Email"
                     margin="normal"
                  />
                  {formik.errors.email ?
                     <div style={{fontSize: '14px', color: 'red'}}>{formik.errors.email}</div> : null}
                  <TextField
                     {...formik.getFieldProps('password')}
                     error={!!formik.errors.password}
                     type="password"
                     label="Password"
                     margin="normal"
                  />
                  {formik.errors.password ?
                     <div style={{fontSize: '14px', color: 'red'}}>{formik.errors.password}</div> : null}
                  <FormControlLabel
                     label={'Remember me'}
                     control={<Checkbox
                        {...formik.getFieldProps('rememberMe')}
                        checked={formik.values.rememberMe}
                     />}
                  />
                  <Grid container justify="space-between" style={{width: '100%', display: 'flex'}}>
                     <Button style={{width: '220px'}} type={'submit'}
                             variant={'contained'} color={'primary'}>Login</Button>
                     <Button onClick={formik.handleReset} type={'reset'} variant={'contained'}
                             color={'default'}>reset</Button>
                  </Grid>
               </FormGroup>
            </FormControl>
         </form>
   </Grid>
})

