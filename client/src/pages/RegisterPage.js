import React from 'react';
import Container from 'react-bootstrap/Container';

import RegisterForm from '../components/forms/RegisterForm';

const RegisterPage = () => {
   return (
      <Container as='main' className='page d-flex align-items-center'>
         <RegisterForm />
      </Container>
   );
};

export default RegisterPage;
