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
      users: [],
      selected: 0,
    };
  }

  componentDidMount() {
    if (this.state.type === "1") {
      //operator
      fetch(
        `http://localhost:9103/libraries/web/approvedusersofschl/${this.state.schlID}`
      )
        .then((response) => response.json())
        .then((obj) => {
          console.log(obj);
          this.setState({
            ...this.state,
            users: obj.approvedUsers.map((user) => {
              return user;
            }),
          });
        });
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

  clear = () => {
    this.setState(
      {
        ...this.state,
        selected: 0,
      },
      () => {
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
      }
    );
  };

  selectUser = (val) => {
    this.setState(
      {
        ...this.state,
        userID: val.target.value,
        selected: 1,
      },
      () => {
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
    );
  };

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
        {this.filteruser()}
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
  filteruser() {
    if (this.state.type === "1")
      //operator
      return (
        <table>
          <tr>
            <th>Filter by username:</th>
            <td>
              <form>
                <select multiple name="username" onChange={this.selectUser}>
                  {this.state.users.map((user) => (
                    <option value={user.userID}>{user.username}</option>
                  ))}
                </select>
              </form>
              <button onClick={this.clear}>Clear</button>
            </td>
          </tr>
        </table>
      );
  }
  rentalinfo(rental) {
    if (this.state.type === "1" && this.state.selected === 0)
      //operator
      return "Rental no " + rental.renID + " made by " + rental.username;
    else if (this.state.type === "1")
      return "Rental no " + rental.renID + " of book '" + rental.book + "' ";
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
