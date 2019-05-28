import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddNote.css'
import ValidationError from '../ValidationError/ValidationError'

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

  handleSubmit(event) {
    event.preventDefault();
    const {name, noteContent, folder} = this.state;
    console.log('Name: ', name);
    console.log('Note Content: ', noteContent);
    //only logs the folder.id
    console.log('Folder:', folder);
    //log to server here
  }

  validateName(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0) {
      fieldErrors.name = 'Name is required';
      hasError = true;
    } else {
      if (fieldValue.length < 3) {
        fieldErrors.name = 'Name must be at least 3 characters long';
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
      hasError = false;
    }
    
    this.setState({
      validationMessages: fieldErrors,
      noteContentValid: !hasError
    }, this.formValid );
  }

  validateFolder(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    // fieldValue = fieldValue.trim();

    if(fieldValue === '...' ) {
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

  formValid() {
    this.setState({
      formValid: this.setState.nameValid && this.setState.noteContentValid && this.setState.formValid
    });
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



  static defaultProps = {
    folders: [],  
  }


  render() {
    const { folders } = this.props
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm onSubmit={e => this.handleSubmit(e)}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note-name-input' onChange={e => this.updateName(e.target.value)} />
            <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name}/>
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input' onChange={e => this.updateNoteContent(e.target.value)} />
            <ValidationError hasError={!this.state.noteContentValid} message={this.state.validationMessages.noteContent}/>
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select' onChange={e => this.updateFolder(e.target.value)}>
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}  >
                  {folder.name}
                </option>
              )}
            </select>
            <ValidationError hasError={!this.state.folderValid} message={this.state.validationMessages.folder}/>
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
