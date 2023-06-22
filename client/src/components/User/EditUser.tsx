import React from 'react'
import { useParams } from 'react-router-dom'

export const EditUser = () => {
  const { id } = useParams();

  // const user = getUserById(id) 

  return (
    <div>
      <h1>EditUser</h1>
      <form action="" onSubmit={e => e.preventDefault()}>



      </form>
    </div>
  )
}
