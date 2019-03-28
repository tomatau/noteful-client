import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddFolder.css'
import APIcontext from '../APIcontext';


export default class AddFolder extends Component {
  static contextType =APIcontext;

  state ={
    inputName:'',
    inputValid:false,
  };

  setInput = inputName=>{
    //console.log("hello");
    this.setState({inputName}, () =>this.validateInput(inputName));
  };

  validateInput = inputName =>{
    let inputValid=true;
    if(inputName.length===0){
      inputValid=false;
    }
    this.setState({inputValid});

  }

  handleAddFolder = event => {
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
        this.context.addFolder(data);
        this.props.history.push(`/folder/${data.id}`)
      })
      .catch(error => {
        console.error(error)
      })

  }
 
  render() {
    const {inputName,inputValid,}=this.state
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleAddFolder}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
            Name {!inputValid && (<p>Name needs at least one character</p>)}
            </label>
            <input type='text' id='folder-name-input' value={inputName} onChange={e=>this.setInput(e.target.value)} />
          </div>
          <div className='buttons'>
            <button type='submit' disabled={!inputValid}>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
