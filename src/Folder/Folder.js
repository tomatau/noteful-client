import React from 'react'
import { NavLink } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import { countNotesForFolder } from '../notes-helpers'
import config from '../config'
import './Folder.css'






 class Folder extends React.Component {
  static defaultProps ={
    onDeleteFolder: () => {},
  }
  static contextType = ApiContext;
  
  handleClickDelete = e => {
    e.preventDefault()
    const folderId = this.props.id
    const { notes } = this.props

    if(countNotesForFolder(notes, folderId)===0){
      
            fetch(`${config.API_ENDPOINT}/api/folders/${folderId}`, {
        method: 'DELETE',
        headers: { 
          'content-type': 'application/json'
        },
      })
        // .then(res)
        .then(res => {
          console.log(res)
          if (!res.ok)
            
            return res.then(e => Promise.reject(e))
          return res
          
        })
        .then(() => { 
          this.context.deleteFolder(folderId)

          this.props.onDeleteFolder(folderId)
        })
        .catch(error => {
          console.error({ error })
          console.log(error)
        })
    } else {
      console.log("can't delete")
    }

    }
 

  render() {
    // const { notes[] } = this.context
    // const isEnabled = this.state.canDelete;
    const { name, id, notes } = this.props

    return (
      <div className='Folder'>
                                          
        <NavLink
          className='Folder__folder-link'
          to={`/folder/${id}`}
        >
            <span className='Folder__num-notes'>
                {countNotesForFolder(notes, id)}
            </span>
            {name} 
            <button className='Folder__delete' type='button' onClick={this.handleClickDelete}  >
              <FontAwesomeIcon icon='trash-alt' />
              {' '}
            </button>
        </NavLink>


      </div>
    )
  }
}

Folder.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  notes: PropTypes.array,
}

export default Folder;