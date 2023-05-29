import React, { Component } from "react";
import Menu from "./Menu";
import Query311 from "./Queries/Query311";

class Queries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      query: "Select Query",
    };
  }

  componentDidMount() {}

  query311 = () => {
    this.setState({
      ...this.state,
      query: "311",
    });
  };

  render() {
    console.log("Now at Queries");
    return (
      <div>
        <Menu
          type={this.state.type}
          profile={() => this.props.gotoprofile()}
          books={() => this.props.gotobooks()}
          reservations={() => this.props.gotoreservations()}
          rentals={() => this.props.gotorentals()}
          schools={() => this.props.gotoschools()}
          operators={() => this.props.gotooperators()}
          users={() => this.props.gotousers()}
          reviews={() => this.props.gotoreviews()}
          queries={() => this.props.gotoqueries()}
        />
        {this.queries()}
        {this.query()}
      </div>
    );
  }
  queries() {
    if (this.state.type === "4")
      //top operator
      return (
        <div>
          <button onClick={this.query311}>Query 3.1.1</button>
          <button>Query 3.1.2</button>
          <button>Query 3.1.3</button>
          <button>Query 3.1.4</button>
          <button>Query 3.1.5</button>
          <button>Query 3.1.6</button>
          <button>Query 3.1.7</button>
        </div>
      );
    else if (this.state.type === "1")
      //operator
      return (
        <div>
          <button>Query 3.2.1</button>
          <button>Query 3.2.2</button>
          <button>Query 3.2.3</button>
        </div>
      );
    //student or professor
    else
      return (
        <div>
          <button>Query 3.3.1</button>
          <button>Query 3.3.2</button>
        </div>
      );
  }
  query() {
    if (this.state.query === "Select Query") return <div>Select Query</div>;
    else if (this.state.query === "311") return <Query311 />;
  }
}

export default Queries;
