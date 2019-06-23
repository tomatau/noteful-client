import React, { Component } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import "./NoteContent.css";
import NotefulContext from "../NotefulContext";
import PropTypes from "prop-types";

class NoteContent extends Component {
  static defaultProps = {
    onDeleteNote: () => { }
  };
  static contextType = NotefulContext;

  handleClickDelete = e => {
    e.preventDefault();
    const noteId = this.props.id;

    fetch(`https://shielded-bayou-42227.herokuapp.com/api/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(error => Promise.reject(error));
        return null; //res.json();
      })
      .then(() => {
        this.context.removeNote(noteId);
        this.props.onDeleteNote(noteId);
      })
      .catch(error => {
        console.error({ error });
      });
  };

  render() {
    const { title, id, modified } = this.props;
    return (
      <li className="Note-content">
        <h2 className="Note-name">
          <Link to={`/note/${id}`} className="link">
            {title}
          </Link>
        </h2>
        <div className="Modified-date-area">
          <p>Modified:</p>
          <span className="Modified-date">
            {format(modified, "MM/DD/YYYY")}
            <button
              className="Remove-button"
              type="button"
              onClick={this.handleClickDelete}
            >
              Remove
            </button>
            <button className="Edit-button">
              <Link className="Edit-link" to={`/edit-note/${id}`}>
                Edit
              </Link>
            </button>
          </span>
        </div>
      </li>
    );
  }
}

NoteContent.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  onDeleteNote: PropTypes.func
};

export default NoteContent;
