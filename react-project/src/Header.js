import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom';
function Header(){
  let history = useNavigate()
  let user = JSON.parse(localStorage.getItem('user-info'))

  function logout(){
    localStorage.clear();
    history('/register')
  }
    return(
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Home</Navbar.Brand>
          <Nav className="me-auto nav-bar-wrapper">
            {
              localStorage.getItem('user-info')?
              <>
              <Link to="/"> Product List</Link>
              <Link to="/add">Add Product</Link>
              <Link to="/update" >Update Product</Link>
              <Link to="/search" >Search Product</Link>
              </>
              :
              <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>

              </>
            }
          </Nav>
          { localStorage.getItem('user-info')}?
        <Nav>
          <NavDropdown className='nav-bar-wrapper' title={ user && user.name}>
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            <NavDropdown.Item>Profile</NavDropdown.Item>
          </NavDropdown>
        </Nav>: " "
        </Container>
      </Navbar>
    )
}
export default Header;