import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddFolder.css'
import PropTypes from "prop-types"

export default class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  static defaultProps = {
    history: {
      push: () => { }
    },
  }


  static contextType = ApiContext;

  handleSubmit = e => {
    e.preventDefault()
    const folder = {
      name: e.target['folder-name'].value
    }
    if (folder.name === "") {
      this.setState({
        hasError: true});
        return;
    }
    else {
      this.setState({
        hasError: false
      });
    }
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(folder => {
        this.context.addFolder(folder)
        this.props.history.push(`/folder/${folder.id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    let errorText
    if (this.state.hasError) {
      errorText = <span id="errorMessage">Folder name can not be empty!</span>
      }
    else {
      errorText = null;
    }

    return (
        <section className='AddFolder'>
          <h2>Create a folder</h2>
          {errorText}
          <NotefulForm onSubmit={this.handleSubmit}>
            <div className='field'>
              <label htmlFor='folder-name-input'>
                Name
              </label>
              <input type='text' id='folder-name-input' name='folder-name' />
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

AddFolder.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  })
}
