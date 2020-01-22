import React from 'react'
import '../App.css'
import Logins from '../hirings/components/Login'
import Footer from '../hirings/components/Footers'
import Headers from '../hirings/components/HeadersLanding'
import Background from '../assets/3.png'
// import { Button } from 'react-bootstrap'
function Login() {
  let sectionStyle = {
    width: '100%',
    height: '600px',
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }
  return (
    <>
      <section style={sectionStyle}>
        <Headers />
        <Logins />
        <Footer />
      </section>
    </>
  )
}
export default Login
