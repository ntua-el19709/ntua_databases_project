import React, { Component } from "react";
import Menu from "./Menu";

class Reservations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      userID: this.props.userID,
      username: this.props.username,
      schlID: this.props.schlID,
      type: this.props.type,
    };
  }

  componentDidMount() {
    if (this.state.type !== "1")
      //not operator
      fetch(
        `http://localhost:9103/libraries/web/userreservations/${this.state.schlID}/${this.state.userID}`
      )
        .then((response) => response.json())
        .then((obj) => {
          this.setState({
            ...this.state,
            reservations: obj.reservation.map((reservation) => {
              return reservation;
            }),
          });
        });
    else
      fetch(
        `http://localhost:9103/libraries/web/schoolreservations/${this.state.schlID}`
      )
        .then((response) => response.json())
        .then((obj) => {
          this.setState({
            ...this.state,
            reservations: obj.reservation.map((reservation) => {
              return reservation;
            }),
          });
        });
  }

  render() {
    console.log("Now at Reservations");
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
        {this.restext()}
        <ul>
          {this.state.reservations.map((reservation) => (
            <li key={reservation.reservationID}>
              {this.resinfo(reservation)}
              <button
                onClick={() =>
                  this.props.gotoreservation(reservation.reservationID)
                }
              >
                {"->"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  resinfo(reservation) {
    if (this.state.type === "1")
      return (
        "Reservation no " +
        reservation.reservationID +
        " made by " +
        reservation.username
      );
    else return reservation.book;
  }
  restext() {
    if (this.state.type === "1") return <div>All Reservations:</div>;
    else return <div>My Reservations:</div>;
  }
}

export default Reservations;
