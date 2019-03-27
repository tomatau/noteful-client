import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddFolder.css'
import APIcontext from '../APIcontext';


export default class AddFolder extends Component {
  static contextType =APIcontext;

  handleAddFolder(event){
    event.preventDefault()
    const folderName = {
      name: event.target['folder-name-input'].value,
    }
    fetch('http://localhost:9090/folders', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': `application/json`
      }),
      body: JSON.stringify(folderName),
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
        // call the callback when the request is successful
        // this is where the App component can remove it from state
        this.context.addFolder(data);
      })
      .catch(error => {
        console.error(error)
      })

  }

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleAddFolder}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' />
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
