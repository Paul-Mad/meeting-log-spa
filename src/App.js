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

  //When the component is mounted, check if there is a user and update the state so its info can be displayed
  componentDidMount() {
    //get the user from  firebase auth and update the state with that user
    firebase.auth().onAuthStateChanged((FBUser) => {
      if (FBUser) {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid,
        });

        //get the ref for the user uid from the meetings
        const meetingRef = firebase.database().ref("meetings/" + FBUser.uid);
        //console.log(meetingRef);
        meetingRef.on("value", (snapshot) => {
          let meetings = snapshot.val();

          //Create an array of objects to list the meetings by meetingID and meetingName
          const meetingList = [];
          for (let item in meetings) {
            meetingList.push({
              meetingID: item,
              meetingName: meetings[item].meetingName,
            });
          }
          //console.log(meetingList); // [{meetingID,meetingName}]

          //update the state with the meetings data
          this.setState({
            meetings: meetingList,
            howManyMeetings: meetingList.length,
          });
        });

        console.log(this.state);
      } else {
        this.setState({ user: null });
      }
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
  //Logout the user by setting the state to null and calling a firebase function that signOut the user and then navigate to the login route
  logoutUser = (e) => {
    e.preventDefault();
    this.setState({
      user: null,
      displayName: null,
      userID: null,
    });

    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate("/login");
      });
  };

  addMeeting = (meetingName) => {
    const ref = firebase.database().ref(`meetings/${this.state.user.uid}`);
    console.log(ref);
    ref.push({ meetingName: meetingName });
  };

  //Logout the user by setting the state to null and calling a firebase function that signOut the user and then navigate to the login route
  logoutUser = (e) => {
    e.preventDefault();
    this.setState({
      user: null,
      displayName: null,
      userID: null,
    });

    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate("/login");
      });
  };

  //Main render that displays all the components
  render() {
    return (
      <div>
        <Navigation user={this.state.user} logoutUser={this.logoutUser} />
        {this.state.user && (
          <Welcome
            userName={this.state.displayName}
            logoutUser={this.logoutUser}
          />
        )}

        <Router>
          <Home path="/" user={this.state.user} />
          <Login path="/login" />
          <Meetings
            path="/meetings"
            meetings={this.state.meetings}
            addMeeting={this.addMeeting}
          />
          <Register path="/register" registerUser={this.registerUser} />
        </Router>
      </div>
    );
  }
}

export default App;
