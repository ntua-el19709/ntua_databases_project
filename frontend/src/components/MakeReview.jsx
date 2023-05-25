import React, { Component } from "react";

class MakeReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      title: this.props.title,
      likert: "",
      description: "",
      message: "",
    };
  }

  check() {
    if (this.state.likert.length === 0) {
      this.setState({
        ...this.state,
        message: `Book rate is blank!`,
      });
      return 0;
    } else if (this.state.description.length === 0) {
      this.setState({
        ...this.state,
        message: `Description is blank!`,
      });
      return 0;
      }
    this.setState({ ...this.state, message: "Review Added!" });
    return 1;
  }

  onMakeReview = () => {
    let okay = this.check();
    if (okay === 1) {
      fetch(
        `http://localhost:9103/libraries/web/makereview/${this.state.likert}/${this.state.description}`,
        {
          method: "POST",
          mode: "cors",
        }
      );
    }
  };

  render() {
    console.log("Now at MakeReview");
    return (
      <div>
        <table>
        <tr>
            <th>Username:</th>
            <td>{this.state.username}</td>
          </tr>
          <tr>
            <th>Title:</th>
            <td>{this.state.title}</td>
          </tr>
          <tr>
            <th>Rate Book(1 to 5):</th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, likert: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Description:</th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, description: val.target.value })
                }
              />
            </td>
          </tr>
        </table>
        <button onClick={this.onMakeReview}>Make Review</button>
        <div>{this.state.message}</div>
        <button onClick={() => this.props.gotobook()}>{"<-"}</button>
      </div>
    );
  }
}

export default MakeReview;