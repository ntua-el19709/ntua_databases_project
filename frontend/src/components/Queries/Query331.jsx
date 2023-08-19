import React, { Component } from "react";
import styles from "../../CSS/mystyle.module.css";

class Query331 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      title: "",
      category: "",
      author: "",
      schlID: this.props.schlID,
    };
  }

  sendquery = () => {
    let title = this.state.title;
    if (title === "") title = "none";
    let category = this.state.category;
    if (category === "") category = "none";
    let author = this.state.author;
    if (author === "") author = "none";
    fetch(
      `http://localhost:9103/libraries/queries/query331/${title}/${category}/${author}/${this.state.schlID}`
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
    console.log("Now at Query331");
    return (
      <div className={styles.school}>
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
                  <th>Book:</th>
                  <td>
                    {result.title}{" "}
                    <button onClick={() => this.props.gotobook(result.isbn)}>
                      {"->"}
                    </button>
                  </td>
                </tr>
                <tr>
                  <th>Author(s):</th>
                  <td>
                    <ul>
                      {result.authors.map((author) => (
                        <li key={author}>{author}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>Category(/ies):</th>
                  <td>
                    <ul>
                      {result.categories.map((category) => (
                        <li key={category}>{category}</li>
                      ))}
                    </ul>
                  </td>
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
