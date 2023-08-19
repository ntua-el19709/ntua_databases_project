import React, { Component } from "react";
import styles from "../../CSS/mystyle.module.css";

class Query311 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      year: "",
      month: "",
    };
  }

  sendquery = () => {
    let year = this.state.year;
    if (year === "") year = "none";
    let month = this.state.month;
    if (month === "") month = "none";
    fetch(`http://localhost:9103/libraries/queries/query311/${year}/${month}`)
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
    console.log("Now at Query311");
    return (
      <div className={styles.school}>
        <h2>Query 3.1.1</h2>
        <p>Παρουσίαση λίστας με συνολικό αριθμό δανεισμών ανά σχολείο.</p>
        <h3>Κριτήρια Αναζήτησης</h3>
        <table>
          <tr>
            <th>Year: </th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, year: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Month: </th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, month: val.target.value })
                }
              />
            </td>
          </tr>
        </table>
        <button onClick={this.sendquery}>Send Query</button>
        <h3>Αποτελέσματα:</h3>
        <ul>
          {this.state.results.map((result) => (
            <li key={result.school_name}>
              <table>
                <tr>
                  <th>Name of School:</th>
                  <td>{result.school_name}</td>
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

export default Query311;
