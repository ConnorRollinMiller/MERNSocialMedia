import { PostTypes } from '../actions/types';

const initialState = {
   isPostModalOpen: false,
   posts: [],
   profilePagePosts: [],
   errors: [],
};

export default (state = initialState, action) => {
   const { type, payload } = action;

   switch (type) {
      case PostTypes.TOGGLE_POST_MODAL:
         return {
            ...state,
            isPostModalOpen: !state.isPostModalOpen,
            errors: [],
         };
      case PostTypes.CREATE_NEW_POST_SUCCESS:
         return {
            ...state,
            posts: [payload, ...state.posts],
         };
      case PostTypes.GET_ALL_POSTS_SUCCESS:
         return {
            ...state,
            posts: payload,
            errors: [],
         };
      case PostTypes.GET_ALL_POSTS_FAILURE:
         return {
            ...state,
            errors: payload,
         };
      case PostTypes.CREATE_NEW_POST_FAILURE:
         return {
            ...state,
            errors: payload,
         };
      case PostTypes.GET_USER_POSTS_SUCCESS:
         return {
            ...state,
            profilePagePosts: payload,
            errors: [],
         };
      case PostTypes.GET_USER_POSTS_FAILURE:
         return {
            ...state,
            profilePagePosts: [],
            errors: payload,
         };
      default:
         return state;
   }
};
