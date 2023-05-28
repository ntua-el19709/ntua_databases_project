import React, { Component } from "react";
import Menu from "./Menu";

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      type: this.props.type,
      schlID: this.props.schlID,
    };
  }

  componentDidMount() {
    fetch(`http://localhost:9103/libraries/web/allbooks/${this.state.schlID}`)
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
          users={() => this.props.gotousers()}
          reservations={() => this.props.gotoreservations()}
          rentals={() => this.props.gotorentals()}
          reviews={() => this.props.gotoreviews()}
        />
        {this.AddBook()}
        <div>All Books:</div>
        <ul>
          {this.state.books.map((book) => (
            <li key={book.ISBN}>
              {book.title}
              <button onClick={() => this.props.gotobook(book.isbn)}>
                {"->"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  AddBook() {
    if (this.state.type === "1") {
      //operator
      return (
        <div>
          <button onClick={() => this.props.addbook()}>Add Book</button>
        </div>
      );
    }
  }
}

export default Books;
