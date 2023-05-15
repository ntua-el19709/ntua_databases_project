import React, { Component } from "react";
import { Link } from "react-router-dom";
import LogIn from "./LogIn_SignUp/LogIn";
import SignUp from "./LogIn_SignUp/SignUp";

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
        />
      );
    if (this.state.page === 2)
      //Sign Up page
      return (
        <SignUp
          headerSignUpPress={this.headerSignUp}
          headerLogInPress={this.headerLogIn}
        />
      );
  }
}

/*
function Home() {
  return (
    <div>
      <h1> IntelliQ - The webpage for all the Questionnaires</h1>
      <div>
        <h2> For questionnaire completion enter:</h2>
        <ul>
          <li>localhost:3000/ans/:questionnaireID</li>
        </ul>
      </div>
      <div>
        <h2> For questionnaire statistics click:</h2>
        <ul>
          <li>
            <Link to="/stats">localhost:3000/stats</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
*/
export default Home;
