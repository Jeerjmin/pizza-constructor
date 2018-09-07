import React, { Component } from 'react';
import {connect} from 'react-redux'
import {sendRegister, sendLogin, sendLogout, getAdminList, updateStatus, usersLoad} from '../../actions'
import Auth from '../../modules/Auth'
import { Route, Link} from 'react-router-dom'
import AdminPizzaList from './AdminPizzaList'
import Login from '../../components/Auth/Login'
import Logout from '../../components/Auth/Logout'
import Register from '../../components/Auth/Register'
import Setting from '../../components/Auth/Setting'

@connect(
    state => ({
        auth: state.AuthStore,
        adminList: state.AdminListStore,
    }),
    {
      sendRegister, sendLogin, sendLogout, getAdminList,updateStatus,usersLoad
    })
export default class OrderPanel extends Component {

    componentDidMount() {
        this.props.getAdminList()
    }

    render() {
        let navigationItems = "";

        if (this.props.auth.loaded) {
          if (this.props.auth.user.scope > 50) {
            navigationItems = <div><Link to='/home'>Home</Link><Link to='/setting'>Admin panel</Link><Link to='/logout'>Logout</Link></div>;
          }
          else {
            navigationItems = <div><Link to='/home'>Home</Link><Link to='/logout'>Logout</Link></div>;
          }
        } else {
            navigationItems = <div className="admin_navig_items" ><Link to='/home'>Home</Link><Link to='/register'>Register</Link><Link to='/login'>Login</Link></div>;
        }
        return (
            <div className="admin">
                <h1>Панель заказов</h1>
                  {navigationItems}
                <main>
                    <Route exact path='/home' render={() => <AdminPizzaList updateStatus ={this.props.updateStatus} adminList = {this.props.adminList}/>}/>
                    <Route path="/register" render={() => <Register sendRegister={this.props.sendRegister} />}/>
                    <Route path="/login" render={() => <Login sendLogin={this.props.sendLogin}/>}/>
                    <Route path="/logout" render={() => <Logout sendLogout={this.props.sendLogout}/>} />
                    <Route path="/setting" render={() => <Setting auth={this.props.auth} usersLoad={this.props.usersLoad}/>} />

                </main>
            </div>
        );
    }
}
