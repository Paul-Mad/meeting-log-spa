// Import React
import React, { Component } from "react";
import { navigate, Router } from "@reach/router";
import firebase from "./Firebase";

import Home from "./Home";
import Welcome from "./Welcome";
import Navigation from "./Navigation";
import Login from "./Login";
import Register from "./Register";
import Meetings from "./Meetings";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      displayName: null,
      userID: null,
    };
  }

  componentDidMount() {
    const ref = firebase.database().ref("user");

    ref.on("value", (snapshot) => {
      let FBUser = snapshot.val();
      this.setState({ user: FBUser });
    });
  }

  // Register the user displayName
  registerUser = (userName) => {
    // the onAuthStateChanged() method get the user created on the auth, and we are going to pass the displayName to it
    firebase.auth().onAuthStateChanged((FBUser) => {
      FBUser.updateProfile({ displayName: userName }).then(() => {
        //After updating the user on firebase,  I'm updating the user in state to the displayName
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid,
        });
        navigate("/meetings");
      });
    });
  };

  render() {
    return (
      <div>
        <Navigation user={this.state.user} />
        {this.state.user && <Welcome user={this.state.displayName} />}

        <Router>
          <Home path="/" user={this.state.user} />
          <Login path="/login" />
          <Meetings path="/meetings" />
          <Register path="/register" registerUser={this.registerUser} />
        </Router>
      </div>
    );
  }
}

export default App;
