import { useState } from "react"
import axios from "axios"

// import context - for updating states
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const baseURL = import.meta.env.VITE_API_BASE_URL

const WorkoutForm = () => {
    // 1. set state vars. for title reps, and load

    // dispatch for useContext
    // don't need state as you don't need all workouts, just adding a new one
    const {dispatch} = useWorkoutsContext()

    // input state vars.
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [image, setImage] = useState(null)

    // 3. set form submit handler
    const handleSubmit = async (e) => {
        // a. prevent default refresh
        e.preventDefault();

        // set up user as the same as the local storage user
        const user = JSON.parse(localStorage.getItem('user'))
        const user_id = user.email

        // b. set up object to send to the database
        // const workout = {title, load, reps, user_id}

        // set up a form data to send up to db (w/ image upload link)
        const formData = new FormData()
        formData.append('title', title)
        formData.append('load', load)
        formData.append('reps', reps)
        formData.append('user_id', user_id)
        formData.append('image', image)

        // c. http request - try and catch
        try {
            // const response = await axios.post(`${baseURL}/api/workouts/`, workout, {

            //     // d. define headers - IMPORTANT TO REMEMBER   !
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // });

            // response as form data
            const response = await axios.post(`${baseURL}/api/workouts/`, formData, {
                headers: {
                    // 'Content-Type': 'application/json' // telling it to use and expect json
                    'Content-Type': 'multipart/form-data'
                }
            })
            
            // e. refresh states
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)

            // f. new workout response message and log
            console.log('new workout added', response.data)

            // add dispatch from workoutContext
            // set response.data as payload
            //  eg. current workouts, taking response.data = new workout, and pushing into the workouts array
            dispatch({type: 'CREATE_WORKOUTS', payload: response.data})
        }
        catch (error) {
            setError(error.message)
        }
    }

    // 2. return submit form
  return (
    <form className="create" onSubmit={handleSubmit}>
        <h3>Add A New Workout</h3>

        <label>Exercise Title: </label>
        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title}/>

        <label>Load (in kg): </label>
        <input type="number" onChange={(e) => setLoad(e.target.value)} value={load}/>

        <label>Reps: </label>
        <input type="number" onChange={(e) => setReps(e.target.value)} value={reps}/>

        <label>Upload Image:</label>
        <input type="file"
            accept="image/*"
            // what type of file are you accepting for upload eg. all img file types
            onChange={(e) => {
                setImage(e.target.files[0])
            }}
        />

        <button>Add Workout</button>

        {/* if there is an error, show error */}
        {error && <div className="error">{error}</div>}

    </form>
  )
}

export default WorkoutForm
