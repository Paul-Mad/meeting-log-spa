import firebase from "./Firebase";
import React, { Component } from "react";
import { GoMail, GoStar, GoTrashcan } from "react-icons/go";

class AttendeesList extends Component {
  constructor(props) {
    super(props);

    this.deleteAttendee = this.deleteAttendee.bind(this);
    this.toggleStar = this.toggleStar.bind(this);
  }

  deleteAttendee = (e, meetingID, attendeeID) => {
    e.preventDefault();

    const adminUser = this.props.adminUser;
    const ref = firebase
      .database()
      .ref(`meetings/${adminUser}/${meetingID}/attendees/${attendeeID}`);

    ref.remove();
  };

  toggleStar = (e, star, meetingID, attendeeID) => {
    e.preventDefault();
    const adminUser = this.props.adminUser;
    const ref = firebase
      .database()
      .ref(`meetings/${adminUser}/${meetingID}/attendees/${attendeeID}/star`);

    ref.set(!star);

    //star === undefined ? ref.set(true) : ref.set(false);
  };

  render() {
    const admin = this.props.adminUser === this.props.userID ? true : false;
    const attendees = this.props.attendees;

    const myAttendees = attendees.map((item) => {
      return (
        <div
          className="col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1"
          key={item.attendeeID}
        >
          <div className="card ">
            <div
              className={
                "card-body px-3 py-2 d-flex align-items-center" +
                (admin ? "" : "justify-content-center")
              }
            >
              {admin && (
                <div className="btn-group pr-2">
                  <button
                    className={
                      "btn btn-sm " +
                      (item.star ? "btn-info" : "btn-outline-secondary")
                    }
                    title="Give user a start"
                    onClick={(e) =>
                      this.toggleStar(
                        e,
                        item.star,
                        this.props.meetingID,
                        item.attendeeID
                      )
                    }
                  >
                    <GoStar />
                  </button>
                  <a
                    href={`mailto:${item.attendeeEmail}`}
                    className="btn btn-sm btn-outline-secondary"
                    title="Mail attendee"
                  >
                    <GoMail />
                  </a>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    title="Delete Attendee"
                    onClick={(e) =>
                      this.deleteAttendee(
                        e,
                        this.props.meetingID,
                        item.attendeeID
                      )
                    }
                  >
                    <GoTrashcan />
                  </button>
                </div>
              )}
              <div>{item.attendeeName}</div>
            </div>
          </div>
        </div>
      );
    });

    return <div className="row justify-content-center">{myAttendees}</div>;
  }
}
export default AttendeesList;
