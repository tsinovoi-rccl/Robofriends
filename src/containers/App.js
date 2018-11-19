import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import { robots } from "../robots";
import "./App.css";

// functions that need to be aware of state (smart components) must be a class that extends component, with a constructor, with super(), and the initial state.
class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: ""
    };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ robots: users }));
  }
  // function that changes the state according to an event triggered by DOM manipulation. must use this function syntax.
  onSearchChange = event => {
    // Anytime you want to change state, you must do setState()
    this.setState({ searchfield: event.target.value });
  };
  render() {
    const { robots, searchfield } = this.state;
    //checks that if in the array of robots for a given state includes the string from the searchbox then return them.
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });
    return !robots.length ? (
      <h1>Loading...</h1>
    ) : (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        {/* When onChange happens in SearchBox, it'll trigger the function  onSearchChange() changing the state*/}
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          {/* Has the array of robots for a given state */}
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    );
  }
}
export default App;
