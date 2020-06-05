import React from 'react';

const Loading = () => {
   return (
      <main className='page d-flex justify-content-center align-items-center'>
         <div className='spinner-border' role='status'>
            <span className='sr-only'>Loading...</span>
         </div>
      </main>
   );
};

export default Loading;
