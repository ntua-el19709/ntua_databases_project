import React, { Component } from "react";
import { Link } from "react-router-dom";
import LogIn from "./LogIn_SignUp/LogIn";
import SignUp from "./LogIn_SignUp/SignUp";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import SchoolUnits from "./SchoolUnits";
import AddSchool from "./AddSchool";
import School from "./School";
import EditSchool from "./EditSchool";
import Operators from "./Operators";
import Operator from "./Operator";
import Books from "./Books";
import AddBook from "./AddBook";
import Book from "./Book";

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
  goToSchool = (schlid) => {
    this.setState({
      ...this.state,
      schlID: schlid,
      page: 7, //School Page (one specific school)
    });
  };
  editSchool = (schlid) => {
    this.setState({
      ...this.state,
      schlID: schlid,
      page: 8, //Edit School Page (one specific school)
    });
  };
  goToOperators = () => {
    this.setState({
      ...this.state,
      page: 9, //Operators Page
    });
  };
  goToOperator = (username, userID) => {
    this.setState({
      ...this.state,
      username: username,
      opuserID: userID,
      page: 10, //Operator Page
    });
  };
  goToBooks = () => {
    this.setState({
      ...this.state,
      page: 11,
    });
  };
  addBook = () => {
    this.setState({
      ...this.state,
      page: 12,
    });
  };
  goToBook = (ISBN) => {
    this.setState({
      ...this.state,
      ISBN: ISBN,
      page: 13, 
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
          gotobooks={this.goToBooks}
          gotooperators={this.goToOperators}
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
          gotoschool={this.goToSchool}
          gotooperators={this.goToOperators}
        />
      );
    else if (this.state.page === 6)
      //Add School page
      return (
        <AddSchool
          username={this.state.username}
          type={this.state.type}
          gotoschools={this.goToSchools}
        />
      );
    else if (this.state.page === 7)
      //Add School page
      return (
        <School
          schlID={this.state.schlID}
          gotoschools={this.goToSchools}
          editschool={this.editSchool}
        />
      );
    else if (this.state.page === 8)
      //Edit School page
      return (
        <EditSchool
          schlID={this.state.schlID}
          gotoschools={this.goToSchools}
          gotoschool={this.goToSchool}
        />
      );
    else if (this.state.page === 9)
      //Operators page
      return (
        <Operators
          type={this.state.type}
          gotoprofile={this.goToProfile}
          gotoschools={this.goToSchools}
          gotooperators={this.goToOperators}
          gotooperator={this.goToOperator}
        />
      );
    else if (this.state.page === 10)
      //Operators page
      return (
        <Operator
          type={this.state.type}
          username={this.state.username}
          userID={this.state.opuserID}
          gotooperators={this.goToOperators}
        />
      );
      else if (this.state.page === 11)
      //Books page
      return (
        <Books
          username={this.state.username}
          type={this.state.type}
          gotoprofile={this.goToProfile}
          gotobooks={this.goToBooks}
          addbook={this.addBook}
          gotobook={this.goToBook}
        />
      );
    else if (this.state.page === 12)
      //Add Book page
      return (
        <AddBook
          username={this.state.username}
          type={this.state.type}
          gotobooks={this.goToBooks}
        />
      );
    else if (this.state.page === 13)
      //Add Book page
      return (
        <Book
          ISBN={this.state.ISBN}
          gotobooks={this.goToBooks}
          editbook={this.editBook}
        />
      );
  }
}

export default Home;
