import React,{useState} from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { deleteProject } from '../../store/actions/projectActions'


// import "node_modules/video-react/dist/video-react.css";
import { Player ,BigPlayButton} from 'video-react';
import "./video-react.css";
import ReactPlayer from 'react-player'
// const [cart,setCart]=useState([])

const addToCart=(props)=>{
    
    let cart=props
    console.log('we are iin add card',cart)
  
}



const ProjectDetails = (props) => {
    const [presUrl, setpresUrl] = useState();

    const { project, auth } = props;

    const handleClick = (e) =>{
        e.preventDefault();
        const id = props.match.params.id;
        props.deleteProject(id, auth.uid);
        props.history.push('/');
    }

    const handleEditClick = (e) =>{
        console.log(props.id)
        e.preventDefault();
        props.history.push(`/project/${props.match.params.id}/edit`);
    }


   
   
    console.log('project from project details',project)
    
    if(!auth.uid) return (
        
        <div className="container section project-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <p>{project.Category.label}</p>
                        <span className="card-title">{ project.title }</span>
                        <p>{ project.content }</p>

                        <button onClick={()=>addToCart(project)}>
                         add to card
                         </button>

                        {/* <button className="button waves-effect waves-light btn indigo darken-2"
                        disabled={disabledBool}
                        onClick={handleEditClick}>
                            Edit
                        </button>
                        <button 
                            onClick={handleClick}
                            className="button waves-effect waves-light btn red darken-4"
                            disabled={disabledBool}>
                            Delete
                        </button> */}
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
                        <div>{moment(project.createdAt.toDate()).calendar()}</div>
                    </div>
                </div>
            </div>
    )

    
    if (project) {

        let disabledBool = project.authorId !== auth.uid ;
        console.log('disalbe bool is' ,disabledBool)
        console.log('auth.uid 111  ',auth.uid)
        console.log('project.authorId ',project.authorId)
     
        

        if (auth.uid==='obJ8g1jif5bNrJNF6oRRqI394U83'){
            disabledBool=false
            console.log(' disalbe bool after if sequence  is' ,disabledBool)
        }

        const urlLink=String(project.url)
        const urlVideo=project.urlVideo
       
        //console.log('type ',typeof(this.presUrl),'length ',this.presUrl.length,' presurl ',this.presUrl)
        fetch(`http://localhost:5000/getpath/?urlvideo=${urlVideo}`)    //отправил урл в сервер
            .then((response) => {
                console.log('response from server ',response)
                return response.json();
            })
            .then((data) => {
                console.log('data',data);
                console.log('len data presignesUrl',data.presignedUrl.length,'data presignesUrl',data.presignedUrl);
                setpresUrl(data.presignedUrl)
            });

        
        console.log('type ',typeof(presUrl),'length ',String(presUrl),' presurl ',presUrl)
        console.log(' url viode link is -------------  ',urlVideo)
        console.log(' project onject is -------------  ',project)
        
        //const blob=URL.createObjectURL(Object(urlVideo))

        //const blob=URL.createObjectURL(project)

      
        
        // var url = URL.createObjectURL(Element.urlVideo);
      
        
        // console.log(' 11 Url is -  ',url)
        
        // fetch(urlVideo)
        // .then(response => response.blob())
        // .then(response => console.log('response from fetch ---  ',response))



        return(
            <div className="container section project-details">

            
                
                
                <div className="card z-depth-0">
              
                <img 
                    width='50%'
                     src={urlLink}
                     alt={project.name}
                />

                {/* <ReactPlayer  url={props.location.myCustomProps.url}/> */}

               
                {/* <video id="videoPlayer" width="85%" controls muted="muted" autoplay>
                    <source src='file:///E:/defaultMarioplan/marioplan-master/server/images/Lesson--2.mp4' type="video/mp4" />
                </video>  */}

                {/* <video width="320" height="240" controls>
                    <source src="/api/video/sample" type="video/mp4"/>
                </video> */}
                        
                 <Player
                    playsInline
                    poster="/assets/poster.png"
                    src={presUrl}
                    width="85%"
                    >
                      <BigPlayButton position="center" />
                </Player> 

              {/* <ReactPlayer
                        className='react-player fixed-bottom'
                        url= {props.location.myCustomProps.urlVideo}
                      
                        controls = {true}  />   */}

                      
                          {/* <video src={props.location.myCustomProps.urlVideo} controls width="100%">
                        Sorry, your browser doesn't support embedded videos.
                        </video>   */}
      
         
                <h3>{project.title}</h3>
                <h5>Категория: {project.Category.label}</h5>
                {/* <h6>{props.location.myCustomProps.content}</h6> */}
                <div variant="success">
                    <div>
                     <h4>{project.price} &#8376;</h4>
                    </div>
                    <h6>
                       1 x {project.title}   
                       
                       <span className='float-right'>
                       {project.price}
                       </span>
                    </h6>

                    <hr />
                   
                    </div>
                <p>
            
                </p>
              
                    <div className="card-content">
                        Edit Project
                        <span className="card-title">{ project.title }</span>
                        <p>{ project.content }</p>
                        <button className="button waves-effect waves-light btn indigo darken-2"
                        disabled={disabledBool}
                        onClick={handleEditClick}>
                            Edit
                        </button>
                        <button 
                            onClick={handleClick}
                            className="button waves-effect waves-light btn red darken-4"
                            disabled={disabledBool}>
                            Delete
                        </button>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
                        <div>{moment(project.createdAt.toDate()).calendar()}</div>
                    </div>
                </div>
            </div>
        )
    }else{
        return (
            <div className="container center">
                <p>Loading project...</p>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null;
    return {
        project: project,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        deleteProject: (projectId, userId) => dispatch(deleteProject(projectId, userId))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
         {collection: 'projects' }
    ])
)(ProjectDetails)
