import { createContext, useEffect, useState } from "react"
import axios from 'axios'

export const UserContextCreator = createContext()

export const UserContextProvider = ({children}) => {

    const [user, setUser] = useState({})

    useEffect(() => {axios.get('/auth/me').then(resp => setUser(resp.data.user))}, [user])
    
    return (
        <>
            <UserContextCreator.Provider value={{user}}>
                {children}
            </UserContextCreator.Provider>
        </>
    )
}

