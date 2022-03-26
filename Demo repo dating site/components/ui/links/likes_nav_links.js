import React from 'react';
import { NavLink } from "react-router-dom";


const likesNavLinks = () => {
                
    return (      
            <div className="likes_nav_links_container">                
                <NavLink activeClassName="active_secondary" className="likes_me_link nav_links"  to={{ pathname: "/likes/liked-me" }}>עשו לי לייק</NavLink>
                <NavLink activeClassName="active_secondary" className="likes_others_link nav_links"  to={{ pathname: "/likes/like-others" }}>לייק לאחרים</NavLink>
            </div>
           )
}

export default likesNavLinks;