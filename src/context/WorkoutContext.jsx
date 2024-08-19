import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext()

// create workout reducer
// export - acess to other comps.

// useReducer hook - for managing state and changes
export const workoutsReducer = (state, action) => {

    // checking against action type
    switch (action.type) {
        // state case - get all workouts
        case 'SET_WORKOUTS':
            // action if state
            return {
                // update workouts to new workouts
                workouts: action.payload
            }
        // state case - creating a new workout
        case 'CREATE_WORKOUTS':
            return {
                // action.payload = newly created workout
                workouts: [action.payload, ...state.workouts]
                // ... spread operator - spread workouts array open, look at all workouts, get and put action.payload at the start of the array
            }
            // state case - delete workout
        case 'DELETE_WORKOUT': 
            return {
                // run filter over current workouts
                // each obj in array is a workout
                // make sure workouts ids do not match up with the deleted workout id (payload)
                workouts: state.workouts.filter((workout) => workout._id !== action.payload._id)
            }
        case 'UPDATE_WORKOUT': {
            const updatedWorkout = action.payload
            const updatedWorkouts = state.workouts.map(workout => {
                if (workout._id === updatedWorkout._id) {
                    // swap workout for the updated on if the ids match
                    return updatedWorkout
                }

                // return each workout
                return workout
            })
            // return map of updatedWorkouts
            return {
                workouts: updatedWorkouts
            }
        }
            
        default:
            return state
    }
}

// any children passed inside has access to the context
export const WorkoutsContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(workoutsReducer, {
        // default state - no workouts
        workouts: null
    })
    return (

        // in order to get workouts, get to state.workouts
        // why not set workouts as state directly? - because state.comments, .users, other content
        // need to spread to update workouts, see updates, comments, users
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )
}
