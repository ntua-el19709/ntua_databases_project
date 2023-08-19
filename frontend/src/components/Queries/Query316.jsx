import React, { Component } from "react";
import styles from "../../CSS/mystyle.module.css";

class Query316 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      top: 0,
    };
  }

  sendquery = () => {
    fetch(`http://localhost:9103/libraries/queries/query316`)
      .then((response) => response.json())
      .then((obj) => {
        console.log(obj);
        this.setState({
          ...this.state,
          results: obj.map((result) => {
            return result;
          }),
          top: obj.length,
        });
      });
  };

  render() {
    console.log("Now at Query316");
    return (
      <div className={styles.school}>
        <h2>Query 3.1.6</h2>
        <p>
          Ανάμεσα σε ζεύγη κατηγοριών που είναι κοινά στα βιβλία, βρείτε τα 3
          κορυφαία (top-3) ζεύγη που εμφανίστηκαν σε δανεισμούς.
        </p>
        <button onClick={this.sendquery}>Send Query</button>
        <h3>Αποτελέσματα:</h3>
        <table>
          <tr>
            <td></td>
            <th>Category 1</th>
            <th>Category 2</th>
            <th>Number of Rentals</th>
          </tr>
          {this.showfirst()}
          {this.showsecond()}
          {this.showthird()}
        </table>
      </div>
    );
  }

  showfirst() {
    if (this.state.top > 0)
      return (
        <tr>
          <th>1</th>
          <td>{this.state.results[0].cat1}</td>
          <td>{this.state.results[0].cat2}</td>
          <td>{this.state.results[0].num_of_rents}</td>
        </tr>
      );
  }
  showsecond() {
    if (this.state.top > 1)
      return (
        <tr>
          <th>2</th>
          <td>{this.state.results[1].cat1}</td>
          <td>{this.state.results[1].cat2}</td>
          <td>{this.state.results[1].num_of_rents}</td>
        </tr>
      );
  }
  showthird() {
    if (this.state.top > 2)
      return (
        <tr>
          <th>3</th>
          <td>{this.state.results[2].cat1}</td>
          <td>{this.state.results[2].cat2}</td>
          <td>{this.state.results[2].num_of_rents}</td>
        </tr>
      );
  }
}

export default Query316;
