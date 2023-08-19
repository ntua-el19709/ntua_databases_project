import React, { Component } from "react";
import styles from "../CSS/mystyle.module.css";
import back from "../icons/back.png";
import star1 from "../icons/borderstar.png";
import star2 from "../icons/filledstar.png";
import review from "../icons/review.png";

class ReviewsOfBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      isbn: this.props.isbn,
      userID: this.props.userID,
      username: this.props.username,
      schlID: this.props.schlID,
      title: this.props.title,
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
      <div className={styles.school}>
        <h2>{this.state.title}</h2>
        {this.likertstars(this.state.likert)}
        {this.addreview()}
        <span title="Back">
          <button
            style={{ marginTop: "10px" }}
            onClick={() => this.props.gotobook(this.state.isbn)}
            className={styles.iconbut2}
          >
            <img src={back} alt="Back" />
          </button>
        </span>
        <div className={styles.resren1}>Reviews:</div>
        <ul>
          {this.state.reviews.map((review) => (
            <li key={review.reviewID}>
              <table>
                <tr>
                  <td>
                    <h3>{review.username}</h3>
                  </td>
                  <td>{this.likertstars(review.likert)}</td>
                </tr>
                <tr>
                  <td></td>
                  <td>{review.description}</td>
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
      // not operator
      return (
        <span title="Make Review">
          <button
            style={{ marginTop: "10px" }}
            onClick={() => this.props.gotomakereview()}
            className={styles.iconbut2}
          >
            <img src={review} alt="Add Review" />
          </button>
        </span>
      );
  }
  likertstars(rate) {
    var pixels = 160 - rate * 32;
    return (
      <div className={styles.likert}>
        <div className={styles.container}>
          <img src={star2} className={styles.layer1} alt="filled1" />
          <img src={star1} className={styles.layer3} alt="border1" />
        </div>
        <div className={styles.container}>
          <img src={star2} className={styles.layer1} alt="filled2" />
          <img src={star1} className={styles.layer3} alt="border2" />
        </div>
        <div className={styles.container}>
          <img src={star2} className={styles.layer1} alt="filled3" />
          <img src={star1} className={styles.layer3} alt="border3" />
        </div>
        <div className={styles.container}>
          <img src={star2} className={styles.layer1} alt="filled4" />
          <img src={star1} className={styles.layer3} alt="border4" />
        </div>
        <div className={styles.container}>
          <img src={star2} className={styles.layer1} alt="filled5" />
          <img src={star1} className={styles.layer3} alt="border5" />
        </div>
        <div
          style={{
            width: `${pixels}px`,
            height: "32px",
            backgroundColor: "lightblue",
            zIndex: "2",
            position: "absolute",
            right: "0",
          }}
        />
      </div>
    );
  }
}

export default ReviewsOfBook;
