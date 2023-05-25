import React, { Component } from "react";
import Menu from "./Menu";

class Reservations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      type: this.props.type,
    };
  }

  componentDidMount() {
    fetch(`http://localhost:9103/libraries/web/makereservation/${this.state.placedat}`)
      .then((response) => response.json())
      .then((obj) => {
        this.setState({
          ...this.state,
          reservations: obj.map((reservation) => {
            return reservation;
          }),
        });
      });
    console.log(this.state.type);
  }

  render() {
    console.log("Now at Reservations");
    return (
      <div>
        <Menu
          type={this.state.type}
          profile={() => this.props.gotoprofile()}
          reservations={() => this.props.gotoreservations()}
        />
        {this.AddReservation()}
        <div>All Reservations:</div>
        <ul>
          {this.state.reservations.map((reservation) => (
            <li key={reservation.placedat}>
              <button onClick={() => this.props.gotoreservation(reservation.placedat)}>
                {"->"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  AddReservation() {
    if (this.state.type === "1") {
      //operator
      return (
        <div>
          <button onClick={() => this.props.addreservation()}>Add Reservation</button>
        </div>
      );
    }
  }
}

export default Reservations;