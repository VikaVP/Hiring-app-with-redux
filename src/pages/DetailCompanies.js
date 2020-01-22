import React from 'react'
import '../App.css'
import { useParams } from 'react-router-dom'
import DetailCompany from '../hirings/components/DetailCompany'
import Headers from '../hirings/components/HeadersComp'
import Footer from '../hirings/components/Footers'
function DetailCompanies(props) {
  const { id } = useParams()
  return (
    <>
      <Headers />
      <DetailCompany id={id} />
      <Footer />
    </>
  )
}
export default DetailCompanies
