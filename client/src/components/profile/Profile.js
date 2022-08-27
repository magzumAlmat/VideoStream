import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class Profile extends Component {
    render() { 
        const { projects, user } = this.props;
        if(projects && user){
            return (  
                <div className="container">
                    <div className="white profile">
                        <h4>Profile</h4>
                        <p>{user.firstName} {user.lastName}</p>
                    </div>
                </div>
            );
        }
        else{
           return(
                <div className="container">
                    <div className="white profile">
                        <h4>Loading Profile...</h4>
                    </div>
                </div>
           );
        }
        
    }
}

const mapStateToProps = (state) => {
    const userId = state.firebase.auth.uid;
    const projects = state.firestore.data.projects;
    const users = state.firestore.data.users;
    const currentUserData = users ? users[userId] : null;
    return{
        projects: projects,
        user: currentUserData,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {

    }
}
 
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'users'},
        {collection: 'projects'}
    ])
)(Profile);