import React from "react";

const NotefulContext = React.createContext({
  folders: [],
  notes: [],
  removeNote: () => { },
  addNote: () => { },
  addFolder: () => { },
  updateNote: () => { }
});

export default NotefulContext;
