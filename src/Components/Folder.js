import React from "react";
import "./Folder.css";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

class Folder extends React.Component {
  render() {
    return (
      <div className="Individual-folder">
        <NavLink className="link" to={`/folder/${this.props.id}`}>
          {this.props.title}
        </NavLink>
      </div>
    );
  }
}

Folder.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string
};

export default Folder;
