import React, { Component } from 'react';
import Notifications from './Notifications';
import ProjectList from '../projects/ProjectList';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import ProjectListWithoutAuth from '../projects/ProjectListWithoutAuth';

class Dashboard extends Component {

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.q !== this.props.q){
            return true;
        }
        else if(this.props.projects){
            return true;
        }
        else{
            return false;
        }
    }

    componentWillUpdate(){
        this.props.projects.filter(el =>{
            el.title.includes(this.props.q)
        })
    }

    render() { 
        //console.log(this.props);
        const { projects, auth, notifications, q } = this.props;

        let filteredProjects = projects;
        
        if(!auth.uid) return (<div className="dashboard container">
        <div className="row">
            <div className="col s12 m6">
                <ProjectListWithoutAuth projects={this.props.projects} />
            </div>
            <div className="col s12 m5 offset-m1">
                <Notifications notifications={notifications}/>
            </div>
        </div>
    </div>)
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <ProjectList projects={this.props.projects} />
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications notifications={notifications}/>
                    </div>
                </div>
            </div>
        );
    }
}

const getSearchedProjects = (projects, q) => {
    if(q){
        return projects.filter(p => p.title.toLowerCase().startsWith(q.toLowerCase()));
    }
    else{
        return projects
    }
}

const mapStateToProps = (state) => {
    return {
        projects: getSearchedProjects(state.firestore.ordered.projects, state.search.q),
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications,
    }
};
 
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects', orderBy:['createdAt', 'desc']},
        { collection: 'notifications', limit: 3, orderBy:['time', 'desc']}
    ])
)(Dashboard);