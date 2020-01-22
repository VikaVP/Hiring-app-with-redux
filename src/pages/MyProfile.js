import React from 'react'
import '../App.css'
// import Photo from '../assets/awkarin.jpg'
import { useParams } from 'react-router-dom'
import Headers from '../hirings/components/Headers'
import Profile from '../hirings/components/Profile'
import Footer from '../hirings/components/Footers'
function MyProfile() {
  const { id } = useParams()
  return (
    <>
      <Headers />
      <Profile id={id} />
      <Footer />
    </>
  )
}
export default MyProfile
