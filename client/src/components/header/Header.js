import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { togglePostModal } from '../../actions/postActions';
import { logoutUser } from '../../actions/userActions';

const Header = ({ togglePostModal, logoutUser, user: { username } }) => {
   const { pathname } = useLocation();

   return (
      <NavBar as='header' bg='primary' variant='dark'>
         <Container>
            <NavBar.Brand>
               <Link className='navbar-brand' to='/' replace={'/' === pathname}>
                  Social Media App
               </Link>
            </NavBar.Brand>
            <Nav className='ml-auto'>
               <NavDropdown
                  title={
                     <FontAwesomeIcon className='text-white' icon={faUser} />
                  }
               >
                  <Link className='text-center' to={`/profile/${username}`}>
                     <NavDropdown.Item className='text-primary' as='div'>
                        @{username}
                     </NavDropdown.Item>
                  </Link>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                     <Button block variant='danger' onClick={logoutUser}>
                        Logout
                     </Button>
                  </NavDropdown.Item>
               </NavDropdown>
               <Nav.Item>
                  <Nav.Link className='text-white' onClick={togglePostModal}>
                     <FontAwesomeIcon icon={faPlus} />
                  </Nav.Link>
               </Nav.Item>
            </Nav>
         </Container>
      </NavBar>
   );
};

Header.propTypes = {
   togglePostModal: PropTypes.func.isRequired,
   logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
   togglePostModal: () => dispatch(togglePostModal()),
   logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
