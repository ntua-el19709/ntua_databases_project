import React, { Component } from "react";

class Query331 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      title: "",
      category: "",
      author: "",
    };
  }

  sendquery = () => {
    let title = this.state.title;
    if (title === "") title = "none";
    let category = this.state.category;
    if (category === "") category = "none";
    let author = this.state.author;
    if (author === "") author = "none";
    fetch(`http://localhost:9103/libraries/queries/query331/${title}/${category}/${author}`)
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
    console.log("Now at Query331");
    return (
      <div>
        <h2>Query 3.3.1</h2>
        <p>Παρουσίαση όλων των βιβλίων που έχουν καταχωριστεί.</p>
        <h3>Κριτήρια Αναζήτησης</h3>
        <table>
          <tr>
            <th>Title: </th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, title: val.target.value })
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
          <tr>
            <th>Author: </th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, author: val.target.value })
                }
              />
            </td>
          </tr>
        </table>
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
                <tr>
                  <th>Author:</th>
                  <td>{result.author_fullname}</td>
                </tr>
              </table>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Query331;
