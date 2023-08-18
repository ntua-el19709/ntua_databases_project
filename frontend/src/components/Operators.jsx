import React, { Component } from "react";
import Menu from "./Menu";
import styles from "../CSS/mystyle.module.css";

class Operators extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apoperators: [],
      napoperators: [],
      type: this.props.type,
    };
  }

  componentDidMount() {
    fetch(`http://localhost:9103/libraries/web/approvedops`)
      .then((response) => response.json())
      .then((obj) => {
        console.log(obj);
        this.setState({
          ...this.state,
          apoperators: obj.approvedOperators.map((operator) => {
            return operator;
          }),
        });
      });
    fetch(`http://localhost:9103/libraries/web/notapprovedops`)
      .then((response) => response.json())
      .then((obj) => {
        console.log(obj);
        this.setState({
          ...this.state,
          napoperators: obj.notApprovedOperators.map((operator) => {
            return operator;
          }),
        });
      });
  }

  render() {
    console.log("Now at Operators");
    return (
      <div>
        <Menu
          type={this.state.type}
          profile={() => this.props.gotoprofile()}
          schools={() => this.props.gotoschools()}
          operators={() => this.props.gotooperators()}
          queries={() => this.props.gotoqueries()}
        />
        <div className={styles.resren1}>Not Approved Operators:</div>
        <ul className={styles.late}>
          {this.state.napoperators.map((operator) => (
            <li
              key={operator.userID}
              onClick={() =>
                this.props.gotooperator(operator.username, operator.userID)
              }
            >
              {operator.username}
            </li>
          ))}
        </ul>
        <div className={styles.resren1}>Approved Operators:</div>
        <ul className={styles.ongoing}>
          {this.state.apoperators.map((operator) => (
            <li
              key={operator.userID}
              onClick={() =>
                this.props.gotooperator(operator.username, operator.userID)
              }
            >
              {operator.username}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Operators;
