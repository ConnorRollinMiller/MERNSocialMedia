import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ isAuthenticated, component: Component, otherProps }) => {
   return (
      <Route
         {...otherProps}
         render={() => (isAuthenticated ? <Redirect to='/' /> : <Component />)}
      />
   );
};

PublicRoute.propTypes = {
   isAuthenticated: PropTypes.bool.isRequired,
   component: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
   isAuthenticated: state.user.isAuthenticated,
   Component: ownProps.component,
});

export default connect(mapStateToProps)(PublicRoute);
