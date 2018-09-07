import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends PureComponent {

    componentWillMount() {
        this.props.sendLogout()
    }
    render() {
        console.log('Logout.js render')
        return (
            <Redirect to={{
                pathname: "/home",
            }} />
        );
    }
}

export default Logout;
