import React, { Component } from "react";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
    };
  }
  render() {
    return <div>{this.formatmenu()}</div>;
  }

  formatmenu() {
    console.log(this.state.type);
    if (this.state.type === "4")
      //topoperator
      return (
        <div>
          <button>Profile</button>
          <button>School Units</button>
          <button>Operators</button>
        </div>
      );
    else if (this.state.type === "1")
      //operator
      return (
        <div>
          <button>Profile</button>
          <button>Books</button>
          <button>Users</button>
          <button>Reservations</button>
          <button>Rentals</button>
          <button>Reviews</button>
        </div>
      );
    else
      return (
        <div>
          <button>Profile</button>
          <button>Books</button>
          <button>Reservations</button>
          <button>Rentals</button>
        </div>
      );
  }
}

export default Menu;
