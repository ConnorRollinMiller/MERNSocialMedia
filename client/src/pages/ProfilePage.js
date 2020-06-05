import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Header from '../components/header/Header';
import PostList from '../components/post/PostList';

import { getAllPostsByUsername } from '../actions/postActions';

const ProfilePage = ({ getAllPostsByUsername }) => {
   const { username } = useParams();

   useEffect(() => {
      getAllPostsByUsername(username);
   });

   return (
      <Fragment>
         <Header />
         <Container as='main' className='py-4'>
            <Row className='mb-4'>
               <Col>
                  <h2>@{username}</h2>
               </Col>
               <Col className='text-right'>
                  <Link to=''>
                     <Button variant='outline-primary'>Edit Profile</Button>
                  </Link>
               </Col>
            </Row>
            <PostList isProfilePagePosts={true} />
         </Container>
      </Fragment>
   );
};

ProfilePage.propTypes = {
   getAllPostsByUsername: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
   getAllPostsByUsername: (username) =>
      dispatch(getAllPostsByUsername(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
