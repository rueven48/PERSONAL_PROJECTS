import React from 'react';
import { NavLink } from "react-router-dom";


const mailboxNavLinks = () => {
                
    return (      
            <div className="mailbox_nav_links_container">
                <NavLink activeClassName="active_secondary" className="mailbox_msg_received_link nav_links"  to={{pathname: "/mailbox/inbox"}}> הודעות שהתקבלו</NavLink>
                <NavLink activeClassName="active_secondary" className="mailbox_msg_sended_link nav_links" to={{pathname: "/mailbox/outbox"}}> הודעות שנשלחו</NavLink>
            </div>
           )
}

export default mailboxNavLinks;