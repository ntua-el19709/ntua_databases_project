import React, { Component } from "react";

class MakeReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      userID: this.props.userID,
      isbn: this.props.isbn,
      schlID: this.props.schlID,
      title: "",
      likert: "",
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
    if (this.state.likert.length === 0) {
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
    this.setState({ ...this.state, message: "Review Added!" });
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
      );
    }
  };

  render() {
    console.log("Now at MakeReview");
    return (
      <div>
        <table>
          <tr>
            <th>Book:</th>
            <td>{this.state.title}</td>
          </tr>
          <tr>
            <th>Rate Book:</th>
            <td>
              <form>
                <dl
                  onChange={(val) =>
                    this.setState({ ...this.state, likert: val.target.value })
                  }
                >
                  <dd>
                    <input type="radio" name="choice" value="1" />
                    <label>1</label>
                  </dd>
                  <dd>
                    <input type="radio" name="choice" value="2" />
                    <label>2</label>
                  </dd>
                  <dd>
                    <input type="radio" name="choice" value="3" />
                    <label>3</label>
                  </dd>
                  <dd>
                    <input type="radio" name="choice" value="4" />
                    <label>4</label>
                  </dd>
                  <dd>
                    <input type="radio" name="choice" value="5" />
                    <label>5</label>
                  </dd>
                </dl>
              </form>
            </td>
          </tr>
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
        <button onClick={this.onMakeReview}>Make Review</button>
        <div>{this.state.message}</div>
        <button onClick={() => this.props.gotoreviewsofbook()}>{"<-"}</button>
      </div>
    );
  }
}

export default MakeReview;
