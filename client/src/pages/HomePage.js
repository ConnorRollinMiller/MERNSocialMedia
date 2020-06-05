import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';

import Header from '../components/header/Header';

import { getAllPosts } from '../actions/postActions';
import PostList from '../components/post/PostList';

const HomePage = ({ getAllPosts }) => {
   useEffect(() => {
      getAllPosts();
   }, [getAllPosts]);

   return (
      <div className='page'>
         <Header />
         <Container as='main' className='py-4'>
            <PostList />
         </Container>
      </div>
   );
};

HomePage.propTypes = {
   getAllPosts: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
   getAllPosts: () => dispatch(getAllPosts()),
});

export default connect(null, mapDispatchToProps)(HomePage);
