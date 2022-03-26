import React from 'react';
import SearchContainer from '../../containers/SearchContainer/search_container';
import Ticker from '../Ticker/ticker';

const Search = () => {
    return (      
            <div className="main_page">                                                        
                  <SearchContainer/>

                  <Ticker/>                 
            </div>
           )
}

export default Search;