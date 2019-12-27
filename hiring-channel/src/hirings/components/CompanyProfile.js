import React from 'react'
// import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Row, Container, Col, Badge, Modal, Button } from 'react-bootstrap'
import swal from 'sweetalert'
import { connect } from 'react-redux'
import { SemipolarLoading } from 'react-loadingg'
import { fetchDetailCompanies, fetchUpdateCompanies, fetchDeleteCompanies } from '../../public/redux/actions/companies'
const regex = require('regex-email')
class CompanyProfile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      id: '',
      Name: '',
      Description: '',
      email: '',
      Location: '',
      Logo: null,
      show: false,
      nameErr: "",
      descriptionErr: "",
      emailErr: "",
      locationErr: "",
      logoErr: "",
      isLoading: false
    }
    this.editData = this.editData.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleFieldChangeFile = this.handleFieldChangeFile.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.delete = this.delete.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }
  handleClose() { this.setState({ show: false }) }
  handleShow() { this.setState({ show: true }) }
  validateForm(e) {
    e.preventDefault()
    const { Name, email, Logo, Location, Description } = this.state

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
    if (!Location) {
      this.setState({
        locationErr: "Location must not be empty"
      });
    } else {
      this.setState({
        locationErr: ""
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
    let photo = Logo.name.substring(Logo.name.lastIndexOf(".") + 1).toLowerCase()
    let ext = ["jpg", "jpeg", "png"]
    if (!Logo) {
      this.setState({
        logoErr: "Please upload your photo"
      });
    } else if (ext.indexOf(photo) === -1) {
      this.setState({
        logoErr: "Type your photo must be jpg/jpeg/png"
      });
    } else {
      this.setState({
        logoErr: ""
      });
    }
    if (!Description) {
      this.setState({
        descriptionErr: "Please choose your description"
      });
    } else {
      this.setState({
        descriptionErr: ""
      });
    }
    console.log(this.logoErr);
    this.editData()

  }
  delete() {
    this.props.fetchDelete(this.props.id)
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

  handleFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleFieldChangeFile(event) {
    this.setState({
      [event.target.name]: event.target.files[0]
    })
  }

  componentDidMount() {
    this.props.fetch(this.props.id)
      .then(() => {
        this.props.propsDetail.detailCompanies.map((item) => {
          return this.setState({
            Name: item.Name,
            id: item.id,
            Description: item.Description,
            email: item.email,
            Location: item.Location
          })
        })
      })
  }

  editData() {
    // e.preventDefault()
    // this.validateForm()

    const { email, Name, Location, Description, logoErr } = this.state
    if (email && Name && Location && Description && logoErr !== undefined) {
      // console.log(this.state.Photo.name)
      const formData = new FormData()
      formData.append('id', this.state.id)
      formData.append('email', this.state.email)
      formData.append('Name', this.state.Name)
      formData.append('Logo', this.state.Logo)
      formData.append('Description', this.state.Description)
      formData.append('Location', this.state.Location)

      const config = {
        headers: {
          'content-type': 'multipart/form-data' + formData
        }
      }
      this.props.fetchUpdate(this.props.id, formData, config)
      swal("Good job!", "Company success edited", "success").then((ok) =>
        ok && document.location.reload())
    }
  }

  render() {
    const { show, isLoading } = this.state
    setTimeout(
      function () {
        this.setState({ isLoading: true });
      }
        .bind(this),
      2000
    );
    return (
      <>
        {!isLoading ? <div style={{ marginTop: '800px' }}><SemipolarLoading /></div> :
          this.props.propsDetail.detailCompanies.map((item, index) =>
            <Container>
              <Row style={{ marginTop: '120px', background: 'linear-gradient(#2F4F4F, #9198e5)', boxSizing: 'border-box', boxShadow: '10px 10px 5px #aaaaaa' }}>
                <Col sm={5}> <img src={`${item.Logo}`} alt='Company' style={{ borderRadius: '20%', width: '100%', height: '25rem', objectFit: 'cover', backgroundPosition: 'center center' }} /> </Col>
                <Col sm={5} className='align-self-center' style={{ color: 'white' }}>
                  <h1>{item.Name}</h1>

                  <p>Email           : {item.email}</p>
                  <p>Description     : {item.Description}</p>
                  <p>Location        : {item.Location}</p>
                  <Badge variant='primary' style={{ width: '120px' }} onClick={this.handleShow}>
                    Edit Profile
                </Badge>
                  <Badge variant='danger' style={{ width: '120px' }} onClick={this.delete}>
                    Delete Profile
                </Badge>
                </Col>
              </Row>
            </Container>

          )}

        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title id='modalEdit'>
              Edit
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <form onSubmit={this.validateForm}>
              <p className='h4 text-center mb-4'>Complete your Profile</p>
              <input
                type='hidden'
                id='id'
                name='id'
                className='form-control'
                value={this.state.id}
                onChange={this.handleFieldChange}

              />
              <label htmlFor='Name' className='black-text'>
                Name
              </label>
              <input
                type='text'
                id='Name'
                name='Name'
                className='form-control'
                value={this.state.Name}
                onChange={this.handleFieldChange}
              />
              {this.state.nameErr && <label style={{ color: "red" }}>
                {this.state.nameErr}
              </label>}
              <br />
              <label htmlFor='email' className='black-text'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                className='form-control'
                value={this.state.email}
                onChange={this.handleFieldChange}
              />
              {this.state.emailErr && <label style={{ color: "red" }}>
                {this.state.emailErr}
              </label>}
              <br />
              <label htmlFor='Location' className='black-text'>
                Location
              </label>
              <input
                type='text'
                id='Location'
                name='Location'
                className='form-control'
                value={this.state.Location}
                onChange={this.handleFieldChange}
              />
              {this.state.locationErr && <label style={{ color: "red" }}>
                {this.state.locationErr}
              </label>}
              <br />
              <label htmlFor='Description' className='black-text'>
                Description
              </label>
              <input
                type='text'
                id='Description'
                name='Description'
                className='form-control'
                value={this.state.Description}
                onChange={this.handleFieldChange}
              />
              {this.state.descriptionErr && <label style={{ color: "red" }}>
                {this.state.descriptionErr}
              </label>}
              <br />
              <label htmlFor='Logo' className='black-text'>
                Logo
              </label>
              <input
                type='file'
                id='Logo'
                name='Logo'
                className='form-control'
                onChange={this.handleFieldChangeFile}
              />
              {this.state.logoErr && <label style={{ color: "red" }}>
                {this.state.logoErr}
              </label>}
              <Button variant='primary' type='submit' onChange={this.editData}>
                Save Changes
              </Button>
            </form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={this.handleClose}>
              Close
            </Button>

          </Modal.Footer>
        </Modal>
      </>
    )
  }
}
const mapStateToProps = state => ({
  propsDetail: state.detailCompanies
})

const mapDispatchToProps = dispatch => ({
  fetch: id => dispatch(fetchDetailCompanies(id)),
  fetchUpdate: (id, data, config) => dispatch(fetchUpdateCompanies(id, data, config)),
  fetchDelete: id => dispatch(fetchDeleteCompanies(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CompanyProfile))
