import React, { Component } from "react";
import Menu from "./Menu";
import Query311 from "./Queries/Query311";
import Query312 from "./Queries/Query312";
import Query313 from "./Queries/Query313";
import Query314 from "./Queries/Query314";
import Query315 from "./Queries/Query315";
import Query316 from "./Queries/Query316";
import Query317 from "./Queries/Query317";
import Query321 from "./Queries/Query321";
import Query322 from "./Queries/Query322";
import Query323 from "./Queries/Query323";
import Query331 from "./Queries/Query331";
import Query332 from "./Queries/Query332";
import styles from "../CSS/mystyle.module.css";

class Queries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      query: "Select Query",
      schlID: this.props.schlID,
      userID: this.props.userID,
    };
  }

  componentDidMount() {}

  query311 = () => {
    this.setState({
      ...this.state,
      query: "311",
    });
  };
  query312 = () => {
    this.setState({
      ...this.state,
      query: "312",
    });
  };
  query313 = () => {
    this.setState({
      ...this.state,
      query: "313",
    });
  };
  query314 = () => {
    this.setState({
      ...this.state,
      query: "314",
    });
  };
  query315 = () => {
    this.setState({
      ...this.state,
      query: "315",
    });
  };
  query316 = () => {
    this.setState({
      ...this.state,
      query: "316",
    });
  };
  query317 = () => {
    this.setState({
      ...this.state,
      query: "317",
    });
  };
  query321 = () => {
    this.setState({
      ...this.state,
      query: "321",
    });
  };
  query322 = () => {
    this.setState({
      ...this.state,
      query: "322",
    });
  };
  query323 = () => {
    this.setState({
      ...this.state,
      query: "323",
    });
  };
  query331 = () => {
    this.setState({
      ...this.state,
      query: "331",
    });
  };
  query332 = () => {
    this.setState({
      ...this.state,
      query: "332",
    });
  };

  render() {
    console.log("Now at Queries");
    return (
      <div>
        <Menu
          type={this.state.type}
          profile={() => this.props.gotoprofile()}
          books={() => this.props.gotobooks()}
          reservations={() => this.props.gotoreservations()}
          rentals={() => this.props.gotorentals()}
          schools={() => this.props.gotoschools()}
          operators={() => this.props.gotooperators()}
          users={() => this.props.gotousers()}
          reviews={() => this.props.gotoreviews()}
          queries={() => this.props.gotoqueries()}
        />
        {this.queries()}
        {this.query()}
      </div>
    );
  }
  queries() {
    if (this.state.type === "4")
      //top operator
      return (
        <ul className={styles.navbar2}>
          <li>
            <button className={styles.navbut2} onClick={this.query311}>
              Query 3.1.1
            </button>
          </li>
          <li>
            <button className={styles.navbut2} onClick={this.query312}>
              Query 3.1.2
            </button>
          </li>
          <li>
            <button className={styles.navbut2} onClick={this.query313}>
              Query 3.1.3
            </button>
          </li>
          <li>
            <button className={styles.navbut2} onClick={this.query314}>
              Query 3.1.4
            </button>
          </li>
          <li>
            <button className={styles.navbut2} onClick={this.query315}>
              Query 3.1.5
            </button>
          </li>
          <li>
            <button className={styles.navbut2} onClick={this.query316}>
              Query 3.1.6
            </button>
          </li>
          <li>
            <button className={styles.navbut2} onClick={this.query317}>
              Query 3.1.7
            </button>
          </li>
        </ul>
      );
    else if (this.state.type === "1")
      //operator
      return (
        <ul className={styles.navbar2}>
          <li>
            <button className={styles.navbut2} onClick={this.query321}>
              Query 3.2.1
            </button>
          </li>
          <li>
            <button className={styles.navbut2} onClick={this.query322}>
              Query 3.2.2
            </button>
          </li>
          <li>
            <button className={styles.navbut2} onClick={this.query323}>
              Query 3.2.3
            </button>
          </li>
        </ul>
      );
    //student or professor
    else
      return (
        <ul className={styles.navbar2}>
          <li>
            <button className={styles.navbut2} onClick={this.query331}>
              Query 3.3.1
            </button>
          </li>
          <li>
            <button className={styles.navbut2} onClick={this.query332}>
              Query 3.3.2
            </button>
          </li>
        </ul>
      );
  }
  query() {
    if (this.state.query === "Select Query") return <h2>Select Query</h2>;
    else if (this.state.query === "311") return <Query311 />;
    else if (this.state.query === "312") return <Query312 />;
    else if (this.state.query === "313") return <Query313 />;
    else if (this.state.query === "314") return <Query314 />;
    else if (this.state.query === "315") return <Query315 />;
    else if (this.state.query === "316") return <Query316 />;
    else if (this.state.query === "317") return <Query317 />;
    else if (this.state.query === "321")
      return <Query321 schlID={this.state.schlID} />;
    else if (this.state.query === "322")
      return <Query322 schlID={this.state.schlID} />;
    else if (this.state.query === "323")
      return <Query323 schlID={this.state.schlID} />;
    else if (this.state.query === "331")
      return (
        <Query331
          schlID={this.state.schlID}
          gotobook={(isbn) => this.props.gotobook(isbn)}
        />
      );
    else if (this.state.query === "332")
      return <Query332 userID={this.state.userID} />;
  }
}

export default Queries;
