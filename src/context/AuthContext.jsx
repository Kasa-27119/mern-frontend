import { createContext, useReducer, useEffect } from "react";

// create the context
export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default: 
            return state
    }
}

// provider
export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {user: null})

    // check if the local storage has a user
    useEffect(() => {
        // parse turns json back to js
        const user = JSON.parse(localStorage.getItem('user'))

        // if there's a user return local storage user
        if (user) {
            dispatch({type: 'LOGIN', payload: user})
        }
    }, [])

    // check state
    console.log('auth context state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

