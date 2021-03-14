import React, { Component } from "react";
import firebase from "./Firebase";
import { GoTrashcan } from "react-icons/go";
import { FaLink } from "react-icons/fa";
import { navigate } from "@reach/router";

class MeetingsList extends Component {
  constructor(props) {
    super(props);

    this.deleteMeeting = this.deleteMeeting.bind(this);
  }

  deleteMeeting = (e, id) => {
    e.preventDefault();
    //Remove the meeting passing the ID to the firebase
    const ref = firebase.database().ref(`meetings/${this.props.userID}/${id}`);
    ref.remove();
  };

  render() {
    const { meetings } = this.props;

    //Loop into the meetings and return a <div> with the data
    const myMeetings = meetings.map((meeting) => {
      return (
        <div className="list-group-item d-flex" key={meeting.meetingID}>
          <section className="btn-group align-self-center" role="group">
            <button
              className="btn btn-sm btn-outline-secondary"
              title="Check In"
              //When clicked, navigate to a meeting page passing the userID and meetingID
              onClick={() =>
                navigate(`/checkin/${this.props.userID}/${meeting.meetingID}`)
              }
            >
              <FaLink />
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              title="Delete Meeting"
              onClick={(e) => this.deleteMeeting(e, meeting.meetingID)}
            >
              <GoTrashcan />
            </button>
          </section>

          <section
            className="pl-3 text-left align-self-center"
            aria-label="Meeting Options"
          >
            {meeting.meetingName}
          </section>
        </div>
      );
    });

    return <div>{myMeetings}</div>;
  }
}

export default MeetingsList;
