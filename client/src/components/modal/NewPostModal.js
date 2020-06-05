import React, { createRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';

import { togglePostModal, createNewPost } from '../../actions/postActions';

import './NewPostModal.css';

const NewPostModal = ({ isPostModalOpen, togglePostModal, createNewPost }) => {
   const textAreaRef = createRef(null);
   const [postText, setPostText] = useState('');

   const handleSubmit = (e) => {
      e.preventDefault();

      createNewPost(postText);
      togglePostModal();
      setPostText('');
   };

   const handleChange = (e) => {
      setPostText(e.target.value);
   };

   const handleFocusOnEnter = () => {
      textAreaRef.current.focus();
   };

   return (
      <Modal
         show={isPostModalOpen}
         onHide={togglePostModal}
         onEntering={handleFocusOnEnter}
         backdrop='static'
         centered
      >
         <Modal.Header closeButton></Modal.Header>
         <Modal.Body>
            <form onSubmit={handleSubmit}>
               <textarea
                  className='col-12 border-0'
                  rows={4}
                  placeholder={`What's Happening?`}
                  ref={textAreaRef}
                  value={postText}
                  onChange={handleChange}
               />
            </form>
         </Modal.Body>
         <Modal.Footer>
            <button className='btn btn-primary' onClick={handleSubmit}>
               Post
            </button>
         </Modal.Footer>
      </Modal>
   );
};

NewPostModal.propTypes = {
   isPostModalOpen: PropTypes.bool.isRequired,
   togglePostModal: PropTypes.func.isRequired,
   createNewPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   isPostModalOpen: state.post.isPostModalOpen,
});

const mapDispatchToProps = (dispatch) => ({
   togglePostModal: () => dispatch(togglePostModal()),
   createNewPost: (text) => dispatch(createNewPost(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPostModal);
