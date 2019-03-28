import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddNote.css'
import APIcontext from '../APIcontext';

export default class AddNote extends Component {
  /*static defaultProps = {
    folders: [],
  }*/

  static contextType = APIcontext;

  handleAddNote = event =>{
    event.preventDefault()
    const Note = {
      name: event.target['note-name-input'].value,
      content: event.target['note-content-input'].value,
      folderId:event.target['note-folder-select'].value,
      modified: new Date(),
    }
    fetch('http://localhost:9090/notes', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': `application/json`
      }),
      body: JSON.stringify(Note),
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        this.context.addNote(data);
        this.props.history.push(`/folder/${data.folderId}`)
      })
      .catch(error => {
        console.error(error)
      })

  }

  render() {
    const { folders } = this.context
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm onSubmit ={this.handleAddNote}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note-name-input' />
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input' />
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select'>
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
