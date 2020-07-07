import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Landing extends Component {
  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push(`/`);
  }

  render() {
    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    );

    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/sources" className="nav-link">
            Source
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/destinations" className="nav-link">
            Destination
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/transporters" className="nav-link">
            Transporter
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/excel-import" className="nav-link">
            Excel Import
          </Link>
        </li>
        <li className="nav-item">
          <a href="" onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    );

    return (
      <nav className="sidebar navbar-expand-lg navbar-dark bg-dark ">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
          {localStorage.usertoken ? userLink : loginRegLink}
        </div>
      </nav>
    );
  }
}

export default withRouter(Landing);
