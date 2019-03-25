import React, { Component} from 'react';

export default class Register extends Component {

    constructor(props)
    {
        super(props);

        this.state =
        {
            email: '',
            password:'',
            isLoading: false,
            signUpError: ''
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e)
    {
        e.preventDefault();
        
        var email = this.state.email;
        var password = this.state.password;

        this.setState({

                    email: '',
                    password:'',
                    signUpError: '',
                    isLoading: true
        });

        // Post request to backend
        fetch('http://localhost:5000/api/account/signup', {
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
                  this.setState({
                      signUpError: json.message,
                      isLoading: false,
                      email: '',
                      password: ''
                  });
              }
              else
              {
                  this.setState({
                      signUpError: json.message,
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
                <h3>Register</h3>
                { (this.state.signUpError) ? (<p>{this.state.signUpError}</p>) : (null) }
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value={!this.state.isLoading ? "Register" : "Loading..."} className="btn btn-danger" />
                    </div>
                </form>
            </div>
        )
    }
}