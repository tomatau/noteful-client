import React from 'react'

export default React.createContext({
    notes: [],
    folders: [],
    modified: [],
    addFolder: () => {},
    addNote: () => {},
    deleteNote: () => {},
    deleteFolder: () => {},
    updateNotes: () => {},
})