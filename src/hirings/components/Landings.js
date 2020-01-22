import React from 'react'
// import axios from 'axios'
import { Button, Carousel, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import profil1 from '../../assets/wikasilo.jpeg'
import profil2 from '../../assets/zackfranklin.png'
import profil3 from '../../assets/jechdsmith.jpeg'
import profil4 from '../../assets/mikenieva.jpeg'
class Landings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        }
    }

    render() {
        let imgStyle = {
            width: "200px",
            borderRadius: "50%"
        }
        return (
            <>
                <div className='background' />
                <p className="intro"><h1 > Want to build your network or getting a job or find engineer for your bussiness?</h1>
                    Lets join us!!
                </p>
                <center>
                    <Link to="/login">
                        <Button variant="outline-primary" style={{ width: "150px" }}>Login</Button>
                    </Link>
                    <Link to="/signup">
                        <Button variant="outline-primary" style={{ width: "150px" }}>Sign up</Button>
                    </Link>
                </center>

                <h3 style={{ textAlign: "center", marginTop: "150px" }}>Testimonials User</h3>
                <hr />
                <Carousel style={{ marginTop: "20px", marginBottom: "100px", height: "200px", zIndex: "-1" }}>
                    <Carousel.Item>

                        <center>
                            <Container style={{ marginTop: "-50px" }}>
                                <Row>
                                    <Col style={{ textAlign: "right" }}> <img src={profil1} alt="idp" style={imgStyle} /> </Col>
                                    <Col style={{ textAlign: "left", valign: "middle" }}>
                                        <h4>Wika Silo</h4>
                                        <small>Fullstack Developer Gojek</small>
                                        <p>This website really helped me to find a job that matched my expertise in bindang technology. Very quickly I was contacted by a company that was in need of employees </p>
                                    </Col>
                                    <Col xs lg="2"></Col>
                                </Row>
                            </Container>

                        </center>
                    </Carousel.Item>
                    <Carousel.Item>

                        <center>
                            <Container style={{ marginTop: "-50px" }}>
                                <Row>
                                    <Col style={{ textAlign: "right" }}> <img src={profil2} alt="idp" style={imgStyle} /> </Col>
                                    <Col style={{ textAlign: "left", valign: "middle" }}>
                                        <h4>Zack Franklin</h4>
                                        <small>Sofware Engineering Tokopedia</small>
                                        <p>I am happy to know this website because now I have worked at a well-known startup company in Indonesia</p>
                                    </Col>
                                    <Col xs lg="2"></Col>
                                </Row>
                            </Container>

                        </center>
                    </Carousel.Item>
                    <Carousel.Item>

                        <center>
                            <Container style={{ marginTop: "-50px" }}>
                                <Row>
                                    <Col style={{ textAlign: "right" }}> <img src={profil3} alt="idp" style={imgStyle} /> </Col>
                                    <Col style={{ textAlign: "left" }}>
                                        <h4>Jechd Smith</h4>
                                        <small>Developer freelancer</small>
                                        <p>Now expanding the network has become easier. many companies contact me for their projects. Thank you Hiring Channel</p>
                                    </Col>
                                    <Col xs lg="2"></Col>
                                </Row>
                            </Container>

                        </center>
                    </Carousel.Item>
                    <Carousel.Item>

                        <center>
                            <Container style={{ marginTop: "-50px" }}>
                                <Row>
                                    <Col style={{ textAlign: "right" }}> <img src={profil4} alt="idp" style={imgStyle} /> </Col>
                                    <Col style={{ textAlign: "left" }}>
                                        <h4>Mike Nieva</h4>
                                        <small>Backend Developer Google</small>
                                        <p>I find it easier to find a project or find a job here. Now I work at Google</p>
                                    </Col>
                                    <Col xs lg="2"></Col>
                                </Row>
                            </Container>

                        </center>
                    </Carousel.Item>
                </Carousel>
            </>
        )
    }
}
export default Landings
