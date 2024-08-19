import React from 'react'
import {useNavigate} from 'react-router-dom'

const SingleWorkout = () => {
    const navigate = useNavigate()

  return (
    <>  
        <button onClick={() => {navigate(-1)}}>Go Back</button>
        <div>
            single workout
        </div>
    </>
  )
}

export default SingleWorkout
