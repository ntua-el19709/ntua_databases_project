import React, { Component } from "react";
import Menu from "./Menu";
import styles from "../CSS/mystyle.module.css";
import add from "../icons/add.png";

class SchoolUnits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: [],
      type: this.props.type,
    };
  }

  componentDidMount() {
    fetch(`http://localhost:9103/libraries/web/allschools`)
      .then((response) => response.json())
      .then((obj) => {
        this.setState({
          ...this.state,
          schools: obj.map((school) => {
            return school;
          }),
        });
      });
    console.log(this.state.type);
  }

  render() {
    console.log("Now at SchoolUnits");
    return (
      <div>
        <Menu
          type={this.state.type}
          profile={() => this.props.gotoprofile()}
          schools={() => this.props.gotoschools()}
          operators={() => this.props.gotooperators()}
          queries={() => this.props.gotoqueries()}
        />
        <div className={styles.resren1}>All School Units:</div>
        <span title="Add School">
          <button
            onClick={() => this.props.addschool()}
            className={styles.iconbut}
          >
            <img src={add} alt="Add School" />
          </button>
        </span>

        <ul className={styles.old}>
          {this.state.schools.map((school) => (
            <li
              key={school.schoolID}
              onClick={() => this.props.gotoschool(school.schoolID)}
            >
              {school.schoolname}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SchoolUnits;
