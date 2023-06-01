import React, { Component } from "react";

class Query323 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      user: "",
      category: "",
    };
  }

  sendquery = () => {
    let user = this.state.user;
    if (user === "") user = "none";
    let category = this.state.category;
    if (category === "") category = "none";
    fetch(
      `http://localhost:9103/libraries/queries/query323/${user}/${category}`
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
    console.log("Now at Query323");
    return (
      <div>
        <h2>Query 3.2.3</h2>
        <p>Μέσος Όρος Αξιολογήσεων ανά δανειζόμενο και κατηγορία.</p>
        <h3>Κριτήρια Αναζήτησης</h3>
        <table>
          <tr>
            <th>Username: </th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, user: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Category: </th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, category: val.target.value })
                }
              />
            </td>
          </tr>
        </table>
        <button onClick={this.sendquery}>Send Query</button>
        <h3>Αποτελέσματα:</h3>
        <ul>
          {this.state.results.map((result) => (
            <li key={[result.username, result.category]}>
              <table>
                <tr>
                  <th>Username:</th>
                  <td>{result.username}</td>
                </tr>
                <tr>
                  <th>Category:</th>
                  <td>{result.category}</td>
                </tr>
                <tr>
                  <th>Average Rating:</th>
                  <td>{result.avguser_rating}/5</td>
                </tr>
              </table>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Query323;

/*
<ul>
          {this.state.results.map((result) => (
            <li key={result.avgcategory_rating}>
              <table>
                <tr>
                  <tr>
                    <th>Category:</th>
                    <td>{result.category_name}</td>
                  </tr>
                  <th>Average reviews per category:</th>
                  <td>{result.avgcategory_rating}</td>
                </tr>
              </table>
            </li>
          ))}
        </ul>
        */
