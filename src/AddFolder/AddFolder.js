import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddFolder.css'

export default class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();
    const name = this.nameInput.current.value;
    console.log('Folder Name: ', name)
    //submit values to server here
    

  }
  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={e => this.handleSubmit(e)}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' ref={this.nameInput} />
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
