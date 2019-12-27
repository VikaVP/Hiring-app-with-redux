import React from 'react'
// import axios from 'axios'
import { Row, Container, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { SemipolarLoading } from 'react-loadingg'
import { fetchDetailEngineers } from '../../public/redux/actions/engineers'
class DetailEngineer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      isLoading: false
    }
  }
  componentDidMount() {
    this.props.fetch(this.props.id)
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
      <>
        {!isLoading ? <div style={{ marginTop: '800px' }}><SemipolarLoading /></div> :
          this.props.propsDetail.detailEngineers.map((item, index) =>
            <Container key={index}>
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
                </Col>
              </Row>
            </Container>
          )}
      </>
    )
  }
}
const mapStateToProps = state => ({
  propsDetail: state.detailEngineers
})

const mapDispatchToProps = dispatch => ({
  fetch: id => dispatch(fetchDetailEngineers(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(DetailEngineer)
