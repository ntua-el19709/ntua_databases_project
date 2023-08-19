import React, { Component } from "react";
import styles from "../../CSS/mystyle.module.css";

class Query317 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      maxbooks: { author_fullname: "", num_of_books: "" },
    };
  }

  componentDidMount() {
    fetch(`http://localhost:9103/libraries/web/maxbooks`)
      .then((response) => response.json())
      .then((obj) => {
        console.log(obj);
        this.setState({
          ...this.state,
          maxbooks: obj[0],
        });
      });
  }

  sendquery = () => {
    fetch(`http://localhost:9103/libraries/queries/query317`)
      .then((response) => response.json())
      .then((obj) => {
        console.log(obj);
        this.setState({
          ...this.state,
          results: obj.map((result) => {
            return result;
          }),
        });
      });
  };

  render() {
    console.log("Now at Query317");
    return (
      <div className={styles.school}>
        <h2>Query 3.1.7</h2>
        <p>
          Συγγραφείς που έχουν γράψει τουλάχιστον 5 βιβλία λιγότερα από τον
          συγγραφέα με τα περισσότερα βιβλία.
        </p>
        <table>
          <tr>
            <th>Συγγραφέας Περισσότερων Βιβλίων: </th>
            <td>{this.state.maxbooks.author_fullname}</td>
          </tr>
          <tr>
            <th>Αριθμός Βιβλίων:</th>
            <td>{this.state.maxbooks.num_of_books}</td>
          </tr>
        </table>
        <br></br>
        <button onClick={this.sendquery}>Send Query</button>
        <h3>Αποτελέσματα:</h3>
        <ul>
          {this.state.results.map((result) => (
            <li>
              <table>
                <tr>
                  <th>Author:</th>
                  <td>{result.author_fullname}</td>
                </tr>
                <tr>
                  <th>Number of Books:</th>
                  <td>{result.num_of_books}</td>
                </tr>
              </table>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Query317;
