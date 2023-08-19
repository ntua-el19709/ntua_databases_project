import React, { Component } from "react";
import styles from "../CSS/mystyle.module.css";
import back from "../icons/back.png";
import star1 from "../icons/borderstar.png";
import star2 from "../icons/filledstar.png";
import review from "../icons/review.png";

class MakeReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      userID: this.props.userID,
      isbn: this.props.isbn,
      schlID: this.props.schlID,
      title: "",
      likert: "0",
      description: "",
      message: "",
    };
    console.log(this.state);
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
        });
      });
  }

  check() {
    if (this.state.likert === "0") {
      this.setState({
        ...this.state,
        message: `Select a book rating!`,
      });
      return 0;
    } else if (this.state.description.length === 0) {
      this.setState({
        ...this.state,
        message: `Description is blank!`,
      });
      return 0;
    }

    return 1;
  }

  onMakeReview = () => {
    let okay = this.check();
    if (okay === 1) {
      fetch(
        `http://localhost:9103/libraries/web/makereview/${this.state.userID}/${this.state.isbn}/${this.state.schlID}/${this.state.likert}/${this.state.description}/${this.state.type}`,
        {
          method: "POST",
          mode: "cors",
        }
      ).then(() => {
        this.setState({ ...this.state, message: "Review Added!" });
      });
    }
  };

  render() {
    console.log("Now at MakeReview");
    return (
      <div className={styles.school}>
        <h2>{this.state.title}</h2>
        <div className={styles.likert}>
          <form
            className={styles.radiostars}
            onChange={(val) =>
              this.setState({ ...this.state, likert: val.target.value })
            }
          >
            <label>
              <input type="radio" name="choice" value="1" />
              <div className={styles.container}>
                <img src={star2} className={styles.layer1} alt="filled2" />
                <img src={star1} className={styles.layer3} alt="border2" />
              </div>
            </label>

            <label>
              <input type="radio" name="choice" value="2" />
              <div className={styles.container}>
                <img src={star2} className={styles.layer1} alt="filled2" />
                <img src={star1} className={styles.layer3} alt="border2" />
              </div>
            </label>
            <label>
              <input type="radio" name="choice" value="3" />
              <div className={styles.container}>
                <img src={star2} className={styles.layer1} alt="filled2" />
                <img src={star1} className={styles.layer3} alt="border2" />
              </div>
            </label>

            <label>
              <input type="radio" name="choice" value="4" />
              <div className={styles.container}>
                <img src={star2} className={styles.layer1} alt="filled2" />
                <img src={star1} className={styles.layer3} alt="border2" />
              </div>
            </label>

            <label>
              <input type="radio" name="choice" value="5" />
              <div className={styles.container}>
                <img src={star2} className={styles.layer1} alt="filled2" />
                <img src={star1} className={styles.layer3} alt="border2" />
                <div
                  style={{
                    width: `${this.getpixels()}px`,
                    height: "32px",
                    backgroundColor: "lightblue",
                    zIndex: "2",
                    position: "absolute",
                    right: "0",
                  }}
                />
              </div>
            </label>
          </form>
        </div>

        <table>
          <tr>
            <th>Description:</th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({
                    ...this.state,
                    description: val.target.value,
                  })
                }
              />
            </td>
          </tr>
        </table>
        <span title="Make Review">
          <button onClick={this.onMakeReview} className={styles.iconbut2}>
            <img src={review} alt="Make Review" />
          </button>
        </span>
        <span title="Back">
          <button
            onClick={() => this.props.gotoreviewsofbook(this.state.title)}
            className={styles.iconbut2}
          >
            <img src={back} alt="Back" />
          </button>
        </span>
        <div className={styles.mess}>{this.state.message}</div>
      </div>
    );
  }

  getpixels() {
    var rate = Number(this.state.likert);
    var pixels = 160 - rate * 32;
    return pixels;
  }
}

export default MakeReview;
