import React, { Component } from 'react';
import 'whatwg-fetch';
import { setInStorage } from '../utils/storage';

export default class login extends Component
{

    constructor(props)
    {
        super(props);

        this.state =
        {
            login_name: '',
            login_password: '',
            login_completed: false,
            token: '',
            signInError: ''
        }

        this.onChangeLoginname = this.onChangeLoginname.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
    }

    onChangeLoginname(e) {
        this.setState({
            login_name: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            login_password: e.target.value
        });
    }

    onSubmit(e)
    {
        e.preventDefault();

        var email = this.state.login_name;
        var password = this.state.login_password;

        this.setState({

                    login_name: '',
                    login_password:'',
                    signInError: '',
        })

        // Post request to backend
        fetch('http://localhost:5000/api/account/signin', {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        }).then(res => res.json())
          .then(json => {
              if (json.success)
              {
                  // Save the session token as a cookie in local storage
                  setInStorage('JAIsessionToken', { token: json.token });

                  // set the app component token to the new session token
                  window.appComponent.state.token = json.token;

                  // reset the states
                  this.setState({
                    signInError: json.message,
                    isLoading: false,
                    email: '',
                    password: '',
                    token: ''
                });

                window.appComponent.componentDidMount();
                window.appComponent.render();

                  // Redirect to the home component
                  this.props.history.push('/');
              }
              else
              {
                  this.setState({
                      signInError: json.message,
                      isLoading: false
                  });
              }
          });

    }

    componentDidMount()
    {

    }

    render()
    {
        return (
            <div style={{marginTop: 10}}>
                <h3>Login</h3>
                { (this.state.signInError) ? (<p>{this.state.signInError}</p>) : (null) }
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.login_name}
                                onChange={this.onChangeLoginname}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.login_password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}