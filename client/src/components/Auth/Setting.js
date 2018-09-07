import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';



export default class Setting extends PureComponent {

    componentDidMount() {
      this.props.usersLoad()
    }

    render() {
        const {usersLoad, auth} = this.props
        if ((auth.loaded===true) && (auth.user.scope > 50)) {
          const makeUsers = () => {
            if (auth.users) {
              const Result = auth.users.map((user) => {
                return (
                  <div>
                  <p>{auth.user.username}</p>
                  </div>
                )
              })

              return Result
            }
          }

          return (
              <div>
                <h3>Users</h3>
                {makeUsers()}
              </div>
          )
        }
        else {
          return (
              <Redirect to={{
                  pathname: "/home",
              }} />
          );

        }
    }
}
