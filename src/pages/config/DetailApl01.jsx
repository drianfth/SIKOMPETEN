import React from 'react'
import { useParams } from 'react-router-dom'

const DetailApl01 = () => {
    let {id} = useParams();
    
  return (
    <div>DetailApl01 {id}</div>
  )
}

export default DetailApl01