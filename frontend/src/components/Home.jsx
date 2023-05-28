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
import Users from "./Users";
import User from "./User";
import EditBook from "./EditBook";
import ChangePassword from "./ChangePassword";
import Reservations from "./Reservations";
import Reservation from "./Reservation";
import AddReservation from "./AddReservation";
import Rentals from "./Rentals";
import Rental from "./Rental";
import AddRental from "./AddRental";
import Reviews from "./Reviews";
import Review from "./Review";
import ReviewsOfBook from "./ReviewsOfBook";
import MakeReview from "./MakeReview";

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
      opusername: username,
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
      isbn: ISBN,
      page: 13,
    });
  };
  goToUsers = () => {
    this.setState({
      ...this.state,
      page: 14, //Users page
    });
  };
  goToUser = (username, userID) => {
    this.setState({
      ...this.state,
      opusername: username,
      opuserID: userID,
      page: 15, //User Page
    });
  };
  goToReservations = () => {
    this.setState({
      ...this.state,
      page: 16, //Reservation Page
    });
  };
  goToReservation = (resID) => {
    this.setState({
      ...this.state,
      resID: resID,
      page: 17,
    });
  };
  addReservation = () => {
    this.setState({
      ...this.state,
      page: 18,
    });
  };
  goToRentals = () => {
    this.setState({
      ...this.state,
      page: 19,
    });
  };
  goToRental = (renID) => {
    this.setState({
      ...this.state,
      renID: renID,
      page: 20,
    });
  };
  addRental = () => {
    this.setState({
      ...this.state,
      page: 21,
    });
  };
  goToReviews = () => {
    this.setState({
      ...this.state,
      page: 22, //Reviews page
    });
  };
  goToReviewsOfBook = () => {
    this.setState({
      ...this.state,
      page: 23, // Reviews of book page
    });
  };
  goToMakeReview = () => {
    this.setState({
      ...this.state,
      page: 24, //Make Review page
    });
  };
  goToReview = (review) => {
    this.setState({
      ...this.state,
      review: review,
      page: 25, //Review page
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

  /*
  changepassword = () => {
    //pressed change password, go to Change Password page
    this.setState({
      ...this.state,
      page: 15,
    });
    console.log(this.state);
  };
*/
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
          ChangePassword={this.changepassword}
          gotoprofile={this.goToProfile}
          gotoschools={this.goToSchools}
          gotobooks={this.goToBooks}
          gotoreservations={this.goToReservations}
          gotorentals={this.goToRentals}
          gotooperators={this.goToOperators}
          gotousers={this.goToUsers}
          gotoreviews={this.goToReviews}
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
      //Operator page
      return (
        <Operator
          type={this.state.type}
          username={this.state.opusername}
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
          schlID={this.state.schlID}
          gotoprofile={this.goToProfile}
          gotobooks={this.goToBooks}
          addbook={this.addBook}
          gotobook={this.goToBook}
          gotousers={this.goToUsers}
          gotoreservations={this.goToReservations}
          gotorentals={this.goToRentals}
          gotoreviews={this.goToReviews}
        />
      );
    else if (this.state.page === 12)
      //Add Book page
      return (
        <AddBook
          username={this.state.username}
          type={this.state.type}
          schlID={this.state.schlID}
          gotobooks={this.goToBooks}
          userID={this.state.userID}
        />
      );
    else if (this.state.page === 13)
      // Book page
      return (
        <Book
          type={this.state.type}
          schlID={this.state.schlID}
          ISBN={this.state.isbn}
          gotobooks={this.goToBooks}
          editbook={this.editBook}
          makereview={this.makeReview}
          userID={this.state.userID}
          gotoreviewsofbook={this.goToReviewsOfBook}
        />
      );
    else if (this.state.page === 14)
      //Users page
      return (
        <Users
          type={this.state.type}
          schlID={this.state.schlID}
          gotobooks={this.goToBooks}
          gotoprofile={this.goToProfile}
          gotousers={this.goToUsers}
          gotouser={this.goToUser}
          gotoreservations={this.goToReservations}
          gotorentals={this.goToRentals}
          gotoreviews={this.goToReviews}
        />
      );
    else if (this.state.page === 15)
      //User page
      return (
        <User
          type={this.state.type}
          username={this.state.opusername}
          userID={this.state.opuserID}
          gotousers={this.goToUsers}
        />
      );
    else if (this.state.page === 16)
      //Reservations page
      return (
        <Reservations
          username={this.state.username}
          userID={this.state.userID}
          type={this.state.type}
          schlID={this.state.schlID}
          gotoprofile={this.goToProfile}
          gotoreservations={this.goToReservations}
          gotoreservation={this.goToReservation}
          addreservation={this.addReservation}
          gotobooks={this.goToBooks}
          gotousers={this.goToUsers}
          gotorentals={this.goToRentals}
          gotoreviews={this.goToReviews}
        />
      );
    else if (this.state.page === 17)
      // Reservation page
      return (
        <Reservation
          schlID={this.state.schlID}
          resID={this.state.resID}
          type={this.state.type}
          gotoreservations={this.goToReservations}
        />
      );
    else if (this.state.page === 18)
      //Add Reservation page
      return (
        <AddReservation
          username={this.state.username}
          type={this.state.type}
          gotoreservations={this.goToReservations}
        />
      );
    else if (this.state.page === 19)
      //Rentals page
      return (
        <Rentals
          username={this.state.username}
          type={this.state.type}
          schlID={this.state.schlID}
          userID={this.state.userID}
          gotoprofile={this.goToProfile}
          gotorentals={this.goToRentals}
          gotorental={this.goToRental}
          addrental={this.addRental}
          gotoreservations={this.goToReservations}
          gotobooks={this.goToBooks}
          gotousers={this.goToUsers}
          gotoreviews={this.goToReviews}
        />
      );
    else if (this.state.page === 20)
      // Rental page
      return (
        <Rental
          type={this.state.type}
          schlID={this.state.schlID}
          renID={this.state.renID}
          gotorentals={this.goToRentals}
        />
      );
    else if (this.state.page === 21)
      //Add Rental page
      return (
        <AddRental
          username={this.state.username}
          type={this.state.type}
          gotorentals={this.goToRentals}
        />
      );
    else if (this.state.page === 22)
      //Reviews page
      return (
        <Reviews
          type={this.state.type}
          schlID={this.state.schlID}
          gotoprofile={this.goToProfile}
          gotorentals={this.goToRentals}
          gotoreservations={this.goToReservations}
          gotobooks={this.goToBooks}
          gotousers={this.goToUsers}
          gotoreviews={this.goToReviews}
          gotoreview={this.goToReview}
        />
      );
    else if (this.state.page === 23)
      //Reviews of book page
      return (
        <ReviewsOfBook
          type={this.state.type}
          schlID={this.state.schlID}
          gotoprofile={this.goToProfile}
          gotorentals={this.goToRentals}
          gotoreservations={this.goToReservations}
          gotobooks={this.goToBooks}
          gotousers={this.goToUsers}
          gotoreviews={this.goToReviews}
          isbn={this.state.isbn}
          userId={this.state.userID}
          gotobook={this.goToBook}
          gotomakereview={this.goToMakeReview}
        />
      );
    else if (this.state.page === 24)
      //Make Review page
      return (
        <MakeReview
          type={this.state.type}
          gotoreviewsofbook={this.goToReviewsOfBook}
          schlID={this.state.schlID}
          isbn={this.state.isbn}
          userID={this.state.userID}
        />
      );
    else if (this.state.page === 25)
      //Review page
      return (
        <div>
          <Review
            schlID={this.state.schlId}
            gotoreviews={this.goToReviews}
            review={this.state.review}
          />
        </div>
      );
  }
}

export default Home;
