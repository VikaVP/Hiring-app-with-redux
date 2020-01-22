import React, { Component } from "react"
import { Link } from 'react-router-dom'
// import axios from 'axios'
import { connect } from 'react-redux'
import '../../css/signup.css'
import swal from 'sweetalert'
import { withRouter } from 'react-router-dom'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact'
import { fetchSignup } from '../../public/redux/actions/signup'
const regex = require('regex-email')
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            email: "",
            password: "",
            nameErr: "",
            emailEr: "",
            passwordErr: "",
            role: "",
            Location: '',
            Skill: '',
            DOB: '1999/09/09',
            expected_salary: '',
            Description: '',
            Showcase: '',
            Photo: null,
            photoErr: "",
            valid: true,
            alert: null,
            roleErr: ""
        };
        this.addUser = this.addUser.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleFieldChangeFile = this.handleFieldChangeFile.bind(this)
    }
    validateForm() {
        const { Name, email, password, Photo, role } = this.state
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
        if (!Name) {
            this.setState({
                nameErr: "Name must not be empty"
            });
        } else {
            this.setState({
                nameErr: ""
            });
        }
        let photo = Photo.name.substring(Photo.name.lastIndexOf(".") + 1).toLowerCase()
        let ext = ["jpg", "jpeg", "png"]
        if (!Photo) {
            this.setState({
                photoErr: "Please upload your photo"
            });
        } else if (ext.indexOf(photo) === -1) {
            this.setState({
                photoErr: "Type your photo must be jpg/jpeg/png"
            });
        } else {
            this.setState({
                photoErr: ""
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
    handleFieldChangeFile(event) {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    }


    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    addUser(e) {
        e.preventDefault()
        this.validateForm()
        if (!this.state.emailErr && !this.state.passwordErr && !this.state.nameErr && !this.state.photoErr) {
            if (this.state.role === 'engineer') {
                const formData = new FormData()
                formData.append('email', this.state.email)
                formData.append('Name', this.state.Name)
                formData.append('Photo', this.state.Photo)
                formData.append('Description', this.state.Description)
                formData.append('Skill', this.state.Skill)
                formData.append('DOB', this.state.DOB)
                formData.append('Location', this.state.Location)
                formData.append('Showcase', this.state.Showcase)
                formData.append('expected_salary', this.state.expected_salary)
                formData.append('password', this.state.password)
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
                this.props.fetchSignup('engineers', formData, config)
                swal("Good job!", "Congratulation for your new account", "success").then((ok) =>
                    ok && this.props.history.push('/login'))
            }
            if (this.state.role === 'company') {
                const formData = new FormData()
                formData.append('email', this.state.email)
                formData.append('Name', this.state.Name)
                formData.append('Logo', this.state.Photo)
                formData.append('Description', this.state.Description)
                formData.append('Location', this.state.Location)
                formData.append('password', this.state.password)
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
                this.props.fetchSignup('companies', formData, config)
                swal("Good job!", "Congratulation for your new account", "success").then((ok) =>
                    ok && this.props.history.push('/login'))
            }
        }
    }
    render() {

        return (
            <MDBContainer>
                <MDBRow style={{ justifyContent: "center" }}>
                    <MDBCol md="6" >
                        <form onSubmit={this.addUser} style={{ marginTop: "50px", textAlign: "center", verticalAlign: "middle", backgroundColor: "rgba(100,100,0,.1)", boxShadow: "10px 10px 5px #aaaaaa", borderRadius: "10px", marginBottom: "100px" }}>
                            <h1 style={{ color: "black" }}>Sign Up</h1>
                            <div className="black-text">
                                <input
                                    type='hidden'
                                    id='Description'
                                    name='Description'
                                    className='form-control'
                                    value=" "
                                    onChange={this.handleFieldChange}
                                />
                                <input
                                    type='hidden'
                                    id='Skill'
                                    name='Skill'
                                    className='form-control'
                                    value=" "
                                    onChange={this.handleFieldChange}
                                />
                                <input
                                    type='hidden'
                                    id='Location'
                                    name='Location'
                                    className='form-control'
                                    value=" "
                                    onChange={this.handleFieldChange}
                                />
                                <input
                                    type='hidden'
                                    id='Showcase'
                                    name='Showcase'
                                    className='form-control'
                                    value=" "
                                    onChange={this.handleFieldChange}
                                />
                                <input
                                    type='hidden'
                                    id='expected_salary'
                                    name='expected_salary'
                                    className='form-control'
                                    value=" "
                                    onChange={this.handleFieldChange}
                                />
                                <MDBInput
                                    className="text-info"
                                    label="Your name"
                                    icon="user"
                                    group
                                    type="text"
                                    validate
                                    error="wrong"
                                    success="right"
                                    name="Name"
                                    value={this.state.Name}
                                    onChange={this.handleChange}
                                />
                                {this.state.nameErr && <label style={{ color: "red" }}>
                                    {this.state.nameErr}
                                </label>}
                                <MDBInput
                                    className="text-info"
                                    label="Your email"
                                    icon="envelope"
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
                                    label="Your password"
                                    icon="lock"
                                    group
                                    type="password"
                                    validate
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                {this.state.passwordErr && <label style={{ color: "red" }}>
                                    {this.state.passwordErr}
                                </label>}
                                <label htmlFor='Photo' className='black-text'>
                                    Photo
                                </label>
                                <input
                                    type='file'
                                    id='Photo'
                                    name='Photo'
                                    className='form-control'
                                    onChange={this.handleFieldChangeFile}
                                />
                                {this.state.photoErr && <label style={{ color: "red" }}>
                                    {this.state.photoErr}
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
                            </div>
                            <br />
                            <div className="text-center">
                                <MDBBtn color="primary" style={{ width: "200px" }} onClick={this.addUser}>Register</MDBBtn>
                                <Link to={`/login`} className="btn btn-info">Already have account? Sign In in here</Link>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}
const mapStateToProps = state => ({
    signup: state.signup
})

const mapDispatchToProps = dispatch => ({
    fetchSignup: (data, config) => dispatch(fetchSignup(data, config)),

})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp))