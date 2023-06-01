import React, { Component } from "react";

class Query317 extends Component {
  constructor(props) {
    super(props);
    this.state = {
        results: [],
    };
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
      <div>
        <h2>Query 3.1.7</h2>
        <p>
        Συγγραφείς που έχουν γράψει τουλάχιστον 5 βιβλία λιγότερα από τον συγγραφέα με τα περισσότερα βιβλία.
        </p>
        <button onClick={this.sendquery}>Send Query</button>
        <h3>Αποτελέσματα:</h3>
        
        {this.state.results.length > 0 && (
      <ul>
        <li>
          <table>
            <tr>
              <th>Authors:</th>
            </tr>
            {this.state.results.map((result) => (
              <tr key={result.author_fullname}>
                <td>{result.author_fullname}</td>
              </tr>
            ))}
          </table>
        </li>
      </ul>
    )}
  </div>
    );
  }
}

export default Query317;