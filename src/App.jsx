
import './App.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Routes } from 'react-router-dom';
import Allroutes from './Routes/Allroutes';

function App() {


  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand >Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} >Home</Nav.Link>
            <Nav.Link as={Link} to="/product">Product</Nav.Link>
            <Nav.Link as={Link} to="/addproduct">devd</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Allroutes />
    </>
  )
}

export default App
