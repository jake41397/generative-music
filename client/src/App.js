import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import 'whatwg-fetch';

import {
    getFromStorage,
    setInStorage,
} from './utils/storage';

import home from "./components/home.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Compose from "./components/compose.component";

export default class App extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            isLoading: true,
            token: '',
            signUpError: '',
            signInError: '',
            masterError: ''
        };

        this.render = this.render.bind(this);
        this.logout = this.logout.bind(this);
        window.appComponent = this;
    }

componentDidMount()
{
    const obj = getFromStorage('JAIsessionToken');

    if (obj && obj.token)
    {
        const { token } = obj;

        // Verify token
        fetch('http://localhost:5000/api/account/verify?token=' + token)
            .then(res => res.json())
            .then(json => {
                if (json.success)
                {
                    this.setState({
                        token,
                        isLoading: false
                    });
                }
                else
                {
                    this.setState({
                        isLoading: false,
                    })
                }
            })
    }
    else
    {
        this.setState({
            isLoading: false,
            token: '',
        })
    }
}

logout()
{

}

render() 
{
    const {
        isLoading,
        token
    } = this.state;

    if (isLoading)
    {
        return (<div><p>Loading...</p></div>);
    }

    var loggedInItems = (
        <li className="navbar-item" Style="color:#ffffff">
            <a class="nav-link disabled" Style="color:#7f7f7f" href="/">         Logged in</a>
        </li>
    );

    var signInAndUpItems = [(
        <li className="navbar-item">
            <Link to="/login" className="nav-link" Style="color: #4482BE">Login</Link>
        </li>   
    ), 
    (
        <li className="navbar-item">
            <Link to="/register" className="nav-link" Style="color: #4482BE">Register</Link>
        </li>
    )];    

    // Changes what is shown to the user based on whether or not they are logged in
    if (token)
    {
        return (
            <Router>
                <div className="container">  
                    <nav className="navbar navbar-expand-lg navbar-light navbar-custom" height="400" Style="background-color: #1c1716">
                    <a className="navbar-brand" href="/">
                        <img src={window.location.origin + '/Images/square.png'} width="120" height="120" class="d-inline-block align-top" alt="JAI Composer Logo"/>
                        <img src={window.location.origin + '/Images/JAI.png'} width="128" height="128" class="d-inline-block" alt="JAI Composer Logo"/>
                        </a>                    
                        <Link to="/" className="navbar-left">
                        </Link>
                        <div className="collpase navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                                     
                                <li className="navbar-item">
                                    <Link to="/compose" className="nav-link" Style="color: #4482BE">Compose</Link>
                                </li>
                                    {loggedInItems}
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
    else
    {
        return (
            <Router>
                <div className="container">  
                    <nav className="navbar navbar-expand-lg navbar-light navbar-custom" height="400" Style="background-color: #1c1716">
                    <a className="navbar-brand" href="/">
                        <img src={window.location.origin + '/Images/square.png'} width="120" height="120" class="d-inline-block align-top" alt="JAI Composer Logo"/>
                        <img src={window.location.origin + '/Images/JAI.png'} width="128" height="128" class="d-inline-block" alt="JAI Composer Logo"/>
                        </a>                    
                        <Link to="/" className="navbar-left">
                        </Link>
                        <div className="collpase navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                {signInAndUpItems}                        
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
}
