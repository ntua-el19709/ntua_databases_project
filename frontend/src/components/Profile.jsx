import React, { Component } from "react";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      dob: "",
      school: "",
      username: this.props.username,
      password: "",
      type: this.props.type,
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
  }

  render() {
    console.log("Now at Profile");
    return (
      <div>
        <table>
          <tr>
            <th>Full Name:</th>
            <td>{this.state.fullname}</td>
          </tr>
          <tr>
            <th>Date of Birth:</th>
            <td>{this.state.dob}</td>
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
      </div>
    );
  }
}

export default Profile;
