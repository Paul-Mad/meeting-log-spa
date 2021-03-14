import React, { Component } from "react";

class MeetingsList extends Component {
  render() {
    const { meetings } = this.props;

    //Loop into the meetings and return a <div> with the data
    const myMeetings = meetings.map((meeting) => {
      return (
        <div className="list-group-item d-flex" key={meeting.meetingID}>
          <section className="pl-3 text-left align-self-center">
            {meeting.meetingName}
          </section>
        </div>
      );
    });

    return <div>{myMeetings}</div>;
  }
}

export default MeetingsList;
