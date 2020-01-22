import React from 'react'
import logo from '../../assets/arkademy.png'
// import axios from 'axios'
import swal from 'sweetalert'
import jwtDecode from 'jwt-decode'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots, faSignOutAlt, faUserCircle, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Navbar, Nav, InputGroup, FormControl, Col, NavDropdown } from 'react-bootstrap'
import { fetchCompanies, fetchDetailCompanies } from '../../public/redux/actions/companies'
class HeadersComp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            companies: [],
            // companiesName: '',
            isLoading: false,
            id: '',
            username: ''
        }

    }
    onSearch = e => {
        const val = e.target.value
        this.props.fetch(val, 1, 10, 'DESC', 'Name')
    }
    componentDidMount() {
        const token = localStorage.getItem("token")
        const decoded = jwtDecode(token)
        console.log(token);

        this.setState({
            id: decoded.dataId
        })
        this.props.fetchDetail(decoded.dataId).then(() => {
            this.props.company.detailCompanies.map((item) => {
                return this.setState({
                    username: item.Name
                })
            })
        })
        this.props.fetch('', 1, 10, 'DESC', 'Name')
    }
    getLogout = () => {

        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    localStorage.removeItem('token')
                    this.props.history.push('/')
                }
            })
    }
    onSelect = v => { };
    render() {
        const { companies, isLoading } = this.state
        return (
            <>
                <Navbar fixed="top" bg="light" expand="lg" >
                    <Navbar.Brand href="/companies"><img src={logo} alt="Arkademy" style={{ height: "50px" }} /></Navbar.Brand>
                    <Col md="7" className="mt-3">
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1"><FontAwesomeIcon className="mr-auto ml-4" icon={faSearch} /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="basic-addon1"
                                // value={companiesName} 
                                onChange={this.onSearch}
                                onSelect={this.onSelect}
                            />
                        </InputGroup>
                    </Col>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" style={{ textSizeAdjust: "10px" }}>
                        <Nav className="mr-auto ml-2 mr-2">
                            <NavDropdown title="Home" id="nav-dropdown">
                                <NavDropdown.Item eventKey="4.1" href="/engineers">Engineers</NavDropdown.Item>
                                <NavDropdown.Item eventKey="4.2" href="/companies">Companies</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href={`/companyprofiles/${this.state.id}`} size="lg"><FontAwesomeIcon className="mr-auto ml-4" icon={faUserCircle} /> {this.state.username.split(" ")[0]}</Nav.Link>
                            <div className="mt-2 ml-3" style={{ height: "30px", width: "1px", border: "1 px solid #2F4F4F", backgroundColor: "#2F4F4F" }}></div>
                            <Nav.Link href="#" size="lg"><FontAwesomeIcon className="mr-auto ml-4" icon={faCommentDots} /></Nav.Link>
                            <Nav.Link href="#" size="lg" onClick={this.getLogout}><FontAwesomeIcon className="mr-auto ml-4" icon={faSignOutAlt} /></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div>
                    <ul>
                        {isLoading && <p>Loading...</p>}
                        {!isLoading && companies}
                    </ul>
                </div>
            </>
        )
    }
}
const mapStateToProps = state => ({
    companies: state.companies,
    company: state.detailCompanies
})

const mapDispatchToProps = dispatch => ({
    fetch: (search, page, limit, sort, sortBy) => dispatch(fetchCompanies(search, page, limit, sort, sortBy)),
    fetchDetail: id => dispatch(fetchDetailCompanies(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeadersComp))

