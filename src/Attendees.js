import React, { Component } from "react";
import AttendeesList from "./AttendeesList";
import { FaRandom, FaUndo } from "react-icons/fa";

import firebase from "./Firebase";

class Attendees extends Component {
  constructor(props) {
    super(props);

    this.state = { searchQuery: "", displayAttendees: [], allAttendees: [] };

    this.changeHandler = this.changeHandler.bind(this);
    this.resetQuery = this.resetQuery.bind(this);

    this.chooseRandom = this.chooseRandom.bind(this);
  }

  //When component mount, get the list of the attendees from database
  componentDidMount() {
    const ref = firebase
      .database()
      .ref(`/meetings/${this.props.userID}/${this.props.meetingID}/attendees`);

    ref.on("value", (snapshot) => {
      let attendees = snapshot.val();

      let attendeesList = [];

      for (let item in attendees) {
        attendeesList.push({
          attendeeID: item,
          attendeeName: attendees[item].attendeeName,
          attendeeEmail: attendees[item].attendeeEmail,
          star: attendees[item].star,
        });

        this.setState({
          allAttendees: attendeesList,
          displayAttendees: attendeesList,
        });
      }
    });
  }

  // Search input changeHandler
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value }); // eg: searchQuery: "Paulo"
  };

  resetQuery() {
    this.setState({
      searchQuery: "",
      displayAttendees: this.state.allAttendees,
    });
  }

  //Choose a  random attendee from the list
  chooseRandom() {
    const randomAttendee = Math.floor(
      Math.random() * this.state.allAttendees.length
    );
    this.resetQuery();

    this.setState({
      displayAttendees: [this.state.allAttendees[randomAttendee]],
    });
  }

  render() {
    //Filter the data to search
    const dataFilter = (item) =>
      item.attendeeName
        .toLowerCase()
        .match(this.state.searchQuery.toLowerCase()) && true;

    const filteredAttendees = this.state.displayAttendees.filter(dataFilter);

    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="font-weight-light text-center">Attendees</h1>
            <div className="card bg-light mb-4">
              <div className="card-body text-center">
                <div className="input-group input-group-lg">
                  <input
                    type="text"
                    name="searchQuery"
                    placeholder="Search Attendees"
                    className="form-control"
                    value={this.state.searchQuery}
                    onChange={(e) => this.changeHandler(e)}
                  ></input>
                  <div className="input-group-append">
                    <button
                      className="btn btn-sm btn-outline-info"
                      title="Pick a random attendee"
                      onClick={this.chooseRandom}
                    >
                      <FaRandom />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-info"
                      title="reset search"
                      onClick={this.resetQuery}
                    >
                      <FaUndo />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AttendeesList
          userID={this.props.userID}
          adminUser={this.props.adminUser}
          meetingID={this.props.meetingID}
          attendees={filteredAttendees}
        />
      </div>
    );
  }
}

export default Attendees;
