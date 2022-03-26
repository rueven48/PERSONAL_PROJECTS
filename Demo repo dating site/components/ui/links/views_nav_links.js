import React from 'react';
import { NavLink } from "react-router-dom";


const viewsNavLinks = () => {
                
    return (      
            <div className="views_nav_links_container">                                               
                <NavLink activeClassName="active_secondary" className="views_me_link nav_links" to={{ pathname: "/views/viewd-me" }}>צפיות בי</NavLink>
                <NavLink activeClassName="active_secondary" className="views_others_link nav_links" to={{ pathname: "/views/view-others" }}> צפיות באחרים</NavLink>
            </div>
           )
}

export default viewsNavLinks;