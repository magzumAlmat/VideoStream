import React from 'react';
import Icon from '@material-ui/core/Icon';
import { Redirect } from 'react-router-dom';

const SearchButton = (props) => {
    const handleClick = (e) =>{
        e.preventDefault();

        return <Redirect to='/' />
    }

    return(
        <button type="submit" className="search-icon" onClick={handleClick}><Icon>search</Icon></button>
    );
}

export default SearchButton;