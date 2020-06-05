import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, component: Component, ...props }) => {
   return (
      <Route
         {...props}
         render={() =>
            isAuthenticated ? <Component /> : <Redirect to='/login' />
         }
      />
   );
};

PrivateRoute.propTypes = {
   isAuthenticated: PropTypes.bool.isRequired,
   component: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
   isAuthenticated: state.user.isAuthenticated,
   component: ownProps.component,
});

export default connect(mapStateToProps)(PrivateRoute);
