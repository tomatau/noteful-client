import React from 'react'

const AppContext = React.createContext({
    notes: [],
    folders: [],
    deleteNote: () => {}
})

export default AppContext;