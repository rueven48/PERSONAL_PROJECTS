// eslint-disable-next-line
import React from 'react';
import MainContainer from '../../containers/MainContainer/main_container';
import Ticker from '../Ticker/ticker';


const Main = () => {
        
    return (
        <div className="main_page">                    
                                                      
            <MainContainer/>
                    
            <Ticker/> 
            
        </div>
    )    
}

export default Main;