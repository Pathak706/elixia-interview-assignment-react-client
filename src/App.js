import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// Prime React Import
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

// Components
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Sidebar from "./components/Sidebar";
import ExcelPage from "./components/excelPage";
import SourcesPage from "./components/source";
import Destinationspage from "./components/destination";
import TransportersPage from "./components/transporter";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Sidebar />
          {/* <Navbar /> */}
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/sources" component={SourcesPage} />
            <PrivateRoute path="/destinations" component={Destinationspage} />
            <PrivateRoute path="/transporters" component={TransportersPage} />
            <PrivateRoute path="/excel-import" component={ExcelPage} />
          </div>
        </div>
      </Router>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.usertoken ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      )
    }
  />
);

export default App;
