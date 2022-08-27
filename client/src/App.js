import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetails from './components/projects/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/projects/CreateProject';
import EditProject from './components/projects/EditProject'
import Profile from './components/profile/Profile'
import ProjectListWithoutAuth from './components/projects/ProjectListWithoutAuth';

class App extends Component {
  render() { 
    return (  
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/project/:id' component={ProjectDetails} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' component={CreateProject} />
            <Route path='/project/:id/edit' component={EditProject} />
            <Route path='/profile' component={Profile} />
          
            
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
 
export default App;
