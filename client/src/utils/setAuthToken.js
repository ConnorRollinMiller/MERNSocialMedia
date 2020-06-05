import axios from 'axios';

const LOCAL_STORAGE_USER_KEY = 'USER';

const setAuthToken = async () => {
   const token = await JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY));

   if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
   } else {
      delete axios.defaults.headers.common['x-auth-token'];
   }
};

export default setAuthToken;
