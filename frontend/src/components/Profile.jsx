import React, { Component } from "react";
import Menu from "./Menu";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      dob: "",
      schlID: this.props.schlID,
      username: this.props.username,
      userID: this.props.userID,
      password: "",
      type: this.props.type,
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
          dob: obj.dob,
        });
      });
    console.log(this.state.type);
  }

  BackUp = () => {
    fetch(`http://localhost:9103/libraries/web/backup`)
      .then((response) => response.json())
      .then((obj) => {
        if (obj.message === "OK")
          this.setState({
            ...this.state,
            message: "Database Backed Up!",
          });
        else
          this.setState({
            ...this.state,
            message: "Database Failed to Back Up!",
          });
      });
  };
  Restore = () => {
    fetch(`http://localhost:9103/libraries/web/restore`)
      .then((response) => response.json())
      .then((obj) => {
        if (obj.message === "OK")
          this.setState({
            ...this.state,
            message: "Database Restored!",
          });
        else
          this.setState({
            ...this.state,
            message: "Database has not been restored successfully!",
          });
      });
  };
  render() {
    console.log("Now at Profile");
    return (
      <div>
        <Menu
          type={this.state.type}
          profile={() => this.props.gotoprofile()}
          books={() => this.props.gotobooks()}
          reservations={() => this.props.gotoreservations()}
          rentals={() => this.props.gotorentals()}
          schools={() => this.props.gotoschools()}
          operators={() => this.props.gotooperators()}
          users={() => this.props.gotousers()}
          reviews={() => this.props.gotoreviews()}
          queries={() => this.props.gotoqueries()}
        />
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
        <button onClick={() => this.props.EditProfile()}>Edit Profile</button>
        {this.backuprestore()}
        <button onClick={() => this.props.LoggedOut()}>Log Out</button>
      </div>
    );
  }
  editprofile() {
    if (this.state.type !== "3") {
      //TopOperator, Operator, Professor
      return (
        <div>
          <button onClick={() => this.props.EditProfile()}>Edit Profile</button>
        </div>
      );
    }
  }

  changepassword() {
    if (this.state.type === "3") {
      //student
      return (
        <div>
          <button onClick={() => this.props.ChangePassword()}>
            Change Password
          </button>
        </div>
      );
    }
  }

  backuprestore() {
    if (this.state.type === "4") {
      //topoperator
      return (
        <div>
          <button onClick={this.BackUp}>Back Up</button>
          <button onClick={this.Restore}>Restore</button>
          <br></br>
          {this.state.message}
        </div>
      );
    }
  }
}

export default Profile;
