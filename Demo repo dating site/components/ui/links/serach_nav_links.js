import React from 'react';
import { NavLink } from "react-router-dom";


const searchNavLinks = () => {
                
    return (      
            <div className="search_nav_links_container">                                
                <NavLink activeClassName="active_secondary"  className="online_link nav_links" to={{ pathname: "/search/online"}}>מחוברים אונליין</NavLink>
                <NavLink activeClassName="active_secondary"  className="with_pic_link nav_links" to={{ pathname: "/search/pics"}}>עם תמונות</NavLink> 
                <NavLink activeClassName="active_secondary"  className="recently_connected_link nav_links" to={{ pathname: "/search/recently"}}>התחברו לאחרונה</NavLink>
                <NavLink activeClassName="active_secondary"  className="new_users_link nav_links" to={{ pathname: "/search/news"}}>חדשים</NavLink>
                <NavLink activeClassName="active_secondary"  className="advance_search_link nav_links" to={{ pathname: "/search/advance"}}>חיפוש מתקדם</NavLink>                                                                    
            </div>
           )
}

export default searchNavLinks;