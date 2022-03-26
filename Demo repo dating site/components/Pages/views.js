import React from 'react';
import ViewsContainer from '../../containers/ViewsContainer/views_container';
import Ticker from '../Ticker/ticker';

const Views = () => {
    return (
        <div className="main_page">
            <ViewsContainer/>

            <Ticker/>     
        </div>
    )
}

export default Views;
