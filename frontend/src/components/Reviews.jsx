import React, { Component } from "react";
import Menu from "./Menu";
import styles from "../CSS/mystyle.module.css";

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      userID: this.props.userID,
      username: this.props.username,
      schlID: this.props.schlID,
      type: this.props.type,
    };
  }

  componentDidMount() {
    fetch(
      `http://localhost:9103/libraries/web/notapprovedreviews/${this.state.schlID}`
    )
      .then((response) => response.json())
      .then((obj) => {
        this.setState({
          ...this.state,
          reviews: obj.unapprovedReviews.map((review) => {
            return review;
          }),
        });
      });
  }

  render() {
    console.log("Now at Reviews");
    return (
      <div>
        <Menu
          type={this.state.type}
          profile={() => this.props.gotoprofile()}
          books={() => this.props.gotobooks()}
          users={() => this.props.gotousers()}
          reservations={() => this.props.gotoreservations()}
          rentals={() => this.props.gotorentals()}
          reviews={() => this.props.gotoreviews()}
          queries={() => this.props.gotoqueries()}
        />
        <div className={styles.resren1}>Submitted Reviews:</div>
        <ul className={styles.old}>
          {this.state.reviews.map((review) => (
            <li
              key={review.reviewID}
              onClick={() => this.props.gotoreview(review)}
            >
              {"Review no " + review.reviewID + " made by " + review.username}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Reviews;
