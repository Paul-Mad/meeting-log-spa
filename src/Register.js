import firebase from "./Firebase";
import React, { Component } from "react";
import FormError from "./FormError";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      email: "",
      passOne: "",
      passTwo: "",
      errorMessage: null,
    };

    //Bind the this key word to the handler functions
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;
    this.setState({ [itemName]: itemValue }, () => {
      //Compare and verify the passwords
      this.state.passOne !== this.state.passTwo
        ? this.setState({ errorMessage: "Passwords do not match" })
        : this.setState({ errorMessage: null });
    });
  }

  submitHandler(e) {
    //Get the data from the user to be registered
    const registrationInfo = {
      displayName: this.state.displayName,
      email: this.state.email,
      password: this.state.passOne,
    };
    e.preventDefault();

    //create the authentication user in firebase using the email and password
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        registrationInfo.email,
        registrationInfo.password
      )
      .then(() => {
        //Register the user displayName after the user auth creation
        this.props.registerUser(registrationInfo.displayName);
      })
      .catch((error) => {
        error.message !== null
          ? this.setState({ errorMessage: error.message })
          : this.setState({ errorMessage: null });
      });
  }

  //Render the form
  render() {
    return (
      <div>
        <form className="mt-3" onSubmit={this.submitHandler}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="card bg-light">
                  <div className="card-body">
                    <h3 className="font-weight-light mb-3">Register</h3>
                    <div className="form-row">
                      {this.state.errorMessage !== null ? (
                        <FormError theMessage={this.state.errorMessage} />
                      ) : null}

                      <section className="col-sm-12 form-group">
                        <label
                          className="form-control-label sr-only"
                          htmlFor="displayName"
                        >
                          Display Name
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="displayName"
                          placeholder="Display Name"
                          name="displayName"
                          required
                          v-model="displayName"
                          value={this.state.displayName}
                          onChange={this.changeHandler}
                        />
                      </section>
                    </div>
                    <section className="form-group">
                      <label
                        className="form-control-label sr-only"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className="form-control"
                        type="email"
                        id="email"
                        placeholder="Email Address"
                        required
                        name="email"
                        v-model="email"
                        value={this.state.email}
                        onChange={this.changeHandler}
                      />
                    </section>
                    <div className="form-row">
                      <section className="col-sm-6 form-group">
                        <input
                          className="form-control"
                          type="password"
                          placeholder="Password"
                          v-model="passOne"
                          name="passOne"
                          value={this.state.passOne}
                          onChange={this.changeHandler}
                        />
                      </section>
                      <section className="col-sm-6 form-group">
                        <input
                          className="form-control"
                          type="password"
                          required
                          placeholder="Repeat Password"
                          v-model="passTwo"
                          name="passTwo"
                          value={this.state.passTwo}
                          onChange={this.changeHandler}
                        />
                      </section>
                    </div>
                    <div className="form-group text-right mb-0">
                      <button className="btn btn-primary" type="submit">
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <p className="text-center mt-2">
          or
          <router-link to="/login">login</router-link>
        </p>
      </div>
    );
  }
}

export default Register;
