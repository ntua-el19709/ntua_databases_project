import React, { Component } from "react";

class Rental extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rentat: this.props.rentat,
      schlID: this.props.schlID,
      username: "",
      userID: this.props.userID,
      schlname: "",
      book: "",
      type: this.props.type,
    };
  }

  componentDidMount() {
    fetch(`http://localhost:9103/libraries/web/rentalinfo/${this.state.rentat}`)
      .then((response) => response.json())
      .then((obj) => {
        this.setState({
          ...this.state,
          book: obj.book,
          username: obj.username,
        });
      });
    fetch(`http://localhost:9103/libraries/web/schoolrentals/${this.state.userID}`)
      .then((response) => response.json())
      .then((obj) => {
        this.setState({
          ...this.state,
          schlname: obj.schoolName,
        });
      });
  }

  render() {
    console.log("Now at Rental");
    return (
      <div>
        <table>
          <tr>
            <th>Username:</th>
            <td>
              <td>{this.state.username}</td>
            </td>
          </tr>
          <tr>
            <th>Book:</th>
            <td>
              <td>{this.state.book}</td>
            </td>
          </tr>
          <tr>
            <th>Rent at:</th>
            <td>
              <td>{this.state.rentat}</td>
            </td>
          </tr>
        </table>
        <button onClick={() => this.props.gotorental()}>{"<-"}</button>
      </div>
    );
  }
}

export default Rental;