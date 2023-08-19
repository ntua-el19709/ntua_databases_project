import React, { Component } from "react";
import styles from "../CSS/mystyle.module.css";
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
        <ul className={styles.navbar}>
          <li>
            <button
              className={styles.navbut}
              onClick={() => this.props.profile()}
            >
              Profile
            </button>
          </li>
          <li>
            <button
              className={styles.navbut}
              onClick={() => this.props.schools()}
            >
              School Units
            </button>
          </li>
          <li>
            <button
              className={styles.navbut}
              onClick={() => this.props.operators()}
            >
              Operators
            </button>
          </li>
          <li>
            <button
              className={styles.navbut}
              onClick={() => this.props.queries()}
            >
              Queries
            </button>
          </li>
        </ul>
      );
    else if (this.state.type === "1")
      //operator
      return (
        <ul className={styles.navbar}>
          <li>
            <button
              className={styles.navbut}
              onClick={() => this.props.profile()}
            >
              Profile
            </button>
          </li>
          <li>
            <button
              className={styles.navbut}
              onClick={() => this.props.books()}
            >
              Books
            </button>
          </li>
          <li>
            <button
              className={styles.navbut}
              onClick={() => this.props.users()}
            >
              Users
            </button>
          </li>
          <li>
            <button
              className={styles.navbut}
              onClick={() => this.props.reservations()}
            >
              Reservations
            </button>
          </li>
          <li>
            <button
              className={styles.navbut}
              onClick={() => this.props.rentals()}
            >
              Rentals
            </button>
          </li>
          <li>
            <button
              className={styles.navbut}
              onClick={() => this.props.reviews()}
            >
              Reviews
            </button>
          </li>
          <li>
            <button
              className={styles.navbut}
              onClick={() => this.props.queries()}
            >
              Queries
            </button>
          </li>
        </ul>
      );
    else
      return (
        <ul className={styles.navbar}>
          <li>
            <button
              className={styles.navbut}
              onClick={() => this.props.profile()}
            >
              Profile
            </button>
          </li>
          <li>
            <button
              className={styles.navbut}
              onClick={() => this.props.books()}
            >
              Books
            </button>
          </li>
          <li>
            <button
              className={styles.navbut}
              onClick={() => this.props.reservations()}
            >
              Reservations
            </button>
          </li>
          <li>
            <button
              className={styles.navbut}
              onClick={() => this.props.rentals()}
            >
              Rentals
            </button>
          </li>
          <li>
            <button
              className={styles.navbut}
              onClick={() => this.props.queries()}
            >
              Queries
            </button>
          </li>
        </ul>
      );
  }
}

export default Menu;
