import React, { Component } from "react";
import Menu from "./Menu";
import styles from "../CSS/mystyle.module.css";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apusers: [],
      napusers: [],
      type: this.props.type,
      schlID: this.props.schlID,
    };
  }

  componentDidMount() {
    fetch(
      `http://localhost:9103/libraries/web/approvedusersofschl/${this.state.schlID}`
    )
      .then((response) => response.json())
      .then((obj) => {
        console.log(obj);
        this.setState({
          ...this.state,
          apusers: obj.approvedUsers.map((user) => {
            return user;
          }),
        });
      });
    fetch(
      `http://localhost:9103/libraries/web/notapprovedusersofschl/${this.state.schlID}`
    )
      .then((response) => response.json())
      .then((obj) => {
        console.log(obj);
        this.setState({
          ...this.state,
          napusers: obj.unapprovedUsers.map((user) => {
            return user;
          }),
        });
      });
  }

  render() {
    console.log("Now at Users");
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
        <div className={styles.resren1}>Not Approved Users:</div>
        <ul className={styles.late}>
          {this.state.napusers.map((user) => (
            <li
              key={user.userID}
              onClick={() => this.props.gotouser(user.username, user.userID)}
            >
              {user.username}
            </li>
          ))}
        </ul>
        <div className={styles.resren1}>Approved Users:</div>
        <ul className={styles.ongoing}>
          {this.state.apusers.map((user) => (
            <li
              key={user.userID}
              onClick={() => this.props.gotouser(user.username, user.userID)}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Users;
