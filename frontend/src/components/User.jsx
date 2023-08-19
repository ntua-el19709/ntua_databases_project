import React, { Component } from "react";
import styles from "../CSS/mystyle.module.css";
import back from "../icons/back.png";
import delet from "../icons/delete.png";
import tick from "../icons/tick.png";
import exx from "../icons/exx.png";
import print from "../icons/print.png";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      dob: "",
      profstud: "",
      username: this.props.username,
      userID: this.props.userID,
      password: "",
      type: this.props.type,
      approved: 0,
      message: "",
    };
  }

  componentDidMount() {
    fetch(`http://localhost:9103/libraries/web/userinfo/${this.state.username}`)
      .then((response) => response.json())
      .then((obj) => {
        this.setState({
          ...this.state,
          fullname: obj.fullname,
          password: obj.password,
          dob: obj.dob.substring(0, 10),
          approved: obj.approved,
        });
      });
    fetch(`http://localhost:9103/libraries/web/findtype/${this.state.username}`)
      .then((response) => response.json())
      .then((obj) => {
        let type = "";
        if (obj.type === "2") type = "Professor";
        else type = "Student";
        this.setState({
          ...this.state,
          profstud: type,
        });
      });
  }

  ApproveUser = () => {
    fetch(
      `http://localhost:9103/libraries/web/approveuser/${this.state.username}`,
      {
        method: "POST",
        mode: "cors",
      }
    ).then(() => {
      this.setState({
        ...this.state,
        approved: 1,
        message: "User Approved",
      });
    });
  };
  UnapproveUser = () => {
    fetch(
      `http://localhost:9103/libraries/web/unapproveuser/${this.state.username}`,
      {
        method: "POST",
        mode: "cors",
      }
    ).then(() => {
      this.setState({
        ...this.state,
        approved: 0,
        message: "User Unapproved",
      });
    });
  };
  DeleteUser = () => {
    fetch(
      `http://localhost:9103/libraries/web/deleteuser/${this.state.username}`,
      {
        method: "POST",
        mode: "cors",
      }
    ).then(() => {
      this.setState({
        ...this.state,
        approved: 2,
        message: "User Deleted",
      });
    });
  };

  render() {
    console.log("Now at User");
    return (
      <div className={styles.school}>
        <table>
          <tr>
            <th>Full Name:</th>
            <td>{this.state.fullname}</td>
          </tr>
          <tr>
            <th>Date of Birth:</th>
            <td>{this.state.dob.substring(0, 10)}</td>
          </tr>
          <tr>
            <th>Professor/Student:</th>
            <td>
              <td>{this.state.profstud}</td>
            </td>
          </tr>
          <tr>
            <th>Username:</th>
            <td>
              <td>{this.state.username}</td>
            </td>
          </tr>
          <tr>
            <th>Password:</th>
            <td>
              <td>{this.state.password}</td>
            </td>
          </tr>
        </table>
        {this.approveornot()}
        <span title="Delete User">
          <button onClick={this.DeleteUser} className={styles.iconbut2}>
            <img src={delet} alt="Delete User" />
          </button>
        </span>
        {this.printcard()}
        <span title="Back">
          <button
            onClick={() => this.props.gotousers()}
            className={styles.iconbut2}
          >
            <img src={back} alt="Back" />
          </button>
        </span>
        <div className={styles.mess}>{this.state.message}</div>
      </div>
    );
  }
  approveornot() {
    if (this.state.approved === 0) {
      return (
        <span title="Approve User">
          <button onClick={this.ApproveUser} className={styles.iconbut2}>
            <img src={tick} alt="Approve User" />
          </button>
        </span>
      );
    } else if (this.state.approved === 1) {
      return (
        <span title="Unapprove User">
          <button onClick={this.UnapproveUser} className={styles.iconbut2}>
            <img src={exx} alt="Unapprove User" />
          </button>
        </span>
      );
    }
    return;
  }
  printcard() {
    if (this.state.type === "1")
      //operator
      return (
        <span title="Print Card">
          <button className={styles.iconbut2}>
            <img src={print} alt="Print Card" />
          </button>
        </span>
      );
  }
}

export default User;
