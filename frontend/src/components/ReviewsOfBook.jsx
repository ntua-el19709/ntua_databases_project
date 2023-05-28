import React, { Component } from "react";
import Menu from "./Menu";

class ReviewsOfBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      isbn: this.props.isbn,
      userID: this.props.userID,
      username: this.props.username,
      schlID: this.props.schlID,
      type: this.props.type,
      likert: "0",
    };
  }

  componentDidMount() {
    fetch(
      `http://localhost:9103/libraries/web/bookreviews/${this.state.schlID}/${this.state.isbn}`
    )
      .then((response) => response.json())
      .then((obj) => {
        this.setState({
          ...this.state,
          reviews: obj.bookReviews.map((review) => {
            return review;
          }),
        });
      });
    fetch(
      `http://localhost:9103/libraries/web/booklikert/${this.state.schlID}/${this.state.isbn}`
    )
      .then((response) => response.json())
      .then((obj) => {
        this.setState({
          ...this.state,
          likert: obj.likert,
        });
      });
  }

  render() {
    console.log("Now at Reviews of Book");
    return (
      <div>
        <button onClick={() => this.props.gotobook(this.state.isbn)}>
          {"<-"}
        </button>
        {this.addreview()}
        <br></br>
        Rating: {this.state.likert}/5
        <br></br>
        Reviews:
        <ul>
          {this.state.reviews.map((review) => (
            <li key={review.reviewID}>
              <table>
                <tr>
                  <th>By:</th>
                  <td>{review.username}</td>
                </tr>
                <tr>
                  <th>Rating:</th>
                  <td>{review.likert}</td>
                </tr>
                <tr>
                  <th>Description:</th>
                  <td> {review.description}</td>
                </tr>
              </table>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  addreview() {
    if (this.state.type !== "1")
      // operator
      return (
        <button onClick={() => this.props.gotomakereview()}>Add Review</button>
      );
  }
}

export default ReviewsOfBook;
