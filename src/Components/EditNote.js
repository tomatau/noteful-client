import React from "react";
import "./EditNote.css";
import NotefulContext from "../NotefulContext";
import PropTypes from "prop-types";

export default class EditNote extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object
    }),
    history: PropTypes.shape({
      push: PropTypes.func
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      content: ""
    };
  }

  static contextType = NotefulContext;

  componentDidMount() {
    const { noteId } = this.props.match.params;
    fetch(`https://blooming-forest-89993.herokuapp.com/api/notes/${noteId}`, {
      method: "Get",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(error => Promise.reject(error));

        return res.json();
      })
      .then(responseData => {
        this.setState({
          name: responseData.name,
          content: responseData.content
        });
      })
      .catch(error => {
        this.setState(error);
      });
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handleContentChange = e => {
    this.setState({ content: e.target.value });
  };

  handleEditSubmit = e => {
    e.preventDefault();
    const { noteId } = this.props.match.params;
    const { id, name, content } = this.state;
    const newNote = { id, name, content };
    fetch(`https://blooming-forest-89993.herokuapp.com/api/notes/${noteId}`, {
      method: "PATCH",
      body: JSON.stringify(newNote),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(error => Promise.reject(error));
      })
      .then(() => {
        this.context.updateNote(newNote);
        window.location = "/";
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  handleClickCancel = () => {
    this.props.history.push("/");
  };

  render() {
    const { name, content } = this.state;
    return (
      <section className="Edit-Note-Form">
        <form onSubmit={this.handleEditSubmit}>
          <h2>Edit Note</h2>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={this.handleNameChange}
          />
          <label htmlFor="content">Content:</label>
          <input
            type="text"
            name="content"
            id="content"
            value={content}
            onChange={this.handleContentChange}
          />
          <button>Edit</button>
          <button type="button" onClick={this.handleClickCancel}>
            Cancel
          </button>
        </form>
      </section>
    );
  }
}
