import React, { Component } from "react";
import styles from "../CSS/mystyle.module.css";
import delet from "../icons/delete.png";
import pencil from "../icons/pencil.png";
import back from "../icons/back.png";

class School extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schlID: this.props.schlID,
      name: "",
      address: "",
      city: "",
      telephone: "",
      email: "",
      principal: "",
      message: "",
      notdeleted: 1,
    };
  }

  componentDidMount() {
    fetch(`http://localhost:9103/libraries/web/schlinfo/${this.state.schlID}`)
      .then((response) => response.json())
      .then((obj) => {
        this.setState({
          ...this.state,
          name: obj.schoolName,
          address: obj.address,
          city: obj.city,
          telephone: obj.telephone,
          email: obj.email,
          principal: obj.principal,
        });
      });
    console.log(this.state.type);
  }

  DeleteSchool = () => {
    fetch(
      `http://localhost:9103/libraries/web/deleteusersofschool/${this.state.schlID}`,
      {
        method: "POST",
        mode: "cors",
      }
    ).then(() => {
      fetch(
        `http://localhost:9103/libraries/web/deleteschool/${this.state.schlID}`,
        {
          method: "POST",
          mode: "cors",
        }
      ).then(() => {
        this.setState({
          ...this.state,
          notdeleted: 0,
          message: "School Deleted",
        });
      });
    });
  };

  render() {
    console.log("Now at School");
    return (
      <div className={styles.school}>
        <table>
          <tr>
            <th>Name of School:</th>
            <td>{this.state.name}</td>
          </tr>
          <tr>
            <th>Address:</th>
            <td>{this.state.address}</td>
          </tr>
          <tr>
            <th>City:</th>
            <td>{this.state.city}</td>
          </tr>
          <tr>
            <th>Telephone:</th>
            <td>{this.state.telephone}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>{this.state.email}</td>
          </tr>
          <tr>
            <th>Principal:</th>
            <td>{this.state.principal}</td>
          </tr>
        </table>
        <span title="Edit School">
          <button
            onClick={() => {
              if (this.state.notdeleted === 1)
                this.props.editschool(this.state.schlID);
            }}
            className={styles.iconbut2}
          >
            <img src={pencil} alt="Edit School" />
          </button>
        </span>
        <span title="Delete School">
          <button onClick={this.DeleteSchool} className={styles.iconbut2}>
            <img src={delet} alt="Delete School" />
          </button>
        </span>
        <span title="Back">
          <button
            onClick={() => this.props.gotoschools()}
            className={styles.iconbut2}
          >
            <img src={back} alt="Back" />
          </button>
        </span>
        <div className={styles.mess}>{this.state.message}</div>
      </div>
    );
  }
}

export default School;
