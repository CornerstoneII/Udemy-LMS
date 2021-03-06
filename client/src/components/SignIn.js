import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import GoogleLogin from "react-google-login";

import CustomInput from "./CustomInput";

import { connect } from "react-redux";
import { compose } from "redux";

import * as actions from "../actions";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }
  async onSubmit(formData) {
    await this.props.signIn(formData);
    if (!this.props.errorMessage) {
      this.props.history.push("/dashboard");
    }
  }
  async responseGoogle(res) {
    await this.props.oauthGoogle(res.accessToken);
    if (!this.props.errorMessage) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row">
        <div className="row">
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset>
              <Field
                name="email"
                type="text"
                id="email"
                label="Enter your email"
                placeholder="example@example.com"
                component={CustomInput}
              />
            </fieldset>

            <fieldset>
              <Field
                name="password"
                type="password"
                id="password"
                label="Enter your password"
                placeholder="yoursuperpassword"
                component={CustomInput}
              />
            </fieldset>

            {this.props.errorMessage ? (
              <div className="alert alert-danger">
                {this.props.errorMessage}
              </div>
            ) : null}

            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </form>
        </div>
        <div className="col">
          <div className="text-center">
            <div className="alert alert-primary"> Or Sign In using</div>
            <GoogleLogin
              clientId="480413171171-b189t9nlospf72nrjl580333e5mvo6bm.apps.googleusercontent.com"
              buttonText="Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              className="btn btn-outline-danger"
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
  };
}
export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "signin" })
)(SignIn);
