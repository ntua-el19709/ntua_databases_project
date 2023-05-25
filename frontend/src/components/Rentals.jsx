import React, { Component } from "react";
import Menu from "./Menu";

class Rentals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rentals: [],
      type: this.props.type,
    };
  }

  componentDidMount() {
    fetch(`http://localhost:9103/libraries/web/makerental/${this.state.rentat}`)
      .then((response) => response.json())
      .then((obj) => {
        this.setState({
          ...this.state,
            rentals: obj.map((rental) => {
            return rental;
          }),
        });
      });
    console.log(this.state.type);
  }

  render() {
    console.log("Now at Rentals");
    return (
      <div>
        <Menu
          type={this.state.type}
          profile={() => this.props.gotoprofile()}
          rentals={() => this.props.gotorentals()}
        />
        {this.AddRental()}
        <div>All Rentals:</div>
        <ul>
          {this.state.rentals.map((rental) => (
            <li key={rental.rentat}>
              <button onClick={() => this.props.gotorental(rental.rentat)}>
                {"->"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
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