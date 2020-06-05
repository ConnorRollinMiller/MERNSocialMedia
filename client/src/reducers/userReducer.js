import { UserTypes } from '../actions/types';

const initialState = {
   isAuthenticated: false,
   isLoading: false,
   user: null,
   errors: [],
};

export default (state = initialState, action) => {
   const { type, payload } = action;

   switch (type) {
      case UserTypes.USER_LOGIN_START:
      case UserTypes.USER_REGISTER_START:
         return {
            ...state,
            user: null,
            isLoading: true,
            isAuthenticated: false,
         };
      case UserTypes.USER_LOGIN_SUCCESS:
      case UserTypes.USER_REGISTER_SUCCESS:
      case UserTypes.USER_TOKEN_CHECK_SUCCESS:
         return {
            ...state,
            user: payload,
            errors: [],
            isLoading: false,
            isAuthenticated: true,
         };
      case UserTypes.USER_LOGIN_FAILURE:
      case UserTypes.USER_REGISTER_FAILURE:
         return {
            ...state,
            user: null,
            errors: payload,
            isLoading: false,
            isAuthenticated: false,
         };
      case UserTypes.USER_RESET_FORM:
         return {
            ...state,
            user: null,
            errors: [],
            isLoading: false,
            isAuthenticated: false,
         };
      case UserTypes.USER_LOGOUT:
         return {
            ...state,
            user: null,
            isAuthenticated: false,
         };
      default:
         return state;
   }
};
