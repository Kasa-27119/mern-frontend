import {useState, useEffect} from 'react'
import axios from 'axios'

// import comps.
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
  // 1. state for workouts
  const [workouts, setWorkouts] = useState(null)

  // 2. useEffect
  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await axios.get('http://localhost:4000/api/workouts/')
      // console.log(response.data)

      // if status is okay, set status to the workout array
      if (response.status === 200) {
        setWorkouts(response.data)
      }
    }

    // call back
    fetchWorkout();

  }, []) // run once


  return (
    <div className='home'>
      <h2>Home</h2>
      <div className='workouts'>
        {workouts && workouts.map((workout) => {
          return (
            <WorkoutDetails key={workout._id} workout={workout}/>
          )
        })}
      </div>
      <WorkoutForm/>
    </div>
  )
}

export default Home
