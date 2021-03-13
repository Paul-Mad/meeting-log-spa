// Import React
import React, { Component } from "react";

import Home from "./Home";
import Navigation from "./Navigation";
import Welcome from "./Welcome";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: "Paulo",
    };
  }

  render() {
    return (
      <div>
        <Navigation />
        {this.state.user && <Welcome user={this.state.user} />}
        <Home user={this.state.user} />;
      </div>
    );
  }
}

export default App;
