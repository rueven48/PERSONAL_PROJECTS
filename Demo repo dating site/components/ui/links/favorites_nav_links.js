import React from 'react';
import { NavLink } from "react-router-dom";


const favoritesNavLinks = () => {
                
    return (      
            <div className="favorites_nav_links_container">                                
               <NavLink activeClassName="active_secondary" className="favorites_me_link nav_links"  to={{ pathname: "/favorites/favorited-me" }}>הוסיפו אותי למועדפים</NavLink>
               <NavLink activeClassName="active_secondary" className="favorites_others_link nav_links"  to={{ pathname: "/favorites/favorite-others" }}>מועדפים שלי</NavLink>
            </div>
           )
}

export default favoritesNavLinks;