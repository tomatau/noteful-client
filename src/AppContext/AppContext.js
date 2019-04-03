import React from 'react'

const AppContext = React.createContext({
    notes: [],
    folders: []
})

export default AppContext;