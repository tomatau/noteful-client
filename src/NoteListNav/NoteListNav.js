import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ErrorBourdaryNav from '../ErrorBoundaryNav/ErrorBoudaryNav'
import ApiContext from '../ApiContext'
// import { PropTypes } from 'prop-types'
import { countNotesForFolder } from '../notes-helpers'
import './NoteListNav.css'

 class NoteListNav extends React.Component {
  static contextType = ApiContext;

  render() {
    const { folders=[], notes=[] } = this.context
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {/* {console.log(folders)} */}
          {folders.map(folder =>
            <ErrorBourdaryNav key={folder.id}>
              <li key={folder.id}>
                
                <NavLink
                  className='NoteListNav__folder-link'
                  to={`/folder/${folder.id}`}
                >
                  <span className='NoteListNav__num-notes'>
                    {countNotesForFolder(notes, folder.id)}
                  </span>
                  {folder.name}
                </NavLink>
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

// NoteListNav.propTypes = {
//   folders: PropTypes.array,
//   notes: PropTypes.array
// };

export default NoteListNav;