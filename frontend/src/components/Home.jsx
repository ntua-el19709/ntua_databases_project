import React, { Component } from "react";
import { Link } from "react-router-dom";
import LogIn from "./LogIn_SignUp/LogIn";
import SignUp from "./LogIn_SignUp/SignUp";
import Profile from "./Profile";

class Home extends Component {
  constructor() {
    super();
    console.log("Now at Home");
    this.state = {
      page: 1, // Log in Page
    };
  }
  /*
  componentDidMount() {
    fetch(`http://localhost:9103/intelliq_api/admin/getallquestionnaires`)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "failed") {
          this.setState({
            ...this.state,
            exist: 0,
          });
        } else {
          this.setState({
            ...this.state,
            questionnaires: result,
            exist: 1,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          ...this.state,
          exist: 0,
        });
      });
  }*/
  headerSignUp = () => {
    this.setState({ page: 2 }); //Sign up Page
  };
  headerLogIn = () => {
    this.setState({ page: 1 }); //Log in Page
  };

  login = (username) => {
    //just logged in, go to profile page
    fetch(`http://localhost:9103/libraries/web/findtype/${username}`)
      .then((response) => response.json())
      .then((obj) => {
        console.log(obj);
        this.setState({
          ...this.state,
          page: 3,
          username: username,
          userID: obj.userID,
          schlID: obj.schlID,
          type: obj.type,
        });
      });
  };

  logout = () => {
    //just logged out, go to Log in page
    this.setState({
      ...this.state,
      page: 1,
    });
  };

  editprofile = () => {
    //just logged out, go to Edit Profile page
    this.setState({
      ...this.state,
      page: 4,
    });
  };

  render() {
    return <div>{this.formatPage()}</div>;
  }
  formatPage() {
    if (this.state.page === 1)
      //Log in Page
      return (
        <LogIn
          headerSignUpPress={this.headerSignUp}
          headerLogInPress={this.headerLogIn}
          LoggedIn={this.login}
        />
      );
    else if (this.state.page === 2)
      //Sign Up page
      return (
        <SignUp
          headerSignUpPress={this.headerSignUp}
          headerLogInPress={this.headerLogIn}
        />
      );
    else if (this.state.page === 3)
      //Profile page
      return (
        <Profile
          username={this.state.username}
          userID={this.state.userID}
          schlID={this.state.schlID}
          type={this.state.type}
          LoggedOut={this.logout}
          EditProfile={this.editprofile}
        />
      );
    else if (this.state.page === 4)
      //Edit Profile page
      return <div />;
  }
}

export default Home;
