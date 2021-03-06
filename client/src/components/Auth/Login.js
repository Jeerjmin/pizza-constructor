import React, { Component } from 'react';
import {authLoad} from '../../actions'
import { Redirect } from 'react-router-dom';
import Auth from '../../modules/Auth'
import {connect} from 'react-redux';

@connect(
    state => ({
        auth: state.AuthStore,
    }),
    {
      authLoad
    })
export default class Login extends Component {


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
    if (this.props.auth.loaded===true) {
        return (
            <Redirect to={{
                pathname: "/home",
            }} />
        );
    }

    return (
        <div className="login">
            {this.props.auth.success_message?(<b>{this.props.auth.success_message}</b>):null}
            {this.props.auth.error_login?(<b>{this.props.auth.error_login}</b>):null}
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

                {this.props.auth.sending_login?(<b>Loading</b>):
                (<input
                    type="button"
                    onClick ={this.clickLogin}
                    value="Login" />)}
        </div>
    );
}
}
