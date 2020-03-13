import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddNote.css'
import ValidationError from '../ValidationError/ValidationError';


class AddNote extends Component {
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
      canSubmit: false,
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


  handleSubmit = e =>  {
    
    e.preventDefault()
    
    const newNote = { 
      name: e.target['note-name-input'].value,
      content: e.target['note-content-input'].value,
      folder_id: e.target['note-folder-select'].value,

    }
    console.log(newNote);
    // checks validations 
    if(this.state.formValid === true) {
        // enables submit button 
        this.setState({canSubmit: true})
        // POST to endpoint on submit
        fetch(`${config.API_ENDPOINT}/api/notes`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(newNote),
        })
          .then(res => {
            if (!res.ok)
               
              return res.json()(e => Promise.reject(e))
            return res.json()
          })
          .then(note => {
            this.context.addNote(note)
            console.log(note)
            this.props.history.push(`/note/${note.id}`)
          })
          .catch(error => {
            console.error({ error })
          })   
    } else {
      // disables submit button until formValid  is true
       this.setState({canSubmit: false})
       
    }
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
    // checks to make sure the validation checks are true and changes state of formValid to true
    this.setState({
      formValid: this.state.nameValid && this.state.noteContentValid && this.state.folderValid
      
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
      fieldErrors.noteContent = 'Content is required';
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
    const isEnabled = this.state.canSubmit;
 
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
            <button type='submit' disabled={isEnabled} >
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}

AddNote.propType = { 
  folders: PropTypes.array,
}

export default AddNote;
