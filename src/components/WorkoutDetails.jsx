import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
//import custom context
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
// import date fns
// date fns - format date to now
import { formatDistanceToNow } from 'date-fns'

const baseURL = import.meta.env.VITE_API_BASE_URL

const WorkoutDetails = ({workout}) => {

  // bring in dispatch method
  const {dispatch} = useWorkoutsContext()

  // navigate init
  const navigate = useNavigate()

  // set up state vars. for edit
  const [isEditing, setIsEditing] = useState(false)

  // set up state for the edit form inputs
  const [editTitle, setEditTitle] = useState(workout.title)
  const [editLoad, setEditLoad] = useState(workout.load)
  const [editReps, setEditReps] = useState(workout.reps)

  // comment states
  const [commentText, setCommentText] = useState('') // user input for comment

  // hide/show comments state
  const [showComments, setShowComments] = useState(false)

  // user 
  const user = JSON.parse(localStorage.getItem('user'))
  const user_id = user.email

  // add comment function
  const handleAddComment = async () => {
    try {
      const response = await axios.post(`${baseURL}/api/comments/workouts/${workout._id}/comments`,
        {
          text: commentText, // state var
          user_id: user_id // state var
        }
      )
      if (response.status === 201) {
        // need to update the component state to include new comment
        const newComment = response.data
        const updatedComments = [...workout.comments, newComment] // spread out workout comments, and adding new comment to end of array
        // updating workout w updated comments
        const updatedWorkout = {...workout, comments: updatedComments}

        // dispatch the updated workout data - update the context when a comment is made
        dispatch({type: 'UPDATE_WORKOUT', payload: updatedWorkout})

        // clear comment state
        setCommentText('')
      }

    } catch (error) {
      console.error('Error adding comment: ', error)
    }
  }
  
  // delete post on click handler
  const handleDelete = async () => {
    const response = await axios.delete(`${baseURL}/api/workouts/${workout._id}`)
    const json = await response.data

    // check resp. status code
    if (response.status === 200) {
      console.log(json)
      dispatch({type: 'DELETE_WORKOUT', payload:json})
    }
  }

  // handle edit
  const handleEdit = () => {
    setIsEditing(true);
    
  }

  // submit edit handler
  const handleSubmitEdit = async () => {
    const updatedWorkout = {
      title: editTitle,
      load: editLoad,
      reps: editReps
    }

    try {
      const response = await axios.patch(
        `${baseURL}/api/workouts/${workout._id}`,
        updatedWorkout
      )
      const updatedData = response.data

      // check res status code
      if (response.status === 200) {
        console.log(response)
        console.log(updatedData)
        // dispatch
        dispatch({type: 'UPDATE_WORKOUT', payload: updatedData})
        setIsEditing(false)
      }
    } catch (error) {
      console.error('error updating workout', error)
    }
  }

  // handle cancel edit - revert values back to orig.
  const handleCancelEdit = () => {
    setEditTitle(workout.title)
    setEditLoad(workout.load)
    setEditReps(workout.reps)
    setIsEditing(false)
  }

  // handle single workout navigate
  const handleNavigate = () => {
    let path = `/${workout._id}`
    navigate(path)
  }

  const getEmailCharsBeforeAtSymbol = (email) => {
    const delimiter = '@'
    const parts = email.split(delimiter)
    return parts.length > 1 ? parts[0] : ''
  }
  
  return (
    <div className='workout-details'>

      {/* conditional render if editing - if not */}
      {isEditing ? (

        // editing form
        <div className='edit-modal'>
          <label>Edit Exercise Title:</label>
          <input
            type='text' value={editTitle} onChange={(e) => setEditTitle(e.target.value)}
          />

          <label>Edit Load:</label>
          <input
            type='number'
            value={editLoad} onChange={(e) => setEditLoad(e.target.value)}
          />

          <label>Edit Reps:</label>
          <input
            type='number'
            value={editReps} onChange={(e) => setEditReps(e.target.value)}
          />

          <button onClick={handleCancelEdit}>Cancel</button>
          <button onClick={handleSubmitEdit}>Save</button>
          
        </div>
      ) : (
        <>
          <div className='top-container'>
            <h4>{workout.title}</h4>
            {workout.image && (
              <img className='workout-image' src={`${baseURL}/public/uploads/${workout.image}`} alt={workout.title} />
            )}
          </div>

          <p><strong>Load (kg):</strong> {workout.load}</p>
          <p><strong>reps (kg):</strong> {workout.reps}</p>
          {/* format post time */}
          <p>{formatDistanceToNow(new Date(workout.createdAt), {includesSeconds: true}, {addSuffix: true})} ago</p>
          <p><strong>Created By: </strong>{workout.user_id ? getEmailCharsBeforeAtSymbol(workout.user_id) : 'Unknown'}    </p>
          <button onClick={handleNavigate}>Read More</button>

          {workout.user_id === user_id && (
            <>
              <span onClick={handleEdit}>
                <i className='fa-solid fa-pen'></i>
              </span>
              <span onClick={handleDelete}>
                <i className='fa-solid fa-trash'></i>
              </span>
            </>
          )}
        </>
      )}
      {/* cond. return, if true - 'hide comments', otherwise 'show...'*/}
      <button
      onClick={() => {
        setShowComments(!showComments)
        console.log(workout.comments[0])
      }}
      >
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>

      {/* cond. render -  if showComments is true*/}
      {/* map over comments array */}
      {showComments && (
        <>
          <div className='comments'>
            {workout.comments.map((comment) => (
              <div key={comment._id} className='comment'>
                <h5>{getEmailCharsBeforeAtSymbol(comment.user_id)}</h5>
                <p>{comment.text}</p>
                <span>
                  Posted: {formatDistanceToNow(new Date(comment.createdAt), {includeSeconds: true})}{' '}ago
                </span>
              </div>
            ))}
          </div>
          {/* add comments section*/}
          <div className='add-comment'>
            <label>Add New Comment</label>
            <input
              type='text'
              placeholder='Add a comment...'
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button onClick={handleAddComment}>Submit</button>
          </div>
        </>
      )}
    </div>
  )
}

export default WorkoutDetails
