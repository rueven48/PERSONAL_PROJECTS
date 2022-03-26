import React from 'react';
import LikesContainer from '../../containers/LikesContainer/likes_container';
import Ticker from '../Ticker/ticker';

const Likes = () => {
    return (
        <div className="main_page">
            <LikesContainer/>

            <Ticker/>         
        </div>
    )
}

export default Likes;
