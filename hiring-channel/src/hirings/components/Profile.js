import React from 'react'
// import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Row, Container, Col, Badge, Modal, Button } from 'react-bootstrap'
import swal from 'sweetalert'
import { connect } from 'react-redux'
import { SemipolarLoading } from 'react-loadingg'
import { fetchDetailEngineers, fetchUpdateEngineers, fetchDeleteEngineers } from '../../public/redux/actions/engineers'
const regex = require('regex-email')
class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      id: '',
      Name: '',
      Skill: '',
      DOB: '',
      expected_salary: '',
      Description: '',
      Showcase: '',
      email: '',
      Location: '',
      Date_created: '',
      Date_update: '',
      Photo: null,
      show: false,
      nameErr: "",
      descriptionErr: "",
      emailErr: "",
      locationErr: "",
      photoErr: "",
      skillErr: '',
      DOBErr: '',
      expectedSalaryErr: '',
      showcaseErr: '',
      isLoading: true
    }
    this.validateForm = this.validateForm.bind(this)
    this.editData = this.editData.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleFieldChangeFile = this.handleFieldChangeFile.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.delete = this.delete.bind(this)
  }
  handleClose() { this.setState({ show: false }) }
  handleShow() { this.setState({ show: true }) }
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
  validateForm(e) {
    e.preventDefault()
    const { Name, email, Photo, Location, Description, Showcase, Skill, DOB, expected_salary } = this.state

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
    if (!Showcase) {
      this.setState({
        showcaseErr: "showcase must not be empty"
      });
    } else {
      this.setState({
        showcaseErr: ""
      });

    }
    if (!Skill) {
      this.setState({
        skillErr: "skill must not be empty"
      });
    } else {
      this.setState({
        skillErr: ""
      });

    }
    if (!DOB) {
      this.setState({
        DOBErr: "DOB must not be empty"
      });
    } else {
      this.setState({
        DOBErr: ""
      });

    }
    if (!expected_salary) {
      this.setState({
        expectedSalaryErr: "Expected salary must not be empty"
      });
    } else {
      this.setState({
        expectedSalaryErr: ""
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
  componentDidMount() {
    this.props.fetch(this.props.id)
      .then(() => {
        this.props.propsDetail.detailEngineers.map((item) => {
          return this.setState({
            Name: item.Name,
            id: item.id,
            Skill: item.Skill,
            Showcase: item.Showcase,
            DOB: item.DOB.split('T')[0],
            Description: item.Description,
            email: item.email,
            expected_salary: item.expected_salary,
            Location: item.Location,
            Date_created: item.Date_created.split('T')[0]
          })
        })
      })
  }

  editData(e) {
    e.preventDefault()
    const { Name, email, photoErr, Location, Description, Showcase, Skill, DOB, expected_salary } = this.state
    if (Name && email && photoErr !== undefined && Location && Description && Showcase && Skill && DOB && expected_salary) {
      const formData = new FormData()
      formData.append('id', this.state.id)
      formData.append('email', this.state.email)
      formData.append('Name', this.state.Name)
      formData.append('Photo', this.state.Photo)
      formData.append('Description', this.state.Description)
      formData.append('Skill', this.state.Skill)
      formData.append('Location', this.state.Location)
      formData.append('DOB', this.state.DOB)
      formData.append('Showcase', this.state.Showcase)
      formData.append('Date_created', this.state.Date_created)
      formData.append('expected_salary', this.state.expected_salary)

      const config = {
        headers: {
          'content-type': 'multipart/form-data; boundary=' + formData._boundary
        }
      }
      this.props.fetchUpdate(this.props.id, formData, config)
      swal("Good job!", "Engineer success edited", "success").then((ok) =>
        ok && document.location.reload())
    }
  }

  render() {
    const { show, isLoading } = this.state
    setTimeout(
      function () {
        this.setState({ isLoading: false });
      }
        .bind(this),
      2000
    );
    return (
      <>
        {isLoading ? <div style={{ marginTop: '500px' }}><SemipolarLoading /></div> :
          this.props.propsDetail.detailEngineers.map((item, index) =>
            <Container>
              <Row style={{ marginTop: '120px', background: 'linear-gradient(#2F4F4F, #9198e5)', boxSizing: 'border-box', boxShadow: '10px 10px 5px #aaaaaa' }}>
                <Col sm={5}> <img src={`${item.Photo}`} alt='profile' style={{ borderRadius: '20%', width: '100%', height: '25rem', objectFit: 'cover', backgroundPosition: 'center center' }} /> </Col>
                <Col sm={5} className='align-self-center' style={{ color: 'white' }}>
                  <h1>{item.Name}</h1>
                  <p>DOB             : {item.DOB ? new Intl.DateTimeFormat('en-GB', {
                    month: 'long',
                    day: '2-digit',
                    year: 'numeric'
                  }).format(new Date(item.DOB.split('T')[0])) : ''}</p>
                  <p>Email           : {item.email}</p>
                  <p>Location        : {item.Location}</p>
                  <p>Showcase        : {item.Showcase}</p>
                  <p>Description     : {item.Description}</p>
                  <p>Expected Salary : {item.expected_salary}</p>
                  <p>Skill           : {item.Skill}</p>
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
              <br />
              <label htmlFor='DOB' className='black-text'>
                DOB
              </label>
              <input
                type='date'
                id='DOB'
                name='DOB'
                className='form-control'
                value={this.state.DOB}
                onChange={this.handleFieldChange}
              />
              <br />
              <label htmlFor='skill' className='black-text'>
                Skill
              </label>
              <input
                type='text'
                id='skill'
                name='Skill'
                className='form-control'
                value={this.state.Skill}
                onChange={this.handleFieldChange}
              />
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
              <br />
              <label htmlFor='Showcase' className='black-text'>
                Showcase
              </label>
              <input
                type='text'
                id='Showcase'
                name='Showcase'
                className='form-control'
                value={this.state.Showcase}
                onChange={this.handleFieldChange}
              />
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
              <br />
              <label htmlFor='expected_salary' className='black-text'>
                Expected Salary
              </label>
              <input
                type='text'
                id='expected_salary'
                name='expected_salary'
                className='form-control'
                value={this.state.expected_salary}
                onChange={this.handleFieldChange}
              />
              <br />
              <input
                type='hidden'
                id='Date_created'
                name='Date_created'
                className='form-control'
                value={this.state.Date_created}
                onChange={this.handleFieldChange}
              />
              <br />
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
  propsDetail: state.detailEngineers
})

const mapDispatchToProps = dispatch => ({
  fetch: id => dispatch(fetchDetailEngineers(id)),
  fetchUpdate: (id, data, config) => dispatch(fetchUpdateEngineers(id, data, config)),
  fetchDelete: id => dispatch(fetchDeleteEngineers(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile))
