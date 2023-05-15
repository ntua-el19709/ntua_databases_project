import React, { Component } from "react";
import Header from "./Header";

class SignUp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("Now at SignUp");
    return (
      <div>
        <Header
          onHeaderLogInPress={() => this.props.headerLogInPress()}
          onHeaderSignUpPress={() => this.props.headerSignUpPress()}
        />
        <table>
          <tr>
            <th>Username:</th>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <th>Password:</th>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <th>Full Name:</th>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <th>Date of Birth:</th>
            <td>
              <input type="text" />
            </td>
          </tr>
        </table>
        <button>{"->"}</button>
      </div>
    );
  }

  formatbutton() {
    if (this.props.option.opttxt === "<open string>")
      return (
        <input
          type="text"
          onChange={(val) =>
            this.props.onPress(val.target.value, this.props.option.nextqID)
          }
        />
      );
    if (this.props.selected === 0)
      return (
        <button
          onClick={() =>
            this.props.onPress(
              this.props.option.optID,
              this.props.option.nextqID
            )
          }
          className="btn btn-outline-primary m-2"
        >
          {this.props.option.opttxt}
        </button>
      );
    else
      return (
        <button
          onClick={() =>
            this.props.onPress(
              this.props.option.optID,
              this.props.option.nextqID
            )
          }
          className="btn btn-primary m-2"
        >
          {this.props.option.opttxt}
        </button>
      );
  }
}

export default SignUp;
