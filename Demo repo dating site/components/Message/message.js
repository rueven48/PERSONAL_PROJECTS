/* eslint-disable */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { changeNewMessageStatusToRead,deleteNewMessageFromStatisticsArr,turnOffIndincatorNewMsgOfProfile } from '../../actions';
import { parseDateTimeWithMoment } from '../../config';
import ViewMessage from './view_message';

const Message = ({message,dispatch}) => {
    
    // ********* UseSelector Init - By React-Redux ************** //
    const currUser = useSelector(state => state.user);
    const profileObj = useSelector(state => state.profileObj);   
    const profiles = useSelector(state => state.profiles);   
    const messages = useSelector(state => state.messages);  
    const statistics = useSelector(state => state.statistics);
    // ********* UseSelector Init - By React-Redux ************** //
    
    const messageDate = parseDateTimeWithMoment(message);

    useEffect( ()=> {
        checkIsNewMesgRead();
    },[messages.list]);
  
    // 1.  1.id message is defined && 2.message didnt read && 3.user reciver is watching the messages.
    const checkIsNewMesgRead = () => { 
        if(message._id !== undefined && message.isRead == false && currUser.loginObj.data._id === message.toUserId){
            dispatch(changeNewMessageStatusToRead(message._id,messages.list,profileObj.info.userId));
            dispatch(deleteNewMessageFromStatisticsArr(message._id,statistics.newMessagesReceived,profileObj.info.userId));      
            if(profiles.list)
                dispatch(turnOffIndincatorNewMsgOfProfile(message.fromUserId,profiles.list));       
        }
    }
                
    return (
        <div>            
            <ViewMessage messageDate={messageDate}
                         senderName={message.senderName}
                         messageText={message.messageText}
                         senderPic={message.senderPic}
            />
        </div>
    )
}
  
export default Message;
  
  
