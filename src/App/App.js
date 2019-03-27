import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
//import dummyStore from '../dummy-store'
import APIcontext from '../APIcontext'
//import { getNotesForFolder, findNote, findFolder } from '../notes-helpers'
import './App.css'

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    // fake date loading from API call
    //setTimeout(() => this.setState(dummyStore), 600)
    //api call
    Promise.all([
      fetch('http://localhost:9090/folders'),
      fetch('http://localhost:9090/notes'),
    ]).then(([folderRes, noteRes]) => {
        if (!folderRes.ok) {
          // get the error message from the response,
          return folderRes.json().then(error => {
            // then throw it
            throw error
          })
        }
        if (!noteRes.ok) {
          // get the error message from the response,
          return noteRes.json().then(error => {
            // then throw it
            throw error
          })
        }
        return Promise.all([
          folderRes.json(),
          noteRes.json(),
        ])
      })
      .then(([folderRes, noteRes]) => {
        // call the callback when the request is successful
        // this is where the App component can remove it from state
        this.setState({
          notes:noteRes,
          folders:folderRes,
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  renderNavRoutes() {
    //const { notes, folders } = this.state
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListNav}
            /*render={routeProps =>
              <NoteListNav
                folders={folders}
                notes={notes}
                {...routeProps}
              />
            }*/
          />
        )}
        <Route
          path='/note/:noteId'
          component={NotePageNav}
          /*render={routeProps => {
            const { noteId } = routeProps.match.params
            const note = findNote(notes, noteId) || {}
            const folder = findFolder(folders, note.folderId)
            return (
              <NotePageNav
                {...routeProps}
                folder={folder}
              />
            )
          }}*/
        />
        <Route
          path='/add-folder'
          component={NotePageNav}
        />
        <Route
          path='/add-note'
          component={NotePageNav}
        />
      </>
    )
  }

  renderMainRoutes() {
    // { notes, folders } = this.state
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListMain}
            /*render={routeProps => {
              const { folderId } = routeProps.match.params
              const notesForFolder = getNotesForFolder(notes, folderId)
              return (
                <NoteListMain
                  {...routeProps}
                  notes={notesForFolder}
                />
              )
            }}*/
          />
        )}
        <Route
          path='/note/:noteId'
          component={NotePageMain}
          /*render={routeProps => {
            const { noteId } = routeProps.match.params
            const note = findNote(notes, noteId)
            return (
              <NotePageMain
                {...routeProps}
                note={note}
              />
            )
          }}*/
        />
        <Route
          path='/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-note'
          component={AddNote}
          /*render={routeProps => {
            return (
              <AddNote
                {...routeProps}
                folders={folders}
              />
            )
          }}*/
        />
      </>
    )
  }

  addNote = note => {
    this.setState({
      notes:[...this.state.notes,note]
    })

  }

  addFolder = folder => {
    this.setState({
      folders:[...this.state.folders,folder]
    })

  }

  deleteNote = note => {
    this.setState({
      notes:this.state.notes.filter(item=>item.id!==note.id)
    })

  }

  render() {
    const contextValue= {
      notes:this.state.notes,
      folders:this.state.folders,
      addNote: this.addNote,
      addFolder:this.addFolder,
      deleteNote:this.deleteNote,
    }
    return (
      <APIcontext.Provider value={contextValue}>
        <div className='App'>
          <nav className='App__nav'>
            {this.renderNavRoutes()}
          </nav>
          <header className='App__header'>
            <h1>
              <Link to='/'>Noteful</Link>
              {' '}
              <FontAwesomeIcon icon='check-double' />
            </h1>
          </header>
          <main className='App__main'>
            {this.renderMainRoutes()}
          </main>
        </div>
      </APIcontext.Provider>
    )
  }
}

export default App
