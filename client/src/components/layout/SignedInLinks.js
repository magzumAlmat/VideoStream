import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import M from 'materialize-css';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';

class SignedInLinks extends Component{
    componentDidMount(){
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, {inDuration: 300, outDuration: 225, alignment: 'right', coverTrigger: false});
    }

    render(){
        return (
            <ul className="right">
                <li>
                    <SearchInput />
                </li>
                <li>
                    <NavLink to="/create">New Project</NavLink>
                </li>
                <li>
                    <a onClick={this.props.signOut}>Log Out</a>
                </li>
                <li>
                    <NavLink to="/" 
                    className="btn btn-floating pink lighten-1 dropdown-trigger"
                    data-target='dropdown-profile'>{this.props.profile.initials}</NavLink>
                    <ul id="dropdown-profile" className="dropdown-content">
                        <li><NavLink to='/profile'>Profile</NavLink></li>
                    </ul>
                </li>
            </ul>
        );
    }
    
}

const mapDispatchToProps = dispatch => {
    return{
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);