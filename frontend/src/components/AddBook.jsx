import React, { Component } from "react";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ISBN: "",
      title: "",
      author: "",
      categories: "",
      publisher: "",
      pages: "",
      summary: "",
      language: "",
      available_copies: "",
      message: "",
    };
  }

  check() {
    if (this.state.ISBN.length === 0) {
      this.setState({
        ...this.state,
        message: `ISBN is blank!`,
      });
      return 0;
    } else if (this.state.title.length === 0) {
      this.setState({
        ...this.state,
        message: `Title is blank!`,
      });
      return 0;
    } else if (this.state.author.length === 0) {
      this.setState({
        ...this.state,
        message: `Author is blank!`,
      });
      return 0;
    } else if (this.state.categories.length === 0) {
      this.setState({
        ...this.state,
        message: `Categories are blank!`,
      });
      return 0;
    } else if (this.state.publisher.length === 0) {
      this.setState({
        ...this.state,
        message: `Publisher is blank!`,
      });
      return 0;
    } else if (this.state.pages.length === 0) {
      this.setState({
        ...this.state,
        message: `Pages number is blank!`,
      });
      return 0;
    } else if (this.state.summary.length === 0) {
        this.setState({
          ...this.state,
          message: `Summary is blank!`,
        });
        return 0;
      } else if (this.state.language.length === 0) {
        this.setState({
          ...this.state,
          message: `Language is blank!`,
        });
        return 0;
      } else if (this.state.available_copies.length === 0) {
        this.setState({
          ...this.state,
          message: `Available copies number is blank!`,
        });
        return 0;
      }
    this.setState({ ...this.state, message: "Book Added!" });
    return 1;
  }

  onAddBook = () => {
    let okay = this.check();
    if (okay === 1) {
      fetch(
        `http://localhost:9103/libraries/web/newbook/${this.state.ISBN}/${this.state.title}/${this.state.author}/${this.state.categories}/${this.state.publisher}/${this.state.pages}/${this.state.summary}/${this.state.language}/${this.state.available_copies}`,
        {
          method: "POST",
          mode: "cors",
        }
      );
    }
  };

  render() {
    console.log("Now at AddBook");
    return (
      <div>
        <table>
          <tr>
            <th>ISBN:</th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, ISBN: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Title:</th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, title: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Author:</th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, author: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Categories:</th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, categories: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Publisher:</th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, publisher: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Pages:</th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, pages: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Summary:</th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, summary: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Language:</th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, language: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Available Copies:</th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, available_copies: val.target.value })
                }
              />
            </td>
          </tr>
        </table>
        <button onClick={this.onAddBook}>Add Book</button>
        <div>{this.state.message}</div>
        <button onClick={() => this.props.gotobooks()}>{"<-"}</button>
      </div>
    );
  }
}

export default AddBook;