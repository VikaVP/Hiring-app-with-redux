import React from 'react'
import '../App.css'
import AddCompany from '../hirings/components/AddCompany'
import Footer from '../hirings/components/Footers'
function AddProfiles() {
  let sectionStyle = {
    width: '100%',
    height: '1200px',
    backgroundImage: 'linear-gradient(to right, #F05F57, black)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    marginTop: '-50px'
  }
  return (
    <>
      <section style={sectionStyle}>
        <AddCompany />
      </section>
      <Footer />
    </>
  )
}
export default AddProfiles
