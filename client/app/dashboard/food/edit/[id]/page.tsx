"use client"
import { useParams } from "next/navigation";

const EditPage = () => {
    const params = useParams();
    const id = params.id;
  return (
    <div>ID: {id}</div>
  )
}

export default EditPage