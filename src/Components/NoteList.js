import React from "react";
import NoteContent from "./NoteContent";
import { Link } from "react-router-dom";
import "./NoteList.css";
import NotefulContext from "../NotefulContext";

class NoteList extends React.Component {
  static contextType = NotefulContext;
  render() {
    let folderId = parseInt(this.props.match.params.folderId);
    let listNotes = this.props.match.params.hasOwnProperty("folderId")
      ? this.context.notes.map(note => {
        if (note.folder === folderId) {
          return (
            <NoteContent
              key={note.id}
              title={note.name}
              id={note.id}
              modified={note.modified}
            />
          );
        }
        return null;
      })
      : this.context.notes.map(note => (
        <NoteContent
          key={note.id}
          title={note.name}
          id={note.id}
          modified={note.modified}
        />
      ));
    return (
      <div className="Note-list-area">
        <ul className="Note-list">{listNotes}</ul>
        <div>
          <Link to="/add-note" className="Add-note-button">
            + Note
          </Link>
        </div>
      </div>
    );
  }
}

export default NoteList;
