import React from "react";
import FolderList from "./FolderList";
import NoteList from "./NoteList";

class Noteful extends React.Component {
  render() {
    return (
      <div className="Grid-container">
        <nav>
          <FolderList {...this.props} />
        </nav>
        <main>
          <NoteList {...this.props} />
        </main>
      </div>
    );
  }
}

export default Noteful;
