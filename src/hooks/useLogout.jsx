// import useContext
import {useAuthContext} from '../hooks/useAuthContext'

export const useLogout = () => {
    const {dispatch} = useAuthContext()

    const logout = () => {
        // remove user from local storage
        localStorage.removeItem('user')

        // dispatch - logout type - remove user
        dispatch({type: 'LOGOUT'})
    }

    return {logout}
}