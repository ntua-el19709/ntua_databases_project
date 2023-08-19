import React, { Component } from "react";
import styles from "../../CSS/mystyle.module.css";

class Query322 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      name: "",
      surname: "",
      delay_days: "",
      schlID: this.props.schlID,
    };
  }

  sendquery = () => {
    let name = this.state.name;
    if (name === "") name = "none";
    let surname = this.state.surname;
    if (surname === "") surname = "none";
    let delay_days = this.state.delay_days;
    if (delay_days === "") delay_days = "none";
    fetch(
      `http://localhost:9103/libraries/queries/query322/${name}/${surname}/${delay_days}/${this.state.schlID}`
    )
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
    console.log("Now at Query322");
    return (
      <div className={styles.school}>
        <h2>Query 3.2.2</h2>
        <p>
          Εύρεση όλων των δανειζόμενων που έχουν στην κατοχή τους τουλάχιστον
          ένα βιβλίο και έχουν καθυστερήσει την επιστροφή του.
        </p>
        <h3>Κριτήρια Αναζήτησης</h3>
        <table>
          <tr>
            <th>Name: </th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, name: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Surname: </th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, surname: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Days of delay: </th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, delay_days: val.target.value })
                }
              />
            </td>
          </tr>
        </table>
        <button onClick={this.sendquery}>Send Query</button>
        <h3>Αποτελέσματα:</h3>
        <ul>
          {this.state.results.map((result) => (
            <li key={result.user_fullname}>
              <table>
                <tr>
                  <th>Fullname:</th>
                  <td>{result.user_fullname}</td>
                </tr>
                <tr>
                  <th>Delayed Books:</th>
                  <td>{result.num_books}</td>
                </tr>
                <tr>
                  <th>Delayed Days:</th>
                  <td>{result.days_delayed}</td>
                </tr>
              </table>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Query322;
