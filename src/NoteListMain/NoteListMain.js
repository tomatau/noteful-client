import React from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import ErrorBoundaryMain from '../ErrorBoundaryMain/ErrorBoundaryMain'
import ApiContext from '../ApiContext'
import { getNotesForFolder } from '../notes-helpers'
import './NoteListMain.css'

class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  render() {
    const { folderId } = this.props.match.params
    const { notes=[] } = this.context
    const notesForFolder = getNotesForFolder(notes, folderId)
    return ( 
      <section className='NoteListMain'>
        <ul>

            {notesForFolder.map(note => 
              <ErrorBoundaryMain key={note.id}>
                <li key={note.id}>
                  <Note 
                    id={note.id}
                    name={note.name}
                    modified={note.modfified}
                  />
                </li>                
              </ErrorBoundaryMain>

            )}
        </ul>
        <div className='NoteListMain__Button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            note
          </CircleButton>
        </div>
      </section>
    )

  }
}

NoteListMain.propType = { 
  match: PropTypes.object,
  params: PropTypes.object,
  notes: PropTypes.array,
  notesForFolder: PropTypes.func,
  
}

export default NoteListMain;
