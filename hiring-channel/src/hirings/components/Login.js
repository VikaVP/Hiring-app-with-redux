import React, { Component } from "react"
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact'
import swal from 'sweetalert'
import { fetchLogin } from '../../public/redux/actions/login'
import { connect } from 'react-redux'
const regex = require('regex-email')
// import axios from 'axios'
class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            role: "",
            emailErr: "",
            passwordErr: "",
            roleErr: ""
        };
    }


    validateForm() {
        const { email, password, role } = this.state
        if (!email) {
            this.setState({
                emailErr: "Email must not be empty"
            });
        } else if (!email.match(regex)) {
            this.setState({
                emailErr: "Invalid email"
            })
        } else {
            this.setState({
                emailErr: ""
            });
        }
        if (!password) {
            this.setState({
                passwordErr: "Password must not be empty"
            });
        } else if (password.length < 3) {
            this.setState({
                passwordErr: "Password too short"
            })
        } else {
            this.setState({
                passwordErr: ""
            });
        }
        if (!role) {
            this.setState({
                roleErr: "Please choose your role"
            });
        } else {
            this.setState({
                roleErr: ""
            });
        }

    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    getLogin = event => {

        event.preventDefault();
        const { email, password, role } = this.state
        const data = {
            email, password, role
        }
        this.validateForm()
        if (!this.state.emailErr && !this.state.passwordErr) {
            this.props.loginUser(data).then(() => {
                localStorage.setItem("token", this.props.login.token)
                swal("Good job!", "Success Login", "success").then((ok) =>
                    ok && role === 'engineer' ? this.props.history.push('/engineers') : role === 'company' ? this.props.history.push('/companies') : this.props.history.push('/login'))
            })
        }

    }
    render() {
        return (
            <>
                <div style={{ width: "100%", height: "40%", marginTop: "50px" }}></div>
                <MDBContainer >
                    <MDBRow style={{ justifyContent: "center", marginTop: "-200px", height: "450px" }}>
                        <MDBCol md="5">
                            <form onSubmit={this.getLogin} style={{ marginTop: "100px", textAlign: "center", verticalAlign: "middle" }}>
                                <p className="h5 text-center mb-4" style={{ color: "white" }}>Sign in</p>
                                <div style={{ color: "white", textSizeAdjust: "30px" }}>
                                    <MDBInput
                                        className="text-info"
                                        icon="envelope"
                                        label="Type your email"
                                        group
                                        type="email"
                                        validate
                                        error="wrong"
                                        success="right"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                    {this.state.emailErr && <label style={{ color: "red" }}>
                                        {this.state.emailErr}
                                    </label>}

                                    <MDBInput
                                        className="text-info"
                                        icon="lock"
                                        label="Type your password"
                                        group
                                        type="password"
                                        error="wrong"
                                        validate
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        required
                                    />
                                    {this.state.passwordErr && <label style={{ color: "red" }}>
                                        {this.state.passwordErr}
                                    </label>}
                                    <div>
                                        <select name="role" onChange={this.handleChange} className="browser-default custom-select" style={{ width: "50%" }}>
                                            <option>Choose your role</option>
                                            <option value="engineer"  >Engineer</option>
                                            <option value="company">Company</option>
                                        </select>
                                    </div>
                                    {this.state.roleErr && <label style={{ color: "red" }}>
                                        {this.state.roleErr}
                                    </label>}
                                    <div style={{ display: "inline-block" }}>
                                        <MDBBtn onClick={this.getLogin}>Login</MDBBtn>
                                    </div>
                                    <Link to={`/signup`} className="btn btn-white" style={{ display: "inline-block" }}>Dont have any account? Sign Up in here</Link>
                                </div>
                            </form>
                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
            </>
        )
    }
}
const mapStateToProps = state => ({
    login: state.login
})

const mapDispatchToProps = dispatch => ({
    loginUser: (data) => dispatch(fetchLogin(data)),

})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))