import React, { useEffect, useState } from 'react'
import { backService } from '../../services';

function Review(props) {
  const [reviews, setReviews] = useState([])

  console.log('Props:')
  console.log(props)


  return (
    <div className='review' key={props.id}>
      <div>
        <p>props.author</p>
        <p>props.verified</p>
      </div>
      <div>
        <img src={props.imageUrl} alt="" />
        <div>Description: {props.text}</div>
      </div>
    </div>
  )
}

export default Review