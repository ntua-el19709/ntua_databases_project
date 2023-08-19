import React, { Component } from "react";
import styles from "../../CSS/mystyle.module.css";

class Query313 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  sendquery = () => {
    fetch(`http://localhost:9103/libraries/queries/query313`)
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
    console.log("Now at Query313");
    return (
      <div className={styles.school}>
        <h2>Query 3.1.3</h2>
        <p>
          Βρείτε τους νέους εκπαιδευτικούς {"(ηλικία < 40 ετών)"} που έχουν
          δανειστεί τα περισσότερα βιβλία και τον αριθμό των βιβλίων.
        </p>
        <button onClick={this.sendquery}>Send Query</button>
        <h3>Αποτελέσματα:</h3>
        <ul>
          {this.state.results.map((result) => (
            <li key={result.professor}>
              <table>
                <tr>
                  <th>Professor:</th>
                  <td>{result.professor}</td>
                </tr>
                <tr>
                  <th>Number of Books Rended:</th>
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

export default Query313;
