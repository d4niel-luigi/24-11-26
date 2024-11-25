import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';

export const NavigationBar = () => {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Tabletek</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Link to="/">Home</Link>
          </Navbar.Text>
          <Navbar.Text style={{marginLeft: "2rem"}}>
            <Link to="/tabletlist">Tablet List</Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
};