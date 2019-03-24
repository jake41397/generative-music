import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import home from "./components/home.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Compose from "./components/compose.component";
import * as mag from '@magenta/music';

class App extends Component {


  render() {
      
  	
    return (
        <Router>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light" Style="background-color: #1C1616">
                    <Link to="/" className="navbar-brand">
                    </Link>
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/login" className="nav-link" Style="color: #4482BE">Login</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/register" className="nav-link" Style="color: #4482BE">Register</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/compose" className="nav-link" Style="color: #4482BE">Compose</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br/>
                <Route path="/" exact component={home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/compose" component={Compose} />
            </div>
        </Router>
    );
  }
}

export default App;
