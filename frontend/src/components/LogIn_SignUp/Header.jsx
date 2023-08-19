import React, { Component } from "react";
import styles from "../../CSS/mystyle.module.css";

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ul className={styles.navbar}>
        <li>
          <button
            className={styles.navbut}
            onClick={() => this.props.onHeaderLogInPress()}
          >
            Log In
          </button>
        </li>
        <li>
          <button
            className={styles.navbut}
            onClick={() => this.props.onHeaderSignUpPress()}
          >
            Sign Up
          </button>
        </li>
      </ul>
    );
  }
}

export default Header;
