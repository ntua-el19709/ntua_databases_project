import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <button onClick={() => this.props.onHeaderLogInPress()}>Log In</button>
        <button onClick={() => this.props.onHeaderSignUpPress()}>
          Sign Up
        </button>
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
        >
          {this.props.option.opttxt}
        </button>
      );
  }
}

export default Header;
