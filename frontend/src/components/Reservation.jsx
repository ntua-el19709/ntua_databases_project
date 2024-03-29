import React, { Component } from "react";
import styles from "../CSS/mystyle.module.css";
import back from "../icons/back.png";
import delet from "../icons/delete.png";
import rent from "../icons/rent.png";

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resID: this.props.resID,
      isbn: "",
      schlID: this.props.schlID,
      placedat: "",
      username: "",
      userID: "",
      usertype: "",
      schlname: "",
      book: "",
      type: this.props.type,
      message: "",
      title: "",
      publisher: "",
      pages: "",
      summary: "",
      language: "",
      available_copies: "",
      rented: 0,
      ok1: 0, //user has not any late rentals
      ok2: 0, //user has not reached max number of rentals
    };
    console.log(this.state.type);
  }

  componentDidMount() {
    fetch(
      `http://localhost:9103/libraries/web/reservationinfo/${this.state.resID}`
    )
      .then((response) => response.json())
      .then((obj) => {
        this.setState(
          {
            ...this.state,
            book: obj.book,
            username: obj.username,
            placedat: obj.placed_at,
            isbn: obj.isbn,
            userID: obj.userID,
          },
          () => {
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
              `http://localhost:9103/libraries/web/bookinfo/${this.state.schlID}/${this.state.isbn}`
            )
              .then((response) => response.json())
              .then((obj) => {
                this.setState({
                  ...this.state,
                  title: obj.title,
                  publisher: obj.publisher,
                  pages: obj.pages,
                  summary: obj.sumary,
                  language: obj.language,
                  available_copies: obj.copies,
                });
              });
            fetch(
              `http://localhost:9103/libraries/web/findtype/${this.state.username}`
            )
              .then((response) => response.json())
              .then((obj) => {
                this.setState(
                  {
                    ...this.state,
                    usertype: obj.type,
                  },
                  () => {
                    fetch(
                      `http://localhost:9103/libraries/web/ongoinguserrentals/${this.state.userID}`
                    )
                      .then((response) => response.json())
                      .then((obj) => {
                        let ok = 0;
                        if (
                          obj.ongoingeUserRentals.length === 0 &&
                          this.state.usertype === "2"
                        )
                          ok = 1;
                        else if (
                          obj.ongoingeUserRentals.length < 2 &&
                          this.state.usertype === "3"
                        )
                          ok = 1;
                        this.setState({
                          ...this.state,
                          ok2: ok,
                        });
                      });
                  }
                );
              });
          }
        );
      });
  }

  check() {
    if (this.state.ok1 === 0) {
      this.setState({
        ...this.state,
        message: `The user has late rentals!`,
      });
      return 0;
    } else if (this.state.ok2 === 0) {
      this.setState({
        ...this.state,
        message: `The user has reached the maximum number of rentals!`,
      });
      return 0;
    } else if (this.state.available_copies === 0) {
      this.setState({
        ...this.state,
        message: `This book is not available right now!`,
      });
      return 0;
    }
    return 1;
  }

  RentBook = () => {
    let okay = this.check();
    if (okay === 1) {
      fetch(
        `http://localhost:9103/libraries/web/deletereservation/${this.state.resID}`,
        {
          method: "POST",
          mode: "cors",
        }
      ).then(() => {
        fetch(
          `http://localhost:9103/libraries/web/makerental/${this.state.userID}/${this.state.isbn}/${this.state.schlID}`,
          {
            method: "POST",
            mode: "cors",
          }
        ).then(() => {
          this.setState({
            ...this.state,
            message: "Rental Made!!",
            rented: 1,
          });
        });
      });

      let newcopiesnum = Number(this.state.available_copies);
      newcopiesnum = newcopiesnum - 1;
      let newcopies = newcopiesnum.toString();
      console.log(newcopiesnum, newcopies);
      fetch(
        `http://localhost:9103/libraries/web/changebook/${this.state.isbn}/${this.state.schlID}/${this.state.title}/${this.state.publisher}/${this.state.pages}/${this.state.summary}/${this.state.language}/${newcopies}`,
        {
          method: "POST",
          mode: "cors",
        }
      );
    }
  };

  DeleteReservation = () => {
    fetch(
      `http://localhost:9103/libraries/web/deletereservation/${this.state.resID}`,
      {
        method: "POST",
        mode: "cors",
      }
    ).then(() => {
      this.setState({
        ...this.state,
        message: "Reservation Deleted",
      });
    });
  };

  render() {
    console.log("Now at Reservation");
    return (
      <div className={styles.school}>
        <table>
          <tr>
            <th>Username:</th>
            <td>
              <td>{this.state.username}</td>
            </td>
          </tr>
          <tr>
            <th>Book:</th>
            <td>
              <td>{this.state.book}</td>
            </td>
          </tr>
          <tr>
            <th>Placed at:</th>
            <td>
              <td>{this.state.placedat}</td>
            </td>
          </tr>
        </table>
        {this.rentbook()}
        <span title="Delete Reservation">
          <button onClick={this.DeleteReservation} className={styles.iconbut2}>
            <img src={delet} alt="Delete RReservation" />
          </button>
        </span>
        <span title="Back">
          <button
            onClick={() => this.props.gotoreservations()}
            className={styles.iconbut2}
          >
            <img src={back} alt="Back" />
          </button>
        </span>
        <div className={styles.mess}>{this.state.message}</div>
      </div>
    );
  }

  rentbook() {
    if (this.state.type === "1" && this.state.rented === 0)
      //operator
      return (
        <span title="Rent Book">
          <button onClick={this.RentBook} className={styles.iconbut2}>
            <img src={rent} alt="Rent Book" />
          </button>
        </span>
      );
  }
}

export default Reservation;
