import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Auth from '../../modules/Auth'

class Login extends Component {


  state = {
      user: {
          username: '',
          password: ''
      },
      userData: {}
  }

  handleChange = (event) => {
      const field = event.target.id;
      const user = this.state.user;
      user[field] = event.target.value;
      this.setState({ user })
  }

clickLogin = (event) => {
    event.preventDefault();
    const username = encodeURIComponent(this.state.user.username);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `username=${username}&password=${password}`;
    this.props.sendLogin(formData)
}

render() {
    console.log('Login.js render')
    if (Auth.isUserAuthenticated()) {
        return (
            <Redirect to={{
                pathname: "/admin",
            }} />
        );
    }

    return (
        <div className="login">
                <input
                    type="text"
                    id="username"
                    value={this.state.user.username}
                    onChange={this.handleChange}
                    placeholder="login" />
                <input
                    type="password"
                    id="password"
                    value={this.state.user.password}
                    onChange={this.handleChange}
                    placeholder="password"/>
                <input
                    type="button"
                    onClick ={this.clickLogin}
                    value="Login" />
        </div>
    );
}
}

export default Login;
