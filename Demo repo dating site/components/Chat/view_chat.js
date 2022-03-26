import React from 'react';
import { Button } from 'react-bootstrap';

const ViewChat = ({
    handleKeyUp,
    handleSubmit,
    handleDeleteMessages,
    lastMessagesStatus,
    ShowMessages,    
    }) => {

    return (      
            <div className="main-chat">
                
                <p className="chat_headline">{lastMessagesStatus}</p>
                
                <textarea className="chat_textarea" onKeyUp={handleKeyUp} dir="rtl" rows="4" cols="50" placeholder="כתוב הודעה">
                    
                </textarea>
    
                <Button type="button" className="chat_button" onClick={handleSubmit}>שלח</Button>
    
                {/* <Button type="button" className="btn btn-danger chat_delete_messages" onClick={handleDeleteMessages}>מחק הודעות</Button> */}
    
                <div className="output">
                    
                    <ShowMessages/>
                                            
                </div>
            </div>
           )
}

export default ViewChat;