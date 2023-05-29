import React, { Component } from "react";
import Menu from "./Menu";

class Rentals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      laterentals: [],
      ongoingrentals: [],
      oldrentals: [],
      type: this.props.type,
      schlID: this.props.schlID,
      userID: this.props.userID,
    };
  }

  componentDidMount() {
    if (this.state.type === "1") {
      //operator
      fetch(
        `http://localhost:9103/libraries/web/lateschoolrentals/${this.state.schlID}`
      )
        .then((response) => response.json())
        .then((obj) => {
          this.setState({
            ...this.state,
            laterentals: obj.lateSchoolRentals.map((rental) => {
              return rental;
            }),
          });
        });
      fetch(
        `http://localhost:9103/libraries/web/ongoingschoolrentals/${this.state.schlID}`
      )
        .then((response) => response.json())
        .then((obj) => {
          this.setState({
            ...this.state,
            ongoingrentals: obj.ongoingSchoolRentals.map((rental) => {
              return rental;
            }),
          });
        });
      fetch(
        `http://localhost:9103/libraries/web/oldschoolrentals/${this.state.schlID}`
      )
        .then((response) => response.json())
        .then((obj) => {
          this.setState({
            ...this.state,
            oldrentals: obj.oldSchoolRentals.map((rental) => {
              return rental;
            }),
          });
        });
    } else {
      fetch(
        `http://localhost:9103/libraries/web/lateuserrentals/${this.state.userID}`
      )
        .then((response) => response.json())
        .then((obj) => {
          this.setState({
            ...this.state,
            laterentals: obj.lateUserRentals.map((rental) => {
              return rental;
            }),
          });
        });
      fetch(
        `http://localhost:9103/libraries/web/ongoinguserrentals/${this.state.userID}`
      )
        .then((response) => response.json())
        .then((obj) => {
          this.setState({
            ...this.state,
            ongoingrentals: obj.ongoingeUserRentals.map((rental) => {
              return rental;
            }),
          });
        });
      fetch(
        `http://localhost:9103/libraries/web/olduserrentals/${this.state.userID}`
      )
        .then((response) => response.json())
        .then((obj) => {
          this.setState({
            ...this.state,
            oldrentals: obj.oldUserRentals.map((rental) => {
              return rental;
            }),
          });
        });
    }
    console.log(this.state.type);
  }

  render() {
    console.log("Now at Rentals");
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
        <div>Late Rentals:</div>
        <ul>
          {this.state.laterentals.map((rental) => (
            <li key={rental.renID}>
              {this.rentalinfo(rental)}
              <button onClick={() => this.props.gotorental(rental.renID)}>
                {"->"}
              </button>
            </li>
          ))}
        </ul>
        <div>Ongoing Rentals:</div>
        <ul>
          {this.state.ongoingrentals.map((rental) => (
            <li key={rental.renID}>
              {this.rentalinfo(rental)}
              <button onClick={() => this.props.gotorental(rental.renID)}>
                {"->"}
              </button>
            </li>
          ))}
        </ul>
        <div>Old Rentals:</div>
        <ul>
          {this.state.oldrentals.map((rental) => (
            <li key={rental.renID}>
              {this.rentalinfo(rental)}
              <button onClick={() => this.props.gotorental(rental.renID)}>
                {"->"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  rentalinfo(rental) {
    if (this.state.type === "1")
      //operator
      return "Rental no " + rental.renID + " made by " + rental.username;
    else return rental.book;
  }
  AddRental() {
    if (this.state.type === "1") {
      //operator
      return (
        <div>
          <button onClick={() => this.props.addrental()}>Add Rental</button>
        </div>
      );
    }
  }
}

export default Rentals;
