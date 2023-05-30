import React, { Component } from "react";

class Query315 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  sendquery = () => {
    fetch(`http://localhost:9103/libraries/queries/query315`)
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
    console.log("Now at Query315");
    return (
      <div>
        <h2>Query 3.1.5</h2>
        <p>
          Ποιοι χειριστές έχουν δανείσει τον ίδιο αριθμό βιβλίων σε διάστημα
          ενός έτους με περισσότερους από 20 δανεισμούς;
        </p>
        <button onClick={this.sendquery}>Send Query</button>
        <h3>Αποτελέσματα:</h3>
        <ul>
          {this.state.results.map((result) => (
            <li key={result.operator}>
              <table>
                <tr>
                  <th>Operator:</th>
                  <td>{result.operator}</td>
                </tr>
                <tr>
                  <th>Number of Rentals:</th>
                  <td>{result.num_of_rents}</td>
                </tr>
              </table>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Query315;
