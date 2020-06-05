import axios from 'axios';

import { UserTypes } from './types';

const LOCAL_STORAGE_USER_KEY = 'USER';

const clearUserTokenFromLocalStorage = () => {
   localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
};

const setUserToLocalStorage = (data) => {
   localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(data));
};

const getUserFromLocalStorage = async () => {
   const token = await localStorage.getItem(LOCAL_STORAGE_USER_KEY);

   return JSON.parse(token);
};

export const logoutUser = () => (dispatch) => {
   clearUserTokenFromLocalStorage();
   dispatch({ type: UserTypes.USER_LOGOUT });
};

export const loginUser = (username, password) => async (dispatch) => {
   username = username.trim();
   password = password.trim();

   if (username.length === 0) {
      return dispatch({
         type: UserTypes.USER_LOGIN_FAILURE,
         payload: ['Username is required.'],
      });
   }

   if (password.trim().length === 0) {
      return dispatch({
         type: UserTypes.USER_LOGIN_FAILURE,
         payload: ['Password is required.'],
      });
   }

   if (username.length < 5) {
      return dispatch({
         type: UserTypes.USER_REGISTER_FAILURE,
         payload: ['Credentials are incorrect.'],
      });
   }

   if (password.length < 5) {
      return dispatch({
         type: UserTypes.USER_REGISTER_FAILURE,
         payload: ['Credentials are incorrect.'],
      });
   }

   dispatch({ type: UserTypes.USER_LOGIN_START });

   try {
      const res = await axios.post('/api/users', { username, password });

      setUserToLocalStorage(res.data.token);

      dispatch({ type: UserTypes.USER_LOGIN_SUCCESS, payload: res.data.user });
   } catch (error) {
      console.log(error.response);

      clearUserTokenFromLocalStorage();

      dispatch({
         type: UserTypes.USER_LOGIN_FAILURE,
         payload: error.response.data.errors,
      });
   }
};

export const registerUser = (
   username,
   email,
   password,
   confirmPassword
) => async (dispatch) => {
   username = username.trim();
   email = email.trim();
   password = password.trim();
   confirmPassword = confirmPassword.trim();

   if (username.length === 0) {
      return dispatch({
         type: UserTypes.USER_REGISTER_FAILURE,
         payload: ['Username is required.'],
      });
   }

   if (email.length === 0) {
      return dispatch({
         type: UserTypes.USER_REGISTER_FAILURE,
         payload: ['Email is required.'],
      });
   }

   if (password.length === 0) {
      return dispatch({
         type: UserTypes.USER_REGISTER_FAILURE,
         payload: ['Password is required.'],
      });
   }

   if (username.length < 5) {
      return dispatch({
         type: UserTypes.USER_REGISTER_FAILURE,
         payload: ['Username must be 5 or more characters.'],
      });
   }

   if (password.length < 5) {
      return dispatch({
         type: UserTypes.USER_REGISTER_FAILURE,
         payload: ['Password must be 5 or more characters.'],
      });
   }

   if (password !== confirmPassword) {
      return dispatch({
         type: UserTypes.USER_REGISTER_FAILURE,
         payload: ['Passwords must match.'],
      });
   }

   dispatch({
      type: UserTypes.USER_REGISTER_START,
   });

   try {
      const res = await axios.post('/api/users/register', {
         username,
         email,
         password,
         confirmPassword,
      });

      setUserToLocalStorage(res.data.token);

      dispatch({
         type: UserTypes.USER_REGISTER_SUCCESS,
         payload: res.data.user,
      });
   } catch (error) {
      console.log(error.response);

      clearUserTokenFromLocalStorage();

      dispatch({
         type: UserTypes.USER_REGISTER_FAILURE,
         payload: error.response.data.errors,
      });
   }
};

export const checkUserToken = () => async (dispatch) => {
   try {
      const token = await getUserFromLocalStorage();

      if (!token) {
         return;
      }

      const res = await axios.post('/api/jwt', { token });

      dispatch({
         type: UserTypes.USER_TOKEN_CHECK_SUCCESS,
         payload: res.data.user,
      });
   } catch (error) {
      console.log(error.response);
   }
};

export const resetUserForm = () => (dispatch) => {
   dispatch({ type: UserTypes.USER_RESET_FORM });
};
