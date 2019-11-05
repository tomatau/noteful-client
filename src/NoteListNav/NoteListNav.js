import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ErrorBourdaryNav from '../ErrorBoundaryNav/ErrorBoudaryNav'
import ApiContext from '../ApiContext'
import Folder from '../Folder/Folder'
import { PropTypes } from 'prop-types'
import './NoteListNav.css'



 class NoteListNav extends React.Component {
  static contextType = ApiContext;


  

  render() {
    const { folders=[], notes=[] } = this.context;

    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>

          {folders.map(folder =>
            <ErrorBourdaryNav key={folder.id}>

              <li key={folder.id}>
                <Folder 
                  id={folder.id}
                  name={folder.name}
                  notes={notes}
                />
              </li>              
            </ErrorBourdaryNav>
          )}            
        </ul>
        <div className='NoteListNav__button-wrapper'>
          <CircleButton
            tag={Link}
            to='/add-folder'
            type='button'
            className='NoteListNav__add-folder-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Folder
          </CircleButton>
        </div>
      </div>
    );
  }
}

NoteListNav.propTypes = {
  folders: PropTypes.array,
  notes: PropTypes.array
};

export default NoteListNav;