import React, { Component } from "react";

class Rental extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renID: this.props.renID,
      rentat: "",
      schlID: this.props.schlID,
      username: "",
      userID: "",
      schlname: "",
      book: "",
      isbn: "",
      type: this.props.type,
      message: "",
      returned: -1,
      title: "",
      publisher: "",
      pages: "",
      summary: "",
      language: "",
      available_copies: "",
    };
  }

  componentDidMount() {
    fetch(`http://localhost:9103/libraries/web/rentalinfo/${this.state.renID}`)
      .then((response) => response.json())
      .then((obj) => {
        this.setState(
          {
            ...this.state,
            book: obj.book,
            username: obj.username,
            rentat: obj.rent_at,
            userID: obj.userID,
            isbn: obj.isbn,
            returned: obj.returned,
          },
          () => {
            console.log("check", this.state.type, this.state.returned);
            fetch(
              `http://localhost:9103/libraries/web/bookinfo/${this.state.schlID}/${this.state.isbn}`
            )
              .then((response) => response.json())
              .then((obj) => {
                this.setState({
                  ...this.state,
                  title: obj.title,
                  publisher: obj.publisher,
                  pages: obj.pages,
                  summary: obj.sumary,
                  language: obj.language,
                  available_copies: obj.copies,
                });
              });
          }
        );
      });
  }

  returnRental = () => {
    fetch(
      `http://localhost:9103/libraries/web/rentalreturn/${this.state.renID}`,
      {
        method: "POST",
        mode: "cors",
      }
    ).then(() => {
      this.setState({
        ...this.state,
        message: "Rental Returned!!",
        returned: 1,
      });
    });

    let newcopiesnum = Number(this.state.available_copies);
    newcopiesnum = newcopiesnum + 1;
    let newcopies = newcopiesnum.toString();
    console.log(newcopiesnum, newcopies);
    fetch(
      `http://localhost:9103/libraries/web/changebook/${this.state.isbn}/${this.state.schlID}/${this.state.title}/${this.state.publisher}/${this.state.pages}/${this.state.summary}/${this.state.language}/${newcopies}`,
      {
        method: "POST",
        mode: "cors",
      }
    );
  };

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
        {this.returnbook()}
        <div>{this.state.message}</div>
        <button onClick={() => this.props.gotorentals()}>{"<-"}</button>
      </div>
    );
  }
  returnbook() {
    if (this.state.type === "1" && this.state.returned === 0)
      //operator
      return <button onClick={this.returnRental}>Return Book</button>;
  }
}

export default Rental;
