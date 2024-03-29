import React, { Component } from "react";
import Menu from "./Menu";
import styles from "../CSS/mystyle.module.css";
import exx from "../icons/exx.png";

class Reservations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      userID: this.props.userID,
      username: this.props.username,
      schlID: this.props.schlID,
      type: this.props.type,
      users: [],
      selected: 0,
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
    else {
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
  }

  clear = () => {
    this.setState(
      {
        ...this.state,
        selected: 0,
      },
      () => {
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
      }
    );
  };

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
        {this.filteruser()}
        {this.restext()}
        <ul className={styles.old}>
          {this.state.reservations.map((reservation) => (
            <li
              key={reservation.reservationID}
              onClick={() =>
                this.props.gotoreservation(reservation.reservationID)
              }
            >
              {this.resinfo(reservation)}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  resinfo(reservation) {
    if (this.state.type === "1" && this.state.selected === 0)
      return (
        "Reservation no " +
        reservation.reservationID +
        " made by " +
        reservation.username
      );
    else if (this.state.type === "1")
      return (
        "Reservation no " +
        reservation.reservationID +
        " of book '" +
        reservation.book +
        "' "
      );
    else return reservation.book;
  }
  filteruser() {
    if (this.state.type === "1")
      //operator
      return (
        <div className={styles.filter}>
          <table>
            <tr>
              <th>Filter by username:</th>
              <td>
                <form>
                  <select name="username" onChange={this.selectUser}>
                    {this.state.users.map((user) => (
                      <option value={user.userID}>{user.username}</option>
                    ))}
                  </select>
                </form>
              </td>
              <td>
                <span title="Clear">
                  <button onClick={this.clear} className={styles.iconbut2}>
                    <img src={exx} alt="Clear" />
                  </button>
                </span>
              </td>
            </tr>
          </table>
        </div>
      );
  }
  restext() {
    if (this.state.type === "1")
      return <div className={styles.resren1}>Reservations:</div>;
    else return <div className={styles.resren1}>My Reservations:</div>;
  }
}

export default Reservations;
