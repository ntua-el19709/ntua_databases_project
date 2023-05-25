import React, { Component } from "react";

class AddReservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      book: "",
      placedat: "",
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
    } else if (this.state.placedat.length === 0) {
      this.setState({
        ...this.state,
        message: `Date of reservation is blank!`,
      });
      return 0;
      }
    this.setState({ ...this.state, message: "Reservation Added!" });
    return 1;
  }

  onAddReservation = () => {
    let okay = this.check();
    if (okay === 1) {
      fetch(
        `http://localhost:9103/libraries/web/makereservation/${this.state.username}/${this.state.book}/${this.state.placedat}`,
        {
          method: "POST",
          mode: "cors",
        }
      );
    }
  };

  render() {
    console.log("Now at AddReservation");
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
            <th>PLaced at:</th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, placedat: val.target.value })
                }
              />
            </td>
          </tr>
        </table>
        <button onClick={this.onAddReservation}>Add Reservation</button>
        <div>{this.state.message}</div>
        <button onClick={() => this.props.gotoreservations()}>{"<-"}</button>
      </div>
    );
  }
}

export default AddReservation;