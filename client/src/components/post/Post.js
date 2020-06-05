import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const Post = ({ text, user, createdAt }) => {
   return (
      <Card as='article' className='rounded-0 mb-2'>
         <Card.Header>
            <Card.Title className='mb-0'>
               <Link to={`/profile/${user.username}`}>@{user.username}</Link>
            </Card.Title>
         </Card.Header>
         <Card.Body>{text}</Card.Body>
         <Card.Footer>
            <Moment format='MM/DD/YYYY HH:mm'>{createdAt}</Moment>
         </Card.Footer>
      </Card>
   );
};

Post.propTypes = {
   text: PropTypes.string.isRequired,
   user: PropTypes.object.isRequired,
   createdAt: PropTypes.string.isRequired,
};

export default Post;
