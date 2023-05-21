import React, { Component } from "react";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
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
          password: obj.password,
        });
      });
    console.log(this.state);
  }

  check() {
    if (this.state.password.length === 0) {
      this.setState({
        ...this.state,
        message: `Password is blank!`,
      });
      return 0;
    }
    this.setState({ ...this.state, message: "Updated!" });
    return 1;
  }

  onUpdateProfile = () => {
    let okay = this.check();
    if (okay === 1) {
      fetch(
        `http://localhost:9103/libraries/web/changeuser/${this.state.username}/${this.state.password}`,
        {
          method: "POST",
          mode: "cors",
        }
      );
    }
  };

  render() {
    console.log("Now at ChangePassword");
    return (
      <div>
        <table>
          <tr>
            <th>Username:</th>
            <td>{this.state.username}</td>
          </tr>
          <tr>
            <th>Password:</th>
            <td>
              <input
                type="text"
                placeholder={this.state.password}
                onChange={(val) =>
                  this.setState({ ...this.state, password: val.target.value })
                }
              />
            </td>
          </tr>
        </table>
        <button onClick={this.onUpdateProfile}>Update</button>
        <div>{this.state.message}</div>
        <button onClick={() => this.props.gotoprofile(this.state.username)}>
          {"<-"}
        </button>
      </div>
    );
  }
}

export default ChangePassword;