import React, { Component } from 'react';
import {connect} from 'react-redux';

@connect(
    state => ({
        auth: state.AuthStore,
    }),
    {

    })
export default class Register extends Component {


  state = {
      user: {
          email: '',
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

clickRegister = (event) => {
    event.preventDefault();
    const username = encodeURIComponent(this.state.user.username);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `username=${username}&email=${email}&password=${password}`;
    this.props.sendRegister(formData)
}

render() {
    console.log('Register.js render', this.props)

    return (
        <div className="register">
          {this.props.auth.error?(<b>{this.props.auth.error}</b>):null}
              <input
                  type="text"
                  id="email"
                  value={this.state.user.email}
                  onChange={this.handleChange}
                  placeholder="email" />
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

                  {this.props.auth.sending?(<b>Loading</b>):
                  (<input
                      type="button"
                      onClick ={this.clickRegister}
                      value="Register" />)}

        </div>
    );
}
}
