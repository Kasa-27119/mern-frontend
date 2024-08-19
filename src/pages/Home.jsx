import {useState, useEffect} from 'react'
import axios from 'axios'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"


// import comps.
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const baseURL = import.meta.env.VITE_API_BASE_URL

const Home = () => {
  // 1. state for workouts
  // const [workouts, setWorkouts] = useState(null)

  // useContext for states and checking states
  const {workouts, dispatch} = useWorkoutsContext()
  const [myWorkouts, setMyWorkouts] = useState(null)

  // 2. useEffect
  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await axios.get(`${baseURL}/api/workouts/`)
      // console.log(response.data)

      // if status is okay, set status to the workout array
      if (response.status === 200) {
        // setWorkouts(response.data)

        // use dispatch instead to update state
        // CHECK ALL WORKOUTS, PAYLOAD = WORKOUTS ARE EQUAL TO
        dispatch({type: 'SET_WORKOUTS', payload: response.data})
      }
    }

    // call back
    fetchWorkout();

  }, []) // run once

  // filtering logic
  const handleMyWorkouts = () => {
    setMyWorkouts(true)
  }

  const handleAllWorkouts = () => {
    setMyWorkouts(null)
  }


  return (
    <div className='home'>
      <div className='workouts'>
        <button onClick={handleMyWorkouts}>My Workouts</button>
        <button onClick={handleAllWorkouts}>All Workouts</button>
        <h2>Workouts</h2>

        {/* filter user workouts */}
        {myWorkouts ? (workouts && workouts.map((workout) => {
          const user = JSON.parse(localStorage.getItem('user'))
          const user_id = user.email
          if (workout.user_id === user_id) {
            return (
              <WorkoutDetails key={workout._id} workout={workout}/>
            )
          }
        })) : (workouts && workouts.map((workout) => {
          return (
            <WorkoutDetails key={workout._id} workout={workout}/>
          )
        })
      )}
      </div>
      <WorkoutForm/>
    </div>
  )
}

export default Home
