import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import ApiContext from '../ApiContext'
import config from '../config'

import './App.css'

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    // Promise.all ([
    //   fetch(`${config.API_ENDPOINT}/api/notes`),
    //   fetch(`${config.API_ENDPOINT}/api/folders`)
    // ])
    // // returning unresolved promises fetch api 
    // // promises have to be resolved by the time you use them 
    //   .then(([notesRes, foldersRes]) => {
    //     // console.log(notesRes.json().then(e => Promise.resolve(e)))
    //     if(!notesRes.ok)
    //       return notesRes.json().then(e => Promise.reject(e))
    //       // instead of rejecting try .resolve
    //     if (!foldersRes.ok)
    //       return foldersRes.json().then(e => Promise.reject(e))
        
    //     return Promise.resolve([notesRes.json(), foldersRes.json()])
    //   })
    //   .then(([notes, folders]) => {
    //     // console.log(notes)
    //     // console.log(folders)
    //     this.setState({ notes, folders })
    //   })
    //   .catch(error => {
    //     console.error({ error })
    //   })
    fetch(`${config.API_ENDPOINT}/api/notes`)
    .then(res => res.json())
    .then(
      notesRes => {
        this.setState({
          notes: notesRes,
        });
      }
    )
    .catch(error => { console.error({error })})
    
  fetch(`${config.API_ENDPOINT}/api/folders`)
    .then(res => res.json())
    .then(
      foldersRes => {
        this.setState({

          folders: foldersRes,
        });
      }
    )
    .catch(error => { console.error({error })})

  }

  handleAddFolder = folder => {
    this.setState({
      folders: [
        ...this.state.folders,
        folder
      ]
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [
        ...this.state.notes,
        note
      ]
    })
  }

  handleDeleteNote = noteId => {
    this.setState({ 
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
  }
    
  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListNav}
          />
        )}
        <Route
          path='/note/:noteId'
          component={NotePageNav}
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
   
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListMain}
          />
        )}
        <Route
          path='/note/:noteId'
          component={NotePageMain}
        />
        <Route
          path='/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-note'
          component={AddNote}
        />
      </>
    )
  }

  updateArticle = () => {};

  render() {
    const value = { 
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote,
      updateNotes: this.updateNotes
    }
    return (
      <ApiContext.Provider value={value}>
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
      </ApiContext.Provider>
    )
  }
}

export default App
