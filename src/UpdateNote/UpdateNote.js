
import React from 'react'
import ApiContext from '../ApiContext'
// import config from '../config'


class UpdateNote extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      value: '',
    } 
    this.handleChange = this.handleChange.bind(this);
  }
  static defaultProps = {
    onUpdateNote: () => {},
    
  }

  static contextType = ApiContext;

  handleChange(event) {
    // mostly works need to add validation and update to server with PATCH
    this.setState({value: event.target.value});
  }

  handleClickUpdate = e => {
    e.preventDefault()
    
    const note = {
        id : this.props.id,
        // add this plus submit's value 
        content: this.props.content
        }
    console.log (note)

    // fetch(`${config.API_ENDPOINT}/api/notes/${noteId}`, {
    //   method: 'PATCH',
    //   headers: { 
    //     'content-type': 'application/json'
    //   },
    // })
    //   // .then(res)
    //   .then(res => {
    //     console.log(res)
    //     if (!res.ok)
          
    //       return res.json().then(e => Promise.reject(e))
    //     return res.json()
        
    //   })
    //   .then(() => { 
    //     this.context.updateNote(noteId)

    //     this.props.onUpdateNote(noteId)
    //   })
    //   .catch(error => {
    //     console.error({ error })
    //     console.log(error)
    //   })
  }
  render() {

    const name = this.props.content
    return (
      <form onSubmit>
  <textarea id='note-content-update' value={name + this.state.value} onChange={this.handleChange} />
          
        <button className='Note__update' type='submit' onClick={this.handleClickUpdate} >
          {/* <FontAwesomeIcon icon='trash-alt' /> */}
          {/* {' '} */}
          add to note
        </button> 
      </form>
    )

  }
}

export default UpdateNote;






