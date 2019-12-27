import React from 'react'
import logo from '../../assets/arkademy.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Navbar, Nav, InputGroup, FormControl, Col, Button } from 'react-bootstrap'
class HeadersComp extends React.Component {

    render() {
        return (
            <>
                <Navbar fixed="top" bg="light" expand="lg" >
                    <Navbar.Brand href="/"><img src={logo} alt="Arkademy" style={{ height: "50px" }} /></Navbar.Brand>
                    <Col md="7" className="mt-3">
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1"><FontAwesomeIcon className="mr-auto ml-4" icon={faSearch} /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Col>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" style={{ textSizeAdjust: "10px" }}>
                        <Nav className="mr-auto ml-2 mr-2">
                            <Nav.Link href="/" size="lg" className="mt-2"><FontAwesomeIcon className="mr-auto ml-4" />  Home</Nav.Link>
                            <Nav.Link href="/login" size="lg"> <Button variant="outline-primary" style={{ height: "40px" }}>Login</Button></Nav.Link>
                            <Nav.Link href="/signup" size="lg"><Button variant="outline-primary" style={{ height: "40px" }}>Sign Up</Button></Nav.Link>


                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    }
}
export default HeadersComp

