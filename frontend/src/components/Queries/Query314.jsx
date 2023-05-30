import React, { Component } from "react";

class Query314 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  sendquery = () => {
    fetch(`http://localhost:9103/libraries/queries/query314`)
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
    console.log("Now at Query314");
    return (
      <div>
        <h2>Query 3.1.4</h2>
        <p>
          Βρείτε τους συγγραφείς των οποίων κανένα βιβλίο δεν έχει τύχει
          δανεισμού.
        </p>
        <button onClick={this.sendquery}>Send Query</button>
        <h3>Αποτελέσματα:</h3>
        <ul>
          {this.state.results.map((result) => (
            <li key={result}>{result}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Query314;
