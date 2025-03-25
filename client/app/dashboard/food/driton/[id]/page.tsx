"use client"
import { useParams } from 'next/navigation'
const DritonID = () => {
    const params = useParams();
const id = params.id;
  return (
    <div>DritonID: {id}</div>
  )
}

export default DritonID