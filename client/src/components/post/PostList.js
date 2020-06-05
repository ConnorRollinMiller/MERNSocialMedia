import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { togglePostModal } from '../../actions/postActions';

import Post from './Post';

const PostList = ({
   posts,
   profilePagePosts,
   togglePostModal,
   isProfilePagePosts = false,
}) => {
   return (
      <Row className='flex-column justify-content-center'>
         {isProfilePagePosts ? (
            profilePagePosts.length > 0 ? (
               profilePagePosts.map((post) => (
                  <Col key={post._id}>
                     <Post {...post} />
                  </Col>
               ))
            ) : (
               <NoPosts togglePostModal={togglePostModal} />
            )
         ) : posts.length > 0 ? (
            posts.map((post) => (
               <Col key={post._id}>
                  <Post {...post} />
               </Col>
            ))
         ) : (
            <NoPosts togglePostModal={togglePostModal} />
         )}
      </Row>
   );
};

const NoPosts = ({ togglePostModal }) => {
   return (
      <React.Fragment>
         <Col>
            <h3 className='text-center'>There are no posts to show.</h3>
         </Col>
         <Col className='text-center'>
            <Button onClick={togglePostModal}>Create New Post</Button>
         </Col>
      </React.Fragment>
   );
};

PostList.propTypes = {
   posts: PropTypes.array.isRequired,
   togglePostModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
   posts: state.post.posts,
   profilePagePosts: state.post.profilePagePosts,
   isProfilePagePosts: ownProps.isProfilePagePosts,
});

const mapDispatchToProps = (dispatch) => ({
   togglePostModal: () => dispatch(togglePostModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
