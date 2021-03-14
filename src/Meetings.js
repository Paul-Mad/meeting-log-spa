import firebase from "./Firebase";
import React, { Component } from "react";
import MeetingList from "./MeetingsList";

class Meetings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingName: "",
      errorMessage: null,
    };
    //Bind the this key word to the handler functions
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;
    this.setState({ [itemName]: itemValue });
  }

  submitHandler(e) {
    e.preventDefault();
    this.props.addMeeting(this.state.meetingName);
    this.setState({ meetingName: "" });
  }
  render() {
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h1 className="font-weight-light">Add a Meeting</h1>
            <div className="card bg-light">
              <div className="card-body text-center">
                <form className="formgroup" onSubmit={this.submitHandler}>
                  <div className="input-group input-group-lg">
                    <input
                      type="text"
                      className="form-control"
                      name="meetingName"
                      placeholder="Meeting name"
                      aria-describedby="buttonAdd"
                      value={this.meetingName}
                      onChange={this.changeHandler}
                    />
                    <div className="input-group-append">
                      <button
                        type="submit"
                        className="btn btn-sm btn-info"
                        id="buttonAdd"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-11 col-md-6 text-center">
            <div className="card border-top-0 rounded-0">
              {this.props.meetings && this.props.meetings.length ? (
                <div className="card-body py-2">
                  <h4 className="card-title font-weight-light m-0">
                    Your Meetings
                  </h4>
                </div>
              ) : null}

              {this.props.meetings && (
                <div className="list-group list-group-flush">
                  <MeetingList meetings={this.props.meetings} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Meetings;
