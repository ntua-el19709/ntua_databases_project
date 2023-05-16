import React, { Component } from "react";
import Menu from "./Menu";

class SchoolUnits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: [],
      fullname: "",
      dob: "",
      schlID: this.props.schlID,
      username: this.props.username,
      userID: this.props.userID,
      password: "",
      type: this.props.type,
    };
  }

  componentDidMount() {
    fetch(`http://localhost:9103/libraries/web/allschools`)
      .then((response) => response.json())
      .then((obj) => {
        this.setState({
          ...this.state,
          schools: obj.map((school) => {
            return school;
          }),
        });
      });
    console.log(this.state.type);
  }

  onLogIn = () => {
    if (this.state.username.length === 0) {
      this.setState({
        ...this.state,
        message: "Username is blank",
      });
    } else if (this.state.password.length === 0) {
      this.setState({
        ...this.state,
        message: "Password is blank",
      });
    } else if (this.state.unmessage !== "Validated") {
      this.setState({
        ...this.state,
        message: this.state.unmessage,
      });
    } else if (this.state.unmessage === "Validated") {
      this.props.LoggedIn(this.state.username);
    }
  };

  render() {
    console.log("Now at SchoolUnits");
    return (
      <div>
        <Menu
          type={this.state.type}
          profile={() => this.props.gotoprofile()}
          schools={() => this.props.gotoschools()}
        />
        <button onClick={() => this.props.addschool()}>Add School Unit</button>
        <div>All School Units:</div>
        <ul>
          {this.state.schools.map((school) => (
            <li key={school.schoolID}>
              {school.schoolname}
              <button onClick={() => this.props.gotoschool(school.schoolID)}>
                {"->"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  backuprestore() {
    if (this.state.type === "4") {
      //topoperator
      return (
        <div>
          <button>Back Up</button>
          <button>Restore</button>
        </div>
      );
    }
  }
}

export default SchoolUnits;
