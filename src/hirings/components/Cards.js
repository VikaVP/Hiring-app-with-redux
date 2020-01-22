import React from 'react'
// import axios from 'axios'
import logo from '../../assets/arkademy.png'
import swal from 'sweetalert'
import jwtDecode from 'jwt-decode'
import { connect } from 'react-redux'
import { SemipolarLoading } from 'react-loadingg'
import { Card, Dropdown, DropdownButton, Navbar, Nav, InputGroup, FormControl, Col, Pagination, NavDropdown } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpen, faHandHoldingUsd, faCommentDots, faSignOutAlt, faUserCircle, faSearch } from '@fortawesome/free-solid-svg-icons'
import { fetchEngineers, fetchDetailEngineers } from '../../public/redux/actions/engineers'
class Cards extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // search: '',
            // posts: [],
            // limits: 10,
            // sortBy: 'Name',
            // sort: 'DESC',
            // page: [],
            engineers: [],
            engineersName: '',
            isLoading: false,
            id: '',
            username: ''
        }
        this.prevPage = this.prevPage.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.handleSort = this.handleSort.bind(this)
        this.handleOrderBy = this.handleOrderBy.bind(this)
        this.handleLimit = this.handleLimit.bind(this)
    }
    handleSort(value) {
        this.props.fetch('', 1, 10, value, 'Name')
    }
    handleOrderBy(value) {
        this.props.fetch('', 1, 10, 'DESC', value)
    }
    handleLimit(value) {
        this.props.fetch('', 1, value, 'DESC', 'Name')
    }
    onSearch = e => {
        const val = e.target.value
        console.log(e.target.value);
        this.props.fetch(val, 1, 10, 'DESC', 'Name')
    }
    componentDidMount() {
        const token = localStorage.getItem("token")
        const decoded = jwtDecode(token)
        console.log(decoded);
        this.setState({
            id: decoded.dataId
        })
        this.props.fetchDetail(decoded.dataId).then(() => {
            this.props.engineer.detailEngineers.map((item) => {
                return this.setState({
                    username: item.Name
                })
            })
        })
        this.props.fetch('', 1, 10, 'DESC', 'Name')

    }
    nextPage = () => {
        this.props.fetch('', parseInt(this.props.engineers.page.page) + 1, 10, 'DESC', 'Name')
    }
    prevPage = () => {
        this.props.fetch('', parseInt(this.props.engineers.page.page) - 1, 10, 'DESC', 'Name')
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

    render() {
        const { isLoading } = this.state
        setTimeout(
            function () {
                this.setState({ isLoading: true });
            }
                .bind(this),
            2000
        );
        return (
            <><Navbar fixed="top" bg="light" expand="lg" >
                <Navbar.Brand href="/engineers"><img src={logo} alt="Arkademy" style={{ height: "50px" }} /></Navbar.Brand>
                <Col md="7" className="mt-3">
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1"><FontAwesomeIcon className="mr-auto ml-4" icon={faSearch} /></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="basic-addon1"
                            name="engineersName"
                            // value={engineersName}
                            onChange={this.onSearch}
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
                        <Nav.Link size="lg" href={`/myprofile/${this.state.id}`}><FontAwesomeIcon className="mr-auto ml-4" icon={faUserCircle} /> {this.state.username.split(' ')[0]}</Nav.Link>
                        <div className="mt-2 ml-3" style={{ height: "30px", width: "1px", border: "1 px solid #2F4F4F", backgroundColor: "#2F4F4F" }}></div>
                        <Nav.Link href="#" size="lg"><FontAwesomeIcon className="mr-auto ml-4" icon={faCommentDots} /></Nav.Link>
                        <Nav.Link size="lg" onClick={this.getLogout}><FontAwesomeIcon className="mr-auto ml-4" icon={faSignOutAlt} /></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

                <Dropdown style={{ marginLeft: "10px", marginTop: "100px", width: "140px", display: "inline-block" }}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        ORDER BY
             </Dropdown.Toggle>
                    <Dropdown.Menu style={{ textSizeAdjust: "10px", fontFamily: `'Tajawal', sans-serif` }}>
                        <Dropdown.Item onClick={() => this.handleOrderBy("Name")}>Name</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.handleOrderBy("Skill")}>Skill</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.handleOrderBy("date_update")}>Date Updated</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown style={{ marginLeft: "10px", marginTop: "50px", width: "140px", display: "inline-block" }}>
                    <DropdownButton id="dropdown-basic-button" title="SORT">
                        <Dropdown.Item onClick={() => this.handleSort("ASC")}>Name A-Z</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.handleSort("DESC")} >Name Z-A</Dropdown.Item>
                    </DropdownButton>
                </Dropdown>
                <Dropdown style={{ marginLeft: "10px", marginTop: "50px", width: "140px", display: "inline-block" }}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        LIMIT
             </Dropdown.Toggle>
                    <Dropdown.Menu style={{ textSizeAdjust: "10px", fontFamily: `'Tajawal', sans-serif` }}>
                        <Dropdown.Item onClick={() => this.handleLimit("5")} >5</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.handleLimit("10")} >10</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <br />
                {/* <div>
                    <ul>
                        {isLoading && <p>Loading...</p>}
                        {!isLoading && engineers}
                    </ul>
                </div> */}
                <center>
                    {!isLoading ? <div style={{ marginTop: '500px' }}><SemipolarLoading /></div> :
                        this.props.engineers.engineers.map((post, index) =>
                            <li key={index} style={{ listStyle: 'none', display: "inline-block", padding: "10px" }}>
                                <Link to={`/engineers/${post.id}`}>
                                    <Card style={{ marginTop: "10px", borderRadius: "5%", backgroundImage: `url("${post.Photo}")`, width: '100%', height: "25rem", objectFit: 'cover', color: "white", marginBottom: "80px", backgroundRepeat: "no-repeat", backgroundPosition: "center center" }}>
                                        <Card.Header></Card.Header>
                                        <Card.Body style={{ height: "300px" }}>
                                        </Card.Body>
                                        <Card.Footer className="text-muted" style={{ backgroundColor: "black", opacity: "0.5" }}>
                                            <div style={{ color: "white", textAlign: "left" }}>
                                                <h5 className="card-title mb-3" >{post.Name}</h5>
                                                <small>{post.Description}</small>
                                                <p ><small><FontAwesomeIcon className="mr-auto" icon={faEnvelopeOpen} /> {post.email}</small> <br /> <small ><FontAwesomeIcon className="mr-auto ml-2" icon={faHandHoldingUsd} />{post.expected_salary}</small></p>
                                                <p className="card-text" style={{ color: "white" }}>Skill : <br /> {post.Skill}</p>
                                            </div>
                                        </Card.Footer>
                                    </Card>
                                </Link>

                            </li>
                        )}
                </center>
                <Nav className="justify-content-center" style={{ marginBottom: "100px", position: "relative", alignItems: "center", zIndex: "3" }}>
                    <Pagination>
                        <Pagination.Item onClick={this.prevPage} > Prev </Pagination.Item>
                        <Pagination.Item active>{this.props.engineers.page.page}</Pagination.Item>
                        <Pagination.Item onClick={this.nextPage} > Next</Pagination.Item>
                    </Pagination>
                </Nav>
            </>
        )
    }
}
const mapStateToProps = state => ({
    engineers: state.engineers,
    engineer: state.detailEngineers
})

const mapDispatchToProps = dispatch => ({
    fetch: (search, page, limit, sort, sortBy) => dispatch(fetchEngineers(search, page, limit, sort, sortBy)),
    fetchDetail: id => dispatch(fetchDetailEngineers(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cards))

