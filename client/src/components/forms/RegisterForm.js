import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUser, resetUserForm } from '../../actions/userActions';

const RegisterForm = ({ errors, isLoading, registerUser, resetUserForm }) => {
   const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
   });

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      registerUser(
         formData.username,
         formData.email,
         formData.password,
         formData.confirmPassword
      );
   };

   useEffect(() => {
      resetUserForm();
   }, [resetUserForm]);

   return (
      <form className='col-6 mx-auto' onSubmit={handleSubmit}>
         <h1 className='text-center mb-4'>Register</h1>
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
               type='email'
               placeholder='Email'
               name='email'
               onChange={handleChange}
               value={formData.email}
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
         <div className='form-group'>
            <input
               className='form-control'
               type='password'
               placeholder='Confirm Password'
               name='confirmPassword'
               onChange={handleChange}
               value={formData.confirmPassword}
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
            <small className='text-center'>
               Already have an account? <Link to='/login'>Click Here</Link>
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

RegisterForm.propTypes = {
   errors: PropTypes.array.isRequired,
   isLoading: PropTypes.bool.isRequired,
   registerUser: PropTypes.func.isRequired,
   resetUserForm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   isLoading: state.user.isLoading,
   errors: state.user.errors,
});

const mapDispatchToProps = (dispatch) => ({
   resetUserForm: () => dispatch(resetUserForm()),
   registerUser: (username, email, password, confirmPassword) =>
      dispatch(registerUser(username, email, password, confirmPassword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
