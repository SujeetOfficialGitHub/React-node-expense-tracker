import {Container, Navbar, Nav, Button} from 'react-bootstrap'
import {NavLink} from 'react-router-dom';


function Header() {
  return (
    <Navbar expand="lg" className='shadow'>
      <Container>
        <Navbar.Brand href="/" className='logo'>Daily Expenses</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='me-auto'>
                <NavLink className="nav-link font-link" to="/">Home</NavLink>
            </Nav>
            <Nav>
                <NavLink className="nav-link font-link" to="/login">Login</NavLink>
                <NavLink className="nav-link font-link" to="/signup">Signup</NavLink>
                <Button className='font-link'>Logout</Button>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;