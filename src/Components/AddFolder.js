import React from "react";
import NotefulContext from "../NotefulContext";
import ValidationError from "../ValidationError";
import "./AddFolder.css";

export default class AddFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameValid: false,
      formValid: false,
      validationMessage: {
        name: ""
      }
    };
  }

  static contextType = NotefulContext;

  addFolderName(name) {
    this.setState({ name }, () => {
      this.validateName(name);
    });
  }

  folderSubmitHandle = e => {
    e.preventDefault();
    const { id, name } = this.state;
    const folder = { id, name };
    fetch(`https://blooming-forest-89993.herokuapp.com/api/folders`, {
      method: "POST",
      body: JSON.stringify(folder),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Something went wrong, try again later");
        }
        return res.json();
      })
      .then(() => {
        this.setState({
          name: ""
        });
        this.context.addFolder(folder);
        window.location = "/";
      })
      .catch(error => {
        console.error({ error });
      });
  };

  validateName(fieldValue) {
    const fieldErrors = { ...this.state.validationMessage };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.name = "Folder name required";
      hasError = true;
    } else {
      if (fieldValue.length < 3) {
        fieldErrors.name = "Folder name must be at least 3 characters long";
        hasError = true;
      } else {
        fieldErrors.name = "";
        hasError = false;
      }
    }
    this.setState(
      {
        validationMessage: fieldErrors,
        nameValid: !hasError
      },
      this.formValid
    );
  }

  formValid() {
    this.setState({
      formValid: this.state.nameValid
    });
  }

  render() {
    return (
      <section
        className="add-folder"
        onSubmit={e => this.folderSubmitHandle(e)}
      >
        <h2>Add New Folder</h2>
        <form>
          <label htmlFor="add-folder-input">Folder Name:</label>
          <input
            type="text"
            id="add-folder-input"
            value={this.state.name}
            aria-label="Input for folder name"
            aria-required="true"
            onChange={e => this.addFolderName(e.target.value)}
          />
          <ValidationError
            hasError={!this.state.nameValid}
            message={this.state.validationMessage.name}
          />
          <button type="submit" disabled={!this.state.formValid}>
            Add
          </button>
        </form>
      </section>
    );
  }
}
