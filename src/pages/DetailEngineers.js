import React from 'react'
import '../App.css'
import { useParams } from 'react-router-dom'
import DetailEngineer from '../hirings/components/DetailEngineer'
import Headers from '../hirings/components/Headers'
import Footer from '../hirings/components/Footers'
function DetailEngineers(props) {
  const { id } = useParams()
  return (
    <>
      <Headers />
      <DetailEngineer id={id} />
      <Footer />
    </>
  )
}
export default DetailEngineers
