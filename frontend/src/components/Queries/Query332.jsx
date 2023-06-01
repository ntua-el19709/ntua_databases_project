import React, { Component } from "react";

class Query332 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      username: "",
    };
  }

  sendquery = () => {
    let username = this.state.username;
    if (username === "") username = "none";
    fetch(`http://localhost:9103/libraries/queries/query332/${username}`)
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
    console.log("Now at Query332");
    return (
      <div>
        <h2>Query 3.3.2</h2>
        <p>Λίστα όλων των βιβλίων που έχω δανειστεί.</p>
        <button onClick={this.sendquery}>Send Query</button>
        <h3>Αποτελέσματα:</h3>
        <ul>
          {this.state.results.map((result) => (
            <li key={result.title}>
              <table>
                <tr>
                  <th>Title:</th>
                  <td>{result.title}</td>
                </tr>
              </table>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default Query332;
