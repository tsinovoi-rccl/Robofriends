import React, { Component } from "react";
import CardList from "./CardList";
import SearchBox from "./SearchBox";
import { robots } from "./robots";
import "./App.css";

// functions that need to be aware of state (smart components) must be a class that extends component, with a constructor, with super(), and the initial state.
class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: robots,
      searchfield: ""
    };
  }
  // function that changes the state according to an event triggered by DOM manipulation. must use this function syntax.
  onSearchChange = event => {
    // Anytime you want to change state, you must do setState()
    this.setState({ searchfield: event.target.value });
  };
  render() {
    //checks that if in the array of robots for a given state includes the string from the searchbox then return them.
    const filteredRobots = this.state.robots.filter(robot => {
      return robot.name
        .toLowerCase()
        .includes(this.state.searchfield.toLowerCase());
    });
    return (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        {/* When onChange happens in SearchBox, it'll trigger the function  onSearchChange() changing the state*/}
        <SearchBox searchChange={this.onSearchChange} />
        {/* Has the array of robots for a given state */}
        <CardList robots={filteredRobots} />
      </div>
    );
  }
}
export default App;
