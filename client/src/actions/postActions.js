import axios from 'axios';

import { PostTypes } from './types';

export const togglePostModal = () => (dispatch) => {
   dispatch({ type: PostTypes.TOGGLE_POST_MODAL });
};

export const createNewPost = (text) => async (dispatch) => {
   console.log('here');
   if (text.trim().length === 0) {
      return dispatch({
         type: PostTypes.CREATE_NEW_POST_FAILURE,
         payload: `Post text is required.`,
      });
   }
   try {
      const res = await axios.post('/api/posts', { text });

      console.log(res);

      dispatch({
         type: PostTypes.CREATE_NEW_POST_SUCCESS,
         payload: res.data.newPost,
      });
   } catch (error) {
      console.log(error.response);

      dispatch({
         type: PostTypes.CREATE_NEW_POST_FAILURE,
         payload: error.response.data.errors,
      });
   }
};

export const getAllPosts = () => async (dispatch) => {
   try {
      const res = await axios.get('/api/posts');

      dispatch({
         type: PostTypes.GET_ALL_POSTS_SUCCESS,
         payload: res.data.posts,
      });
   } catch (error) {
      console.log(error.response);
      dispatch({
         type: PostTypes.GET_ALL_POSTS_FAILURE,
         payload: error.response.data.errors,
      });
   }
};

export const getAllPostsByUsername = (username) => async (dispatch) => {
   try {
      const res = await axios.get(`/api/posts/${username}`);

      console.log(res);

      dispatch({
         type: PostTypes.GET_USER_POSTS_SUCCESS,
         payload: res.data.userPosts,
      });
   } catch (error) {
      console.log(error.response);

      dispatch({
         type: PostTypes.GET_USER_POSTS_FAILURE,
         payload: error.response.data.errors,
      });
   }
};
