import React, { Component } from 'react';

export default class login extends Component
{

    constructor(props)
    {
        super(props);

        this.state =
        {
            login_name: '',
            login_password:'',
            login_completed:false
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

        var pw = this.state.login_password;
        var login = this.state.login_name;

        console.log("login was" + login);
        console.log("pw was" + pw);

        this.setState({

                    login_name: '',
                    login_password:''

        })

    }

    render()
    {
        return (
            <div style={{marginTop: 10}}>
                <h3>Login</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Login name</label>
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