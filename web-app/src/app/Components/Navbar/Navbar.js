import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import logo from './logo3.png';
import './Navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faUpload, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const NavBarComponent = (props) => {
  const { location } = useLocation();
  const [searchParam, setSearchParam] = useState(undefined);

  return (
    <div>
      <Navbar className="navHeader" sticky="top" bg="light" variant="light">
        <Container className="content-body">
          <Navbar.Brand href="#home" className="App-logo">
            <img
              alt=""
              src={logo}
              width="150"
              height="50"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />

          <Navbar.Collapse id="navbarScroll">

            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "50px" }}
              navbarScroll
            >

              {props.currentUser && props.currentUser.isAuthenticated ? <><Nav.Link as={Link} to="/">Home</Nav.Link>

                <Nav.Link as={Link} to="/job-tracker">Tracker</Nav.Link>

                <Nav.Link as={Link} to="/jobs" className="findJobs" >Find Jobs</Nav.Link>
                <Form className="d-flex">
                  <FormControl
                    type="search"
                    placeholder="search"
                    className="me-2"
                    aria-label="Search"
                    value={searchParam}
                    onChange={(ev)=>{setSearchParam(ev.target.value)}}
                  />
                  <Button variant="outline-success" onClick={() =>props.navigateCatalog(searchParam)}>Search</Button>
                </Form>

                <FontAwesomeIcon icon={faUserCircle} size="2x"></FontAwesomeIcon>
                <NavDropdown className="navdropdown" title={props.currentUser.firstName} id="navbarScrollingDropdown">
                  <NavDropdown.Item as={Link} to="/personalinfo">Personal Info
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/job-post">Job Posting
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/myjobs">My Jobs
                  </NavDropdown.Item>
                </NavDropdown> </> : <> <Nav.Link
                  as={Link} to="/login">Login
                </Nav.Link> </>}

               <a onClick={props.logout}> <FontAwesomeIcon icon={faSignOutAlt} size="2x" ></FontAwesomeIcon></a>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBarComponent