import React, { Component } from "react";
import Menu from "./Menu";
import styles from "../CSS/mystyle.module.css";
import add from "../icons/add.png";

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
          queries={() => this.props.gotoqueries()}
        />

        <div className={styles.resren1}>All Books:</div>
        {this.AddBook()}
        <ul className={styles.old}>
          {this.state.books.map((book) => (
            <li key={book.ISBN} onClick={() => this.props.gotobook(book.isbn)}>
              {book.title}
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
          <span title="Add Book">
            <button
              onClick={() => this.props.addbook()}
              className={styles.iconbut}
            >
              <img src={add} alt="Add Book" />
            </button>
          </span>
        </div>
      );
    }
  }
}

export default Books;
