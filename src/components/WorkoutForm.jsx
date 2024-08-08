import { useState } from "react"
import axios from "axios"

const WorkoutForm = () => {
    // 1. set state vars. for title reps, and load
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')

    // set state for an error - default
    const [error, setError] = useState(null)


    // 3. set form submit handler
    const handleSubmit = async (e) => {
        // a. prevent default refresh
        e.preventDefault();

        // b. set up object to send to the database
        const workout = {title, load, reps}

        // c. http request - try and catch
        try {
            const response = await axios.post('http://localhost:4000/api/workouts/', workout, {

                // d. define headers - IMPORTANT TO REMEMBER   !
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // e. refresh states
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)

            // f. new workout response message and log
            console.log('new workout added', response.data)
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

        <button>Add Workout</button>

        {/* if there is an error, show error */}
        {error && <div className="error">{error}</div>}

    </form>
  )
}

export default WorkoutForm
