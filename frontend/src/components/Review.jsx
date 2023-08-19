import React, { Component } from "react";
import styles from "../CSS/mystyle.module.css";
import back from "../icons/back.png";
import tick from "../icons/tick.png";
import delet from "../icons/delete.png";
import star1 from "../icons/borderstar.png";
import star2 from "../icons/filledstar.png";

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
      <div className={styles.school}>
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
            <td>{this.likertstars()}</td>
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

  likertstars() {
    var pixels = 160 - this.state.review.likert * 32;
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

  pageornot() {
    if (this.state.rstate === 0)
      return (
        <div>
          <span title="Approve Review">
            <button onClick={this.ApproveReview} className={styles.iconbut2}>
              <img src={tick} alt="Approve" />
            </button>
          </span>
          <span title="Delete Review">
            <button onClick={this.DeleteReview} className={styles.iconbut2}>
              <img src={delet} alt="Delete" />
            </button>
          </span>

          <span title="Back">
            <button
              onClick={() => this.props.gotoreviews()}
              className={styles.iconbut2}
            >
              <img src={back} alt="Back" />
            </button>
          </span>
          <div>{this.state.message}</div>
        </div>
      );
    else
      return (
        <div>
          <span title="Back">
            <button
              onClick={() => this.props.gotoreviews()}
              className={styles.iconbut2}
            >
              <img src={back} alt="Back" />
            </button>
          </span>
          <div>{this.state.message}</div>
        </div>
      );
  }
}

export default Review;
