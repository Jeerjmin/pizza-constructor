import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {sendLogin, sendLogout, getAdminList, updateStatus} from '../../actions'
import Auth from '../../modules/Auth'
import { Route, Link} from 'react-router-dom'
import AdminPizzaList from './AdminPizzaList'
import Login from '../../components/Auth/Login'
import Logout from '../../components/Auth/Logout'

class AdminPanel extends Component {

    componentDidMount() {
        this.props.getAdminList()
    }


    render() {
        console.log('Admin.js render')
        let navigationItems = "";

        if (Auth.isUserAuthenticated()) {
            navigationItems = <Link to='/logout'>Logout</Link>;
        } else {
            navigationItems = <div><Link to='/admin'>Home</Link><Link to='/login'>Login</Link></div>;
        }
        return (
            <div className="admin">
                <h1>Панель администратора</h1>
                <div className="admin_navig_items">
                  {navigationItems}
                </div>
                <main>
                    <Route path='/admin' render={() => <AdminPizzaList updateStatus ={this.props.updateStatus} adminList = {this.props.adminList}/>}/>
                    <Route path="/login" render={() => <Login sendLogin={this.props.sendLogin}/>}/>
                    <Route path="/logout" render={() => <Logout sendLogout={this.props.sendLogout}/>} />
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    adminList: state.AdminListStore
})


const matchDispatchToProps = (dispatch) => bindActionCreators(
    {sendLogin, sendLogout, getAdminList,updateStatus},
    dispatch
);

export default connect(mapStateToProps, matchDispatchToProps)(AdminPanel);
