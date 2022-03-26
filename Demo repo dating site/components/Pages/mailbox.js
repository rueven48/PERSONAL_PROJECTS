import React from 'react';
import MailboxContainer from '../../containers/MailboxContainer/mailbox_container';
import Ticker from '../Ticker/ticker';


const Mailbox = () => {    
    return (
        <div className="main_page">
            <MailboxContainer/>

             <Ticker/>    
        </div>
    )
}

export default Mailbox;
