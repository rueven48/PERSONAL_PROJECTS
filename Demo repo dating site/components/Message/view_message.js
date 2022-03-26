import React from 'react';

const ViewMessage = ({
    messageDate,
    senderName,
    messageText,
    senderPic
    }) => {
    
    return (      
            <div className="container_message">

                <div className="user_message_date" > {messageDate} </div>
                
                <strong className="user_message_senderName"> ,{senderName} </strong>
                
                <hr className="user_message_hr"/>
                
                <div className="msg_txt_container">                                
                    
                    <div dir="rtl"  className="user_message_text">
                        {messageText}                   
                    </div>

                </div>
                                        
                <img  className="user_image_inside_msg rounded-circle" src={require(`./../../assets/images/${senderPic}`)} alt="Avatar"/>

            </div>
           )
}

export default ViewMessage;