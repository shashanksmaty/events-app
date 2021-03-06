import React, { Component } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";

import { openModal, closeModal } from "../modals/modalActions";
import ModalContainer from "../modals/ModalContainer";

import { signout } from "../../app/actions/authActions";

class Navbar extends Component {
  handleSignIn = () => {
    console.log("Show Login Modal");
    this.props.openModal("loginModal", { title: "Login To Happenings" }, true);
  };

  handleRegister = () => {
    console.log("Show Registration Modal");
    this.props.openModal("registerModal", { title: "Join Happenings" }, true);
  };

  handleSignOut = () => {
    this.props.signout();
    this.props.history.push("/");
  };

  render() {
    const { auth } = this.props;
    const authenticated = auth.authenticated;
    return (
      <nav
        className="navbar fixed-top navbar-expand-lg navbar-dark"
        style={navbarStyle}
      >
        <Link className="navbar-brand" to="/">
          Happenings
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/events">
                Events
              </NavLink>
            </li>
            <li className="nav-item">
              <Link className="btn btn-success ml-2" to="/newevent">
                Create Event
              </Link>
            </li>
          </ul>
          {authenticated ? (
            <SignedIn
              signOut={this.handleSignOut}
              currentUser={auth.currentUser}
            />
          ) : (
            <SignedOut
              signIn={this.handleSignIn}
              register={this.handleRegister}
            />
          )}
        </div>
        <ModalContainer />
      </nav>
    );
  }
}

const navbarStyle = {
  backgroundImage:
    "linear-gradient(135deg, rgb(24, 42, 115) 0%, rgb(33, 138, 174) 69%, rgb(32, 167, 172) 89%)"
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { openModal, closeModal, signout }
  )(Navbar)
);
