import React, { Component } from "react";
import styles from "../CSS/mystyle.module.css";
import add from "../icons/add.png";
import back from "../icons/back.png";
import delet from "../icons/delete.png";
import edit from "../icons/pencil.png";
import rent from "../icons/rent.png";
import reserve from "../icons/reserve.png";

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      schlID: this.props.schlID,
      ISBN: this.props.ISBN,
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
      ok1: 0, //there are no late rentals
      ok2: 0, //there are no ongoing rentals
      ok3: 0, //the reservation restrictions are met
    };
  }

  componentDidMount() {
    if (this.state.type !== "1") {
      //not operator
      fetch(
        `http://localhost:9103/libraries/web/lateuserrentals/${this.state.userID}`
      )
        .then((response) => response.json())
        .then((obj) => {
          let ok = 0;
          if (obj.lateUserRentals.length === 0) ok = 1;
          this.setState({
            ...this.state,
            ok1: ok,
          });
        });
      fetch(
        `http://localhost:9103/libraries/web/ongoinguserrentals/${this.state.userID}`
      )
        .then((response) => response.json())
        .then((obj) => {
          let ok = 0;
          if (obj.ongoingeUserRentals.length === 0) ok = 1;
          this.setState({
            ...this.state,
            ok2: ok,
          });
        });
      fetch(
        `http://localhost:9103/libraries/web/userreservations/${this.state.schlID}/${this.state.userID}`
      )
        .then((response) => response.json())
        .then((obj) => {
          console.log(obj);
          let ok = 0;
          if (obj.reservation.length < 2 && this.state.type === "3")
            ok = 1; //student
          else if (obj.reservation.length < 1 && this.state.type === "2")
            ok = 1; //professor
          this.setState({
            ...this.state,
            ok3: ok,
          });
        });
    }
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

  //onopButtons = () => {};

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
    if (
      this.state.type !== "1" &&
      this.state.ok1 === 1 &&
      this.state.ok2 === 1 &&
      this.state.ok3 === 1
    )
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
    else if (
      this.state.type !== "1" &&
      (this.state.ok1 === 0 || this.state.ok2 === 0)
    )
      this.setState({
        ...this.state,
        message:
          "You can not reserve a book, if you do not return the book(s) you have rent!",
      });
    else if (this.state.type !== "1" && this.state.ok3 === 0)
      this.setState({
        ...this.state,
        message: "You have reached the maximum number of reservations!",
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
      <div className={styles.school}>
        <table>
          <tr>
            <th>ISBN:</th>
            <td>{this.state.ISBN}</td>
          </tr>
          <tr>
            <th>Title:</th>
            <td>
              {this.state.title}
              <span title="See Reviews">
                <button
                  onClick={() => this.props.gotoreviewsofbook()}
                  className={styles.button3}
                >
                  Reviews
                </button>
              </span>
            </td>
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
            <td>
              {this.state.available_copies}
              {this.opButtons1()}
            </td>
          </tr>
        </table>
        {this.opButtons()}
        {this.reserveBook()}
        <div className={styles.mess}>{this.state.message}</div>
      </div>
    );
  }

  opButtons1() {
    if (this.state.type === "1") {
      //operator
      return (
        <span title="Add Copy">
          <button onClick={this.addCopy} className={styles.iconbut2}>
            <img src={add} alt="Add Copy" />
          </button>
        </span>
      );
    }
  }

  opButtons() {
    if (this.state.type === "1") {
      //operator
      return (
        <div>
          <span title="Edit Book">
            <button
              onClick={() => this.props.gotoeditbook()}
              className={styles.iconbut2}
            >
              <img src={edit} alt="Edit Book" />
            </button>
          </span>
          <span title="Delete Book">
            <button onClick={this.DeleteBook} className={styles.iconbut2}>
              <img src={delet} alt="Delete Book" />
            </button>
          </span>
          <span title="Rent Book">
            <button
              onClick={() => this.props.addrental()}
              className={styles.iconbut2}
            >
              <img src={rent} alt="Rent Book" />
            </button>
          </span>

          <span title="Back">
            <button
              onClick={() => this.props.gotobooks()}
              className={styles.iconbut2}
            >
              <img src={back} alt="Back" />
            </button>
          </span>
        </div>
      );
    }
  }

  reserveBook() {
    if (this.state.type !== "1")
      return (
        <div>
          <span title="Reserve Book">
            <button onClick={this.ReserveBook} className={styles.iconbut2}>
              <img src={reserve} alt="Reserve Book" />
            </button>
          </span>
          <span title="Back">
            <button
              onClick={() => this.props.gotobooks()}
              className={styles.iconbut2}
            >
              <img src={back} alt="Back" />
            </button>
          </span>
        </div>
      );
  }
}

export default Book;
