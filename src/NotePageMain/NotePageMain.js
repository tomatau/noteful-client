import React from 'react'
import { PropTypes } from 'prop-types'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { findNote } from '../notes-helpers'
import './NotePageMain.css'

class NotePageMain extends React.Component {
  static defaultProps = {
    match: { 
      params: {}
    }
  }
  static contextType = ApiContext

  handleDeleteNote = () => {
    this.props.history.push(`/`)
  }
   
  render() {
    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    // findNote does not work because noteId doesn't = the array index, I think fetch 
    const note = findNote(notes, noteId) || { content: '' }
    return (
      <section className='NotePageMain'>
        <Note
          key
          id={note.id}
          name={note.name}
          modified={note.modified}

        />

       
       
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  } 
}

NotePageMain.propTypes = {
  match: PropTypes.object
}

export default NotePageMain