import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Routes from './pages/Routes';
import NewPostModal from './components/modal/NewPostModal';

import setAuthToken from './utils/setAuthToken';
import { checkUserToken } from './actions/userActions';

const App = ({ checkUserToken, setAuthToken }) => {
   useEffect(() => {
      checkUserToken();
   }, [checkUserToken]);

   useEffect(() => {
      setAuthToken();
   }, [setAuthToken]);

   return (
      <div className='App'>
         <Routes />
         <NewPostModal />
      </div>
   );
};

const mapDispatchToProps = (dispatch) => ({
   checkUserToken: () => dispatch(checkUserToken()),
   setAuthToken: () => setAuthToken(),
});

export default connect(null, mapDispatchToProps)(App);
