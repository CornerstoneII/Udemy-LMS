import React, { Component } from "react";
import * as actions from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Apps from "@material-ui/icons/Apps";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCart from "@material-ui/icons/ShoppingCart";

import "./Header.scss";
import course1 from "./img/course1.jpg";

class Header extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    this.props.signOut();
  }
  render() {
    return (
      // <header id="header" class="header container">

      // </header>
      <div class="Nav">
        <div class="logo-cont">
          <Link to="/">
            <img
              class="logo"
              src="https://www.udemy.com/staticx/udemy/images/v6/logo-coral.svg"
            />
          </Link>
        </div>
        <ul class="Nav-Items">
          <Apps className="Items-text3" />
          <li class="Items-text2">Categories</li>
          <div className="search-parent">
            <Paper
              elevation={0}
              style={{
                marginLeft: 10,
                padding: "0px 6px",
                display: "flex",
                alignItems: "center",
                width: 510,
              }}
            >
              <IconButton style={{ padding: "10px" }} aria-label="Search">
                <SearchIcon />
              </IconButton>
              <Divider />
            </Paper>
          </div>
        </ul>

        <ul class="Nav-Items">
          <li class="Items-text">
            <div>Udemy for Business</div>
          </li>
          <li class="Items-text">
            <div>Teach on Udemy</div>
          </li>

          <li>
            <div class="cart-icon-container cart-content">
              <ShoppingCart class="cart-icon" />
              <div class="content hidden">
                <table id="cart-list">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <img src={course1} alt="course 1" />
                      </td>
                      <td>
                        CSS Grid & Flexbox - The Ultimite Guide +10 Projects
                      </td>
                      <td>$15</td>
                    </tr>
                  </tbody>
                </table>
                <a class="button">Clear Cart</a>
              </div>
            </div>
          </li>

          {!this.props.isAuth
            ? [
                <li class="Items" key="signin">
                  <div>
                    <Link to="/signin">
                      <button class="login">Log In</button>
                    </Link>
                  </div>
                </li>,
                <li class="Items" key="signup">
                  <div>
                    <Link to="/signup">
                      <button class="sign-up">Sign Up</button>
                    </Link>
                  </div>
                </li>,
              ]
            : null}

          {this.props.isAuth
            ? [
                <Link to="/dashboard" key="dashboard">
                  <li class="Items-text">
                    <div>Dashboard</div>
                  </li>
                </Link>,
                <li class="Items" key="logout">
                  <div>
                    <Link to="/logout" onClick={this.signOut}>
                      <button class="sign-up">Log Out</button>
                    </Link>
                  </div>
                </li>,
              ]
            : null}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps, actions)(Header);
