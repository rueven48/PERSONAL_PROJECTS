import React from 'react';
import FavoritesContainer from '../../containers/FavoritesContainer/favorites_container';
import Ticker from '../Ticker/ticker';

const Favorites = () => {
    return (
        <div className="main_page">
            <FavoritesContainer />
        
            <Ticker/>                    
        </div>
    )
}

export default Favorites;
