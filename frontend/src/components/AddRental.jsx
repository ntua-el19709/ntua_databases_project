import React, { Component } from "react";

class AddRental extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      book: "",
      rentat: "",
      message: "",
    };
  }

  check() {
    if (this.state.username.length === 0) {
      this.setState({
        ...this.state,
        message: `Username is blank!`,
      });
      return 0;
    } else if (this.state.book.length === 0) {
      this.setState({
        ...this.state,
        message: `Book is blank!`,
      });
      return 0;
    } else if (this.state.rentdat.length === 0) {
      this.setState({
        ...this.state,
        message: `Date of rental is blank!`,
      });
      return 0;
      }
    this.setState({ ...this.state, message: "Rental Added!" });
    return 1;
  }

  onAddRental = () => {
    let okay = this.check();
    if (okay === 1) {
      fetch(
        `http://localhost:9103/libraries/web/makerental/${this.state.username}/${this.state.book}/${this.state.rentat}`,
        {
          method: "POST",
          mode: "cors",
        }
      );
    }
  };

  render() {
    console.log("Now at AddRental");
    return (
      <div>
        <table>
          <tr>
            <th>Username:</th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, username: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Book:</th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, book: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Rent at:</th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, rentat: val.target.value })
                }
              />
            </td>
          </tr>
        </table>
        <button onClick={this.onAddRental}>Add Rental</button>
        <div>{this.state.message}</div>
        <button onClick={() => this.props.gotorentals()}>{"<-"}</button>
      </div>
    );
  }
}

export default AddRental;