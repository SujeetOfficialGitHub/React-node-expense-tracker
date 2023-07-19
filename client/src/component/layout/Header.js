import {Container, Navbar, Nav, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom';
import { logout } from '../../store/features/authSlice';
import PaymentForm from '../common/PaymentForm';
import { decodeToken } from 'react-jwt';
import { resetExpensesState } from '../../store/features/expenseSlice';


function Header() {
  const {isLoggedIn, token} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(resetExpensesState())
    dispatch(logout())
  }
  const decodedToken = decodeToken(token)
  const isPremium = decodedToken && decodedToken.isPremium




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
                {isLoggedIn && isPremium && <NavLink className="nav-link font-link" to="/leaderboard">Leaderboard</NavLink>}
                {isLoggedIn && !isPremium && <PaymentForm />} <span className='m-1'></span>
                {isLoggedIn && <Button onClick={logoutHandler} className='font-link'>Logout</Button>}
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;