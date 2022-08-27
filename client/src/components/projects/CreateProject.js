import React, { Component, useState } from "react";
import { createProject } from '../../store/actions/projectActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'; 
// import Select from './Select';
import Select from "react-select";
import CustomSelect from './Select'
import { Category } from '@material-ui/icons';
import { storage } from "../../config/fbConfig";


  const options = [
   
    { value: 'category1',  label: 'КАТЕГОРИЯ1'},
    { value: 'category2',  label: 'КАТЕГОРИЯ2'},
    { value: 'category3',   label: 'КАТЕГОРИЯ3'},
    { value: 'category4',   label: 'КАТЕГОРИЯ4'},
    { value: 'category5',   label: 'КАТЕГОРИЯ5'},
    { value: 'category6', label: 'КАТЕГОРИЯ6'},
    { value: 'category7',   label: 'КАТЕГОРИЯ7'},
  
  ]

class CreateProject extends Component {
    state = {
        selectOptions: [],
    cartItems: [],
    title: "",
    Category: "",
    Region: "",
    Manufacturer: "",
    Brand: "",
    Fortress: "",
    Colour: "",
    Sugar: "",
    Grape: "",
    Serving_temperature: "",
    Vintage: "",
    Products_webpage: "",
    content: "",
    description: "",
    delivery: "",
    img: "",
    name: "",
    picture: "",
    price: 0,
    sizes: [],
    defaultQty: 0,
    approved:false,
    url: "",
    urlVideo: "",
    }

    handleChange = (e) => {
        
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state);
        this.props.createProject(this.state);
        this.props.history.push('/');
        
    }

     onChangeInput=(value,e)=> {
        // console.log(e.target.Category)
        // const setCategory=e.target.value.toString()
        this.state.Category=value
        // console.log('Value of Category',typeof(valueString))
        // console.log('Category=',this.props.Category)
        this.state.selectOptions=this.state.Category.value

        // this.setState({selectOptions: options})
        console.log('this is selected options',this.state.selectOptions)
        // this.setState({
        //     [e.target.id]: e.target.valueString
        // })
        
        
        
    }
    ReactFirebaseFileUpload = () => {
        const [image, setImage] = useState(null);
        const [url, setUrl] = useState("");
        const [progress, setProgress] = useState(0);
    
        const handleChange = (e) => {
          if (e.target.files[0]) {
            setImage(e.target.files[0]);
          }
        };
    
        const handleUpload = () => {
          const uploadTask = storage.ref(`images/${image.name}`).put(image);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setProgress(progress);
            },
            (error) => {
              console.log(error);
            },
            () => {
              storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then((url) => {
                  setUrl(url);
                  this.setState({ url });
                });
            }
          );
        };
    
        console.log("URL ", this.state.url);
    
        return (
          <div>
            <progress value={progress} max="100" />
            <br />
            <br />
            <input type="file" onChange={handleChange} />
            <a onClick={handleUpload}>Загрузить</a>
    
            <br />
            {url}
            <br />
            <img
              src={url || "http://via.placeholder.com/300"}
              alt="firebase-image"
            />
          </div>
        );
      };

      //---------------------------MINIO----------------------------------------------
      


      //-------------------------------------------------------------------------------
      UplpadComponentVideo = () => {
        const [fileData, setFileData] = useState();
    
        const [filePath, setFilPath] = useState();
        const [src, setSrc] = useState("");
        
        const fileChangeHandler = (e) => {
       
          setFileData(e.target.files[0]);
          console.log('fileData      -        ',fileData)
          const file = e.target.files[0];
          try {
            // Get the uploaded file
            
           
            // Transform file into blob URL

            //setSrc(file.name);
            setSrc(file);
            console.log('file from create project     -        ',file)
            
          } catch (error) {
            console.error(error);
          }
        };
        
        console.log('srC ---------------   ',src)

        const onSubmitHandler = (e) => {
            e.preventDefault();
            console.log("console log e in UplpadComponent -  ", e);
            // Handle File Data from the state Before Sending
            const data = new FormData();
      
            data.append("image", fileData);
            console.log('fileData   -------  ',fileData)
            setFilPath(fileData.filePath)
            console.log('filePath name - ---- - --  ',filePath)
            let lcase=String(fileData.name).toLowerCase()
            console.log('fileFata name after lowercase',lcase)
            this.state.urlVideo = lcase
            
            
            //this.state.urlVideo = "images/" + "Lesson" + "--" + (src);
          
            data.append("image", this.state.urlVideo);
            console.log('url viode path-------      ',this.state.urlVideo)
            
            fetch("http://localhost:5000/single", {
              method: "POST",
              body: data,
            })
              .then((result) => {
                console.log("File Sent Successful  this is data",data);
                console.log('this is response --------------------- ',result);
              })
              .catch((err) => {
                console.log(err.message);
              });
          };
          return (
            <>
            <this.ReactFirebaseFileUpload/>
                    <br />
                <br />
                <form onSubmit={onSubmitHandler} enctype="multipart/form-data">
                <input type="file" onChange={fileChangeHandler} name="image"/>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                
                <h4>Preview</h4>
                <br />
                <video src={this.state.urlVideo} controls width="100%" > 
                Sorry, your browser doesn't support embedded videos.
              </video>
                <button type="submit">Submit File to Backend</button>
              </form>
      
              
                {/* <input type="file" onChange={handleChange} /> */}
      
      
            </>
          );
    
        }
    render() {
        const { auth } = this.props;

        if (!auth.uid) return <Redirect to='/signin' />

        return (
            <div className="container">
                <form className="white" onSubmit={this.handleSubmit}>
                  
                  
                  
                  
                    <h5 className="grey-text text-darken-3">Create New Project</h5>
                    <div >
                    
                        <label htmlFor="Category">Category</label>
                        {/* <Select options={colourOptions} type="text" id="Category" onChange={this.handleChange} /> */}
                        <CustomSelect options={options}  onChange={this.onChangeInput} /> 

                    </div>
                  
                    <br/>
                    <br/>
                  
                  
                  
                    <div className="input-field">
            <label htmlFor="name">name</label>
            <input type="text" id="name" onChange={this.handleChange} />
          </div>

          <br />
          <br />   
                    
                    <br/>
                    <br/>
                    
                   


             

          <div className="input-field">
            <label htmlFor="content">Project Content</label>
            <textarea
              id="content"
              className="materialize-textarea"
              onChange={this.handleChange}
            ></textarea>
          </div>

          <div>{/* <this.ReactFirebaseFileUpload/> */}</div>

          {/* <div className="input-field">
                        <label htmlFor="picture">IMAGE LINK</label>
                        <input type="text" id="picture" onChange={this.handleChange} />
                    </div>
                     */}
          <br />
          <br />

          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange} />
          </div>

          <br />
          <br />

          <div className="input-field">
            <label htmlFor="price">price</label>
            <input type="number" id="price" onChange={this.handleChange} />
          </div>

          <br />
          <br />

          <div className="input-field">
            <label htmlFor="default qty">default qty</label>
            <input
              type="number"
              id="default qty"
              onChange={this.handleChange}
            />
          </div>


          <br />
          <br />
{/* 
          <this.UplpadComponent /> */}
          <this.UplpadComponentVideo />
         



                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Create Project</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        createProject: (project) => dispatch(createProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);