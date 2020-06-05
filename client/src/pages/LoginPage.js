import React from 'react';
import Container from 'react-bootstrap/Container';

import LoginForm from '../components/forms/LoginForm';

const LoginPage = () => {
   return (
      <Container as='main' className='page d-flex align-items-center'>
         <LoginForm />
      </Container>
   );
};

export default LoginPage;
