import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddNote.css'
import ValidationError from '../ValidationError/ValidationError';


export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      noteContent: '',
      folder: '',
      nameValid: false,
      noteContentValid: false,
      folderValid: false,
      formValid: false,
      validationMessages: {
        name: '',
        noteContent: '',
        folder: '',
      }
    }
  }

  static defaultProps= {
    history: {
      push: () => { }
    },
    folders: [],
  }

  static contextType = ApiContext;

  canBeSubmitted() {
    const { nameValid, noteContentValid, folderValid } = this.state;
    return (
      nameValid === true &&
      noteContentValid === true &&
      folderValid === true
    );
  }

  handleSubmit = e =>  {
    
    e.preventDefault()
    
    const newNote = { 
      name: e.target['note-name-input'].value,
      content: e.target['note-content-input'].value,
      folderId: e.target['note-folder-select'].value,
      modified: new Date(),
    }
 
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNote),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(note => {
        this.context.addNote(note)
        this.props.history.push(`/folder/${note.folderId}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }
  updateName(name) {
    this.setState({name}, () => {this.validateName(name)});
  }

  updateNoteContent(noteContent) {
    this.setState({noteContent}, () => {this.validateNoteContent(noteContent)});
  }

  updateFolder(folder) {
    this.setState({folder}, () => {this.validateFolder(folder)});
  }

 
    

  formValid() {
    this.setState({
      formValid: this.setState.nameValid && this.setState.noteContentValid && this.setState.folderValid
      
    });
  }

  validateName(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;
    fieldValue = fieldValue.trim();
    if(fieldValue.lenght === 0) {
      fieldErrors.name = 'Name is required';
      hasError = true;
    } else { 
      if(fieldValue.length < 3) {
        fieldErrors.name = "Name must be at least 3 characters long";
        hasError = true;
      } else {
        fieldErrors.name = '';
        hasError = false;
      }
    }
    this.setState({
      validationMessages: fieldErrors,
      nameValid: !hasError
    }, this.formValid );
  }



  validateNoteContent(fieldValue) { 
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;
    fieldValue = fieldValue.trim();
    if(fieldValue < 1) {
      fieldErrors.noteContent = 'add a note';
      hasError = true;
    } else {
      fieldErrors.noteContent = '';
      hasError = false
    }
    this.setState({
      validationMessages: fieldErrors,
      noteContentValid: !hasError
    }, this.formValid );
  }

  validateFolder(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;
    if(fieldValue === '...') {
      fieldErrors.folder = 'select a folder';
      hasError = true;
    } else { 
      fieldErrors.folder = '';
      hasError = false;
    }
    this.setState({ 
      validationMessages: fieldErrors,
      folderValid: !hasError
    }, this.formValid );
  }

  render() {
    const { folders=[] } = this.context;
    const isEnabled = this.canBeSubmitted();
 
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note-name-input' onChange={e => this.updateName(e.target.value)} />
            <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name} />
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input' onChange={e => this.updateNoteContent(e.target.value)} />
            <ValidationError hasError={!this.state.noteContentValid} message={this.state.validationMessages.noteContent} />
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select' onChange={e => this.updateFolder(e.target.value)} >
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}  >
                  {folder.name}
                </option>
              )}
            </select>
            <ValidationError hasError={!this.state.folderValid} message={this.state.validationMessages.folder} />
          </div>
          <div className='buttons'>
            <button type='submit'  disabled={!isEnabled}>
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
