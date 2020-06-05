import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser, resetUserForm } from '../../actions/userActions';

const LoginForm = ({ errors, isLoading, loginUser, resetUserForm }) => {
   const [formData, setFormData] = useState({ username: '', password: '' });

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      loginUser(formData.username, formData.password);
   };

   useEffect(() => {
      resetUserForm();
   }, [resetUserForm]);

   return (
      <form className='col-6 mx-auto' onSubmit={handleSubmit}>
         <h1 className='text-center mb-4'>Log In</h1>
         <div className='form-group'>
            <input
               className='form-control'
               type='text'
               placeholder='Username'
               name='username'
               onChange={handleChange}
               value={formData.username}
            />
         </div>
         <div className='form-group'>
            <input
               className='form-control'
               type='password'
               placeholder='Password'
               name='password'
               onChange={handleChange}
               value={formData.password}
            />
         </div>
         <button
            className='btn btn-block btn-primary my-4'
            disabled={isLoading}
         >
            {isLoading ? (
               <div className='spinner-border' role='status'>
                  <span className='sr-only'>Loading...</span>
               </div>
            ) : (
               `Submit`
            )}
         </button>
         <div className='col-12 text-center'>
            <small>
               Don't have an account? <Link to='/register'>Click Here</Link>
            </small>
         </div>
         {errors.length > 0 &&
            errors.map((error, i) => (
               <div key={i} className='alert alert-danger text-center mt-4'>
                  {error}
               </div>
            ))}
      </form>
   );
};

LoginForm.propTypes = {
   errors: PropTypes.array.isRequired,
   isLoading: PropTypes.bool.isRequired,
   loginUser: PropTypes.func.isRequired,
   resetUserForm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   isLoading: state.user.isLoading,
   errors: state.user.errors,
});

const mapDispatchToProps = (dispatch) => ({
   resetUserForm: () => dispatch(resetUserForm()),
   loginUser: (username, password) => dispatch(loginUser(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
