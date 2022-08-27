import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import { editProject } from '../../store/actions/projectActions';
import CustomSelect from './Select'
import { Category } from '@material-ui/icons';

const options = [
    { value: 'vine', label: 'Вино' },
    { value: 'champagne', label: 'Шампанское' },
    { value: 'vodka', label: 'Водка' }
  ]

  
class EditProject extends Component {
    state = {
                
        title: '',      
        Category:'',
        Region:'',
        Manufacturer:'',
        Brand:'',
        Fortress:'',
        Colour:'',
        Sugar:'',
        Grape:'',
        Serving_temperature:'',
        Vintage:'',
        Products_webpage:'',
        content: '',
        description:'',
        delivery:''
    
    }

    handleChange = (e) => {
        e.preventDefault();
        console.log(e)
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    handleClick = (e) =>{
        e.preventDefault();
        const id = this.props.match.params.id;
        this.props.editProject(id, this.state);
        this.props.history.push(`/project/${id}`)
    }

    
    onChangeInput=(value,e)=> {
        console.log('e onChangeInput',e)
        // console.log(e.target.Category)
        // const setCategory=e.target.value.toString()
        this.state.Category=value
        e.option=value

        // console.log('Value of Category',typeof(valueString))
        // console.log('Category=',this.props.Category)

        
        // this.setState({
        //     [e.target.id]: e.target.valueString
        // })
        
        
    }
    
          
    render() {
        const project = this.props.project;

        if(project){
           console.log('-----',project.Category.label)
            return (
                <div className="container">
                    <form className="white">
                        <h5>Edit Project</h5>
                        {/* <CustomSelect  options={} onChange={this.onChangeInput}  >
                        
                            </CustomSelect>  */}
                        <div className="input-field">
                            <input type="text" id="title" placeholder={project.title} onChange={this.handleChange} />
                        </div>
                        <div className="input-field">
                            <input type="text" id="content" placeholder={project.content} onChange={this.handleChange} />
                        </div>
                        <div className="input-field" onClick={this.handleClick}>
                            <button className="btn pink lighten-1 z-depth-0">Edit</button>
                        </div>
                    </form>
                </div>
            );
        }
        else{
            return(
                <div className="container">
                    <p>Loading Project...</p>
                </div>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null;
    return {
        auth: state.firebase.auth,
        project: project
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editProject: (projectId, project) => dispatch(editProject(projectId, project))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'projects'}
    ])
)(EditProject);