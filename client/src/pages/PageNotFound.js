import React from 'react';
import Container from 'react-bootstrap/Container';

const PageNotFound = () => {
   return (
      <Container
         as='main'
         className='page d-flex align-items-center justify-content-center'
      >
         <h1 className='display-4 text-center'>
            404:
            <br />
            Page Not Found
         </h1>
      </Container>
   );
};

export default PageNotFound;
