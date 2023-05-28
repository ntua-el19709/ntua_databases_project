import React, { Component } from "react";

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      schlID: this.props.schlID,
      ISBN: this.props.ISBN,
      placedat: this.props.placedat,
      userID: this.props.userID,
      title: "",
      authors: [],
      categories: [],
      publisher: "",
      pages: "",
      summary: "",
      language: "",
      available_copies: "",
      message: "",
    };
  }

  componentDidMount() {
    fetch(
      `http://localhost:9103/libraries/web/bookinfo/${this.state.schlID}/${this.state.ISBN}`
    )
      .then((response) => response.json())
      .then((obj) => {
        this.setState({
          ...this.state,
          title: obj.title,
          authors: obj.authors.map((author) => {
            return author;
          }),
          categories: obj.categories.map((category) => {
            return category;
          }),
          publisher: obj.publisher,
          pages: obj.pages,
          summary: obj.sumary,
          language: obj.language,
          available_copies: obj.copies,
        });
      });
    console.log(this.state.type);
  }

  //onEditBook = () => {};

  DeleteBook = () => {
    fetch(
      `http://localhost:9103/libraries/web/deletebook/${this.state.schlID}/${this.state.ISBN}`,
      {
        method: "POST",
        mode: "cors",
      }
    ).then(() => {
      this.setState({
        ...this.state,
        message: "Book Deleted",
      });
    });
  };

  ReserveBook = () => {
    if (this.state.type !== "1")
      //not operator
      fetch(
        `http://localhost:9103/libraries/web/makereservation/${this.state.userID}/${this.state.ISBN}/${this.state.schlID}`,
        {
          method: "POST",
          mode: "cors",
        }
      ).then(() => {
        this.setState({
          ...this.state,
          message: "Book Reserved",
        });
      });
  };

  addCopy = () => {
    let newcopiesnum = Number(this.state.available_copies);
    newcopiesnum = newcopiesnum + 1;
    let newcopies = newcopiesnum.toString();
    console.log(newcopiesnum, newcopies);
    fetch(
      `http://localhost:9103/libraries/web/changebook/${this.state.ISBN}/${this.state.schlID}/${this.state.title}/${this.state.publisher}/${this.state.pages}/${this.state.summary}/${this.state.language}/${newcopies}`,
      {
        method: "POST",
        mode: "cors",
      }
    ).then(() => {
      fetch(
        `http://localhost:9103/libraries/web/bookinfo/${this.state.schlID}/${this.state.ISBN}`
      )
        .then((response) => response.json())
        .then((obj) => {
          this.setState({
            ...this.state,
            title: obj.title,
            authors: obj.authors.map((author) => {
              return author;
            }),
            categories: obj.categories.map((category) => {
              return category;
            }),
            publisher: obj.publisher,
            pages: obj.pages,
            summary: obj.sumary,
            language: obj.language,
            available_copies: obj.copies,
          });
        });
    });
  };

  render() {
    console.log("Now at Book");
    return (
      <div>
        <table>
          <tr>
            <th>ISBN:</th>
            <td>{this.state.ISBN}</td>
          </tr>
          <tr>
            <th>Title:</th>
            <td>{this.state.title}</td>
          </tr>
          <tr>
            <th>{"Author(s)"}:</th>
            <td>
              <ul>
                {this.state.authors.map((author) => (
                  <li>{author.author_fullname}</li>
                ))}
              </ul>
            </td>
          </tr>
          <tr>
            <th>{"Category(/ies):"}</th>
            <td>
              <ul>
                {this.state.categories.map((category) => (
                  <li>{category.category}</li>
                ))}
              </ul>
            </td>
          </tr>
          <tr>
            <th>Publisher:</th>
            <td>{this.state.publisher}</td>
          </tr>
          <tr>
            <th>Pages:</th>
            <td>{this.state.pages}</td>
          </tr>
          <tr>
            <th>Summary:</th>
            <td>{this.state.summary}</td>
          </tr>
          <tr>
            <th>Language:</th>
            <td>{this.state.language}</td>
          </tr>
          <tr>
            <th>Available_copies:</th>
            <td>{this.state.available_copies}</td>
          </tr>
        </table>
        {this.EditBook()}
        {this.deleteBook()}
        <button onClick={this.ReserveBook}>Reserve Book</button>
        {this.MakeReview()}
        <div>{this.state.message}</div>
        <button onClick={() => this.props.gotobooks()}>{"<-"}</button>
      </div>
    );
  }

  EditBook() {
    if (this.state.type === "1") {
      //operator
      return (
        <div>
          <button onClick={this.addCopy}>Add Copy</button>
        </div>
      );
    }
  }

  deleteBook() {
    if (this.state.type === "1") {
      //operator
      return (
        <div>
          <button onClick={this.DeleteBook}>Delete Book</button>
        </div>
      );
    }
  }

  MakeReview() {
    if (this.state.type !== "1") {
      //student or professor
      return (
        <div>
          <button onClick={() => this.props.makereview()}>Review</button>
        </div>
      );
    }
  }
}

export default Book;
