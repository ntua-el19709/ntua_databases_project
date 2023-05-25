import React, { Component } from "react";

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placedat: this.props.placedat,
      schlID: this.props.schlID,
      username: "",
      userID: this.props.userID,
      schlname: "",
      book: "",
      type: this.props.type,
      message: "",
    };
  }

  componentDidMount() {
    fetch(`http://localhost:9103/libraries/web/reservationinfo/${this.state.placedat}`)
      .then((response) => response.json())
      .then((obj) => {
        this.setState({
          ...this.state,
          book: obj.book,
          username: obj.username,
        });
      });
    fetch(`http://localhost:9103/libraries/web/schoolreservations/${this.state.userID}`)
      .then((response) => response.json())
      .then((obj) => {
        this.setState({
          ...this.state,
          schlname: obj.schoolName,
        });
      });
  }

  DeleteReservation = () => {
    fetch(
      `http://localhost:9103/libraries/web/deletereservation/${this.state.placedat}`,
      {
        method: "POST",
        mode: "cors",
      }
    ).then(() => {
      this.setState({
        ...this.state,
        message: "Reservation Deleted",
      });
    });
  };

  render() {
    console.log("Now at Reservation");
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
            <th>Placed at:</th>
            <td>
              <td>{this.state.placedat}</td>
            </td>
          </tr>
        </table>
        <button onClick={this.DeleteReservation}>Delete Reservation</button>
        <div>{this.state.message}</div>
        <button onClick={() => this.props.gotoreservations()}>{"<-"}</button>
      </div>
    );
  }
}

export default Reservation;