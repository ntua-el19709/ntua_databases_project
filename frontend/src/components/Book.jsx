import React, { Component } from "react";

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      schlID: this.props.schlID,
      ISBN: this.props.ISBN,
      placedat: this.props.placedat,
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

  componentDidMount() {
    fetch(`http://localhost:9103/libraries/web/bookinfo/${this.state.schlID}/${this.state.ISBN}`)
      .then((response) => response.json())
      .then((obj) => {
        this.setState({
          ...this.state,
          title: obj.title,
          author: obj.author,
          categories: obj.categories,
          publisher: obj.publisher,
          pages: obj.pages,
          summary: obj.summary,
          language: obj.language,
          available_copies: obj.available_copies,
        });
      });
    console.log(this.state.type);
  }

  //onEditBook = () => {};

  DeleteBook = () => {
    fetch(
      `http://localhost:9103/libraries/web/deletebook/${this.state.ISBN}`,
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
    fetch(
      `http://localhost:9103/libraries/web/userreservations/${this.state.placedat}`,
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
            <th>Author:</th>
            <td>{this.state.author}</td>
          </tr>
          <tr>
            <th>Categories:</th>
            <td>{this.state.categories}</td>
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
        <button onClick={this.DeleteBook}>Delete Book</button>
        <button onClick={this.ReserveBook}>Reserve Book</button>
        <button onClick={() => this.props.makereview()}>Review</button>
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
          <button onClick={() => this.props.editbook()}>Edit Book</button>
        </div>
      );
    }
  }
}

export default Book;