import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

// exporting custom context hook
export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext)

    // checking if we are inside the WorkoutContextProvider
    // if provider is missing, throws an error
    if (!context) {
        throw Error('useWorkoutsContext hook must be used inside of WorkoutsContextProvider')
    }

    return context
}