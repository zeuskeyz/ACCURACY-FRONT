import React, { createContext, useState } from 'react'

export const ThemeCreator = createContext()

export const ThemeProvider = ({children}) => {

    const [dark, setDark] = useState(false);

    return (
      <>
          <ThemeCreator.Provider value= {{dark, setDark}}>
              {children}
          </ThemeCreator.Provider>
        
      </>
    )
}