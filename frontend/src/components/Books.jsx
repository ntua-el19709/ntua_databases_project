import React, { Component } from "react";
import Menu from "./Menu";

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      type: this.props.type,
    };
  }

  componentDidMount() {
    fetch(`http://localhost:9103/libraries/web/allbooks`)
      .then((response) => response.json())
      .then((obj) => {
        this.setState({
          ...this.state,
          books: obj.map((book) => {
            return book;
          }),
        });
      });
    console.log(this.state.type);
  }

  render() {
    console.log("Now at Books");
    return (
      <div>
        <Menu
          type={this.state.type}
          profile={() => this.props.gotoprofile()}
          books={() => this.props.gotobooks()}
        />
        <button onClick={() => this.props.addbook()}>New Book</button>
        <div>All Books:</div>
        <ul>
          {this.state.books.map((book) => (
            <li key={book.ISBN}>
              {book.title}
              <button onClick={() => this.props.gotobook(book.ISBN)}>
                {"->"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Books;