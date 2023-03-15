import React from 'react'
import { useParams } from 'react-router-dom'

const DaftarMapa01 = () => {
    const {id} = useParams();
  return (
    <div>DaftarMapa01 {id}</div>
  )
}

export default DaftarMapa01