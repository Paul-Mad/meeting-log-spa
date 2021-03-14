import firebase from "./Firebase";
import React, { Component } from "react";
import FormError from "./FormError";
import { navigate } from "@reach/router";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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
    const loginInfo = {
      email: this.state.email,
      password: this.state.password,
    };

    firebase
      .auth()
      .signInWithEmailAndPassword(loginInfo.email, loginInfo.password)
      .then(() => {
        navigate("/meetings");
      })
      .catch((error) => {
        error.message !== null
          ? this.setState({ errorMessage: error.message })
          : this.setState({ errorMessage: null });
      });
  }
  render() {
    return (
      <div>
        <form className="mt-3" onSubmit={this.submitHandler}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="card bg-light">
                  <div className="card-body">
                    <h3 className="font-weight-light mb-3">Log in</h3>
                    <section className="form-group">
                      {this.state.errorMessage !== null ? (
                        <FormError theMessage={this.state.errorMessage} />
                      ) : null}
                      <label
                        className="form-control-label sr-only"
                        htmlFor="Email"
                      >
                        Email
                      </label>
                      <input
                        required
                        className="form-control"
                        type="email"
                        id="email"
                        placeholder="Email"
                        name="email"
                        value={this.state.email}
                        onChange={this.changeHandler}
                      />
                    </section>
                    <section className="form-group">
                      <input
                        required
                        className="form-control"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.changeHandler}
                      />
                    </section>
                    <div className="form-group text-right mb-0">
                      <button className="btn btn-primary" type="submit">
                        Log in
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
