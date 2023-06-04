import React, { Component } from "react";

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: this.props.review,
      rstate: 0,
    };
  }

  componentDidMount() {}

  DeleteReview = () => {
    fetch(
      `http://localhost:9103/libraries/web/deletereview/${this.state.review.reviewID}`,
      {
        method: "POST",
        mode: "cors",
      }
    ).then(() => {
      this.setState({
        ...this.state,
        message: "Review Deleted",
        rstate: 2,
      });
    });
  };

  ApproveReview = () => {
    fetch(
      `http://localhost:9103/libraries/web/approvereview/${this.state.review.reviewID}`,
      {
        method: "POST",
        mode: "cors",
      }
    ).then(() => {
      this.setState({
        ...this.state,
        message: "Review Approved",
        rstate: 1,
      });
    });
  };

  render() {
    console.log("Now at Review");
    return (
      <div>
        <table>
          <tr>
            <th>username:</th>
            <td>{this.state.review.username}</td>
          </tr>
          <tr>
            <th>Book:</th>
            <td>{this.state.review.book}</td>
          </tr>
          <tr>
            <th>Rating:</th>
            <td>{this.state.review.likert}/5</td>
          </tr>
          <tr>
            <th>Description:</th>
            <td>{this.state.review.description}</td>
          </tr>
        </table>
        {this.pageornot()}
      </div>
    );
  }

  pageornot() {
    if (this.state.rstate === 0)
      return (
        <div>
          <button onClick={this.ApproveReview}>Approve Review</button>
          <button onClick={this.DeleteReview}>Delete Review</button>
          <div>{this.state.message}</div>
          <button onClick={() => this.props.gotoreviews()}>{"<-"}</button>
        </div>
      );
    else
      return (
        <div>
          <div>{this.state.message}</div>
          <button onClick={() => this.props.gotoreviews()}>{"<-"}</button>
        </div>
      );
  }

  EditReview() {
    if (this.state.type === "1") {
      //operator
      return (
        <div>
          <button onClick={this.addCopy}>Add Copy</button>
        </div>
      );
    }
  }

  deleteReview() {
    if (this.state.type === "1") {
      //operator
      return (
        <div>
          <button onClick={this.DeleteReview}>Delete Review</button>
        </div>
      );
    }
  }

  MakeReview() {
    if (this.state.type !== "1") {
      //student or professor
      return (
        <div>
          <button onClick={() => this.props.makereview()}>Review</button>
        </div>
      );
    }
  }
}

export default Review;
