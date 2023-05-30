import React, { Component } from "react";

class AddRental extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isbn: this.props.isbn,
      schlID: this.props.schlID,
      users: [],
      title: "",
      userID: "",
      message: "",
      publisher: "",
      pages: "",
      summary: "",
      language: "",
      available_copies: "",
      rmade: 0,
    };
  }
  componentDidMount() {
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
    fetch(
      `http://localhost:9103/libraries/web/approvedusersofschl/${this.state.schlID}`
    )
      .then((response) => response.json())
      .then((obj) => {
        console.log(obj);
        this.setState({
          ...this.state,
          users: obj.approvedUsers.map((user) => {
            return user;
          }),
        });
      });
  }

  check() {
    if (this.state.userID.length === 0) {
      this.setState({
        ...this.state,
        message: `Choose a user!`,
      });
      return 0;
    }
    this.setState({ ...this.state, message: "Rental Added!", rmade: 1 });
    return 1;
  }

  onAddRental = () => {
    let okay = this.check();
    if (okay === 1) {
      fetch(
        `http://localhost:9103/libraries/web/makerental/${this.state.userID}/${this.state.isbn}/${this.state.schlID}`,
        {
          method: "POST",
          mode: "cors",
        }
      );
      let newcopiesnum = Number(this.state.available_copies);
      newcopiesnum = newcopiesnum - 1;
      let newcopies = newcopiesnum.toString();
      console.log(newcopiesnum, newcopies);
      fetch(
        `http://localhost:9103/libraries/web/changebook/${this.state.isbn}/${this.state.schlID}/${this.state.title}/${this.state.publisher}/${this.state.pages}/${this.state.summary}/${this.state.language}/${newcopies}`,
        {
          method: "POST",
          mode: "cors",
        }
      );
    }
  };
  selectuser = (val) => {
    this.setState({
      ...this.state,
      userID: val.target.value,
    });
  };
  render() {
    console.log("Now at AddRental");
    return (
      <div>
        <table>
          <tr>
            <th>Book:</th>
            <td>{this.state.title}</td>
          </tr>
          <tr>
            <th>Rent to:</th>
            <td>
              <form>
                <select multiple name="username" onChange={this.selectuser}>
                  {this.state.users.map((user) => (
                    <option value={user.userID}>{user.username}</option>
                  ))}
                </select>
              </form>
            </td>
          </tr>
        </table>
        {this.addrental()}
        <div>{this.state.message}</div>
        <button onClick={() => this.props.gotobook(this.state.isbn)}>
          {"<-"}
        </button>
      </div>
    );
  }
  addrental() {
    if (this.state.rmade === 0)
      return <button onClick={this.onAddRental}>Add Rental</button>;
  }
}

export default AddRental;
