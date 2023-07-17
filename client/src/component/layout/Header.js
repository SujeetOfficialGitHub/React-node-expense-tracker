import {Container, Navbar, Nav, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom';
import { logout } from '../../store/features/authSlice';


function Header() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <Navbar expand="lg" className='shadow'>
      <Container>
        <Navbar.Brand href="/" className='logo'>Daily Expenses</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='me-auto'>
                {isLoggedIn && <NavLink className="nav-link font-link" to="/">Home</NavLink>}
            </Nav>
            <Nav>
                {!isLoggedIn && <NavLink className="nav-link font-link" to="/login">Login</NavLink>}
                {!isLoggedIn && <NavLink className="nav-link font-link" to="/signup">Signup</NavLink>}
                {isLoggedIn && <Button onClick={logoutHandler} className='font-link'>Logout</Button>}
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;