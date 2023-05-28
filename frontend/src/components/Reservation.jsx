import React, { Component } from "react";

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
          }
        );
      });
  }

  RentBook = () => {
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
      <div>
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
        <button onClick={this.DeleteReservation}>Delete Reservation</button>
        <div>{this.state.message}</div>
        <button onClick={() => this.props.gotoreservations()}>{"<-"}</button>
      </div>
    );
  }

  rentbook() {
    if (this.state.type === "1" && this.state.rented === 0)
      //operator
      return <button onClick={this.RentBook}>Rent Book</button>;
  }
}

export default Reservation;
