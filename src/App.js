// Import React
import React, { Component } from "react";
import { Router } from "@reach/router";
import Home from "./Home";
import Navigation from "./Navigation";
import Welcome from "./Welcome";
import Login from "./Login";
import Meetings from "./Meetings";
import Register from "./Register";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  render() {
    return (
      <div>
        <Navigation user={this.state.user} />
        {this.state.user && <Welcome user={this.state.user} />}
        <Router>
          <Home path="/" user={this.state.user} />
          <Login path="/login" />
          <Meetings path="/meetings" />
          <Register path="/register" />
        </Router>
      </div>
    );
  }
}

export default App;
