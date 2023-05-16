import React, { Component } from "react";
import { Link } from "react-router-dom";
import LogIn from "./LogIn_SignUp/LogIn";
import SignUp from "./LogIn_SignUp/SignUp";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import SchoolUnits from "./SchoolUnits";
import AddSchool from "./AddSchool";

class Home extends Component {
  constructor() {
    super();
    console.log("Now at Home");
    this.state = {
      page: 1, // Log in Page
    };
  }
  headerSignUp = () => {
    this.setState({ page: 2 }); //Sign up Page
  };
  headerLogIn = () => {
    this.setState({ page: 1 }); //Log in Page
  };
  goToProfile = () => {
    this.setState({
      ...this.state,
      page: 3, //Profile Page
    });
  };
  goToSchools = () => {
    this.setState({
      ...this.state,
      page: 5,
    });
  };
  addSchool = () => {
    this.setState({
      ...this.state,
      page: 6,
    });
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
    //pressed edit profile, go to Edit Profile page
    this.setState({
      ...this.state,
      page: 4,
    });
    console.log(this.state);
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
          gotoprofile={this.goToProfile}
          gotoschools={this.goToSchools}
        />
      );
    else if (this.state.page === 4)
      //Edit Profile page
      return (
        <EditProfile
          username={this.state.username}
          type={this.state.type}
          gotoprofile={this.goToProfile}
        />
      );
    else if (this.state.page === 5)
      //Scool Units page
      return (
        <SchoolUnits
          username={this.state.username}
          type={this.state.type}
          gotoprofile={this.goToProfile}
          gotoschools={this.goToSchools}
          addschool={this.addSchool}
        />
      );
    else if (this.state.page === 6)
      //Add Scool page
      return (
        <AddSchool
          username={this.state.username}
          type={this.state.type}
          gotoschools={this.goToSchools}
        />
      );
  }
}

export default Home;
