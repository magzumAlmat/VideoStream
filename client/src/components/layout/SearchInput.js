import React, { Component } from 'react';
import {connect} from 'react-redux';

class SearchInput extends Component{
    handleChange = (e) =>{
        let q = e.target.value;
        try{
            this.props.search(q);
        }
        catch(err){
            console.log(err);
        }
    }
    
    render(){
        return (
            <input type="text" id="search" name="search" placeholder="Search..." onChange={this.handleChange.bind(this)}/>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        search: (val) => dispatch({type: 'SEARCH_TODO', val})
    }
}

export default connect(null, mapDispatchToProps)(SearchInput);