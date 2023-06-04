import React, { Component } from "react";

class Query312 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      authors: [],
      professors: [],
      catID: "",
      message: "",
      sent: 0,
    };
  }

  componentDidMount() {
    fetch(`http://localhost:9103/libraries/web/allcategories`)
      .then((response) => response.json())
      .then((obj) => {
        console.log(obj);
        this.setState({
          ...this.state,
          categories: obj.map((result) => {
            return result;
          }),
        });
      });
  }

  selectCategory = (val) => {
    this.setState({ ...this.state, catID: val.target.value });
  };

  sendquery = () => {
    if (this.state.catID.length === 0)
      this.setState({
        ...this.state,
        message: "Please select a category!",
      });
    else
      fetch(
        `http://localhost:9103/libraries/queries/query312/${this.state.catID}`
      )
        .then((response) => response.json())
        .then((obj) => {
          console.log(obj);
          this.setState({
            ...this.state,
            authors: obj.authors.map((result) => {
              return result;
            }),
            professors: obj.professors.map((result) => {
              return result;
            }),
            message: "",
            sent: 1,
          });
        });
  };

  render() {
    console.log("Now at Query312");
    return (
      <div>
        <h2>Query 3.1.2</h2>
        <p>
          Για δεδομένη κατηγορία βιβλίων, ποιοι συγγραφείς ανήκουν σε αυτήν και
          ποιοι εκπαιδευτικοί έχουν δανειστεί βιβλία αυτής της κατηγορίας το
          τελευταίο έτος;
        </p>
        <h3>Κριτήρια Αναζήτησης</h3>
        <table>
          <tr>
            <th>Please select category: </th>
            <td>
              <form>
                <select multiple name="category" onChange={this.selectCategory}>
                  {this.state.categories.map((category) => (
                    <option value={category.categoryID}>
                      {category.category}
                    </option>
                  ))}
                </select>
              </form>
            </td>
          </tr>
        </table>
        <button onClick={this.sendquery}>Send Query</button>
        {this.state.message}
        <h3>Αποτελέσματα:</h3>
        <table>
          {this.showhead()}
          <tr>
            <td>
              <ul>
                {this.state.authors.map((result) => (
                  <li key={result}>{result}</li>
                ))}
              </ul>
            </td>
            <td>
              <ul>
                {this.state.professors.map((result) => (
                  <li key={result}>{result}</li>
                ))}
              </ul>
            </td>
          </tr>
        </table>
      </div>
    );
  }

  showhead() {
    if (this.state.sent === 1)
      return (
        <tr>
          <th>Authors</th>
          <th>Professors</th>
        </tr>
      );
  }
}

export default Query312;
