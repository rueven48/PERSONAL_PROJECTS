/* eslint-disable */
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import {createDate} from '../../config';
import {addMessageToArray,plusOneToCounterUserMessgSend,changeMessagesToDeleted,deleteAllMessagesBetweenTwoUsers} from '../../actions';
import { useSelector } from 'react-redux';
import Messages from '../list_messages';
import ViewChat from './view_chat';

const chat = ({dispatch}) =>  {
            
    // *********  UseSelector Init - By React-Redux ************** //
    const currUser = useSelector(state => state.user);
    const profileObj = useSelector(state => state.profileObj);    
    const messages = useSelector(state => state.messages);
    const statistics = useSelector(state => state.statistics);
    // *********  UseSelector Init - By React-Redux ************** //
    
    let message = document.getElementsByClassName('chat_textarea');   
    const fromUserName = currUser.loginObj.data.firstName;   
    const senderPic = currUser.loginObj.data.picture;
    const fromUserId = currUser.loginObj.data._id;
    const toUserId = profileObj.info.userId;
        
    
    useEffect( () => {
        initChatPrivateMessage();
        initChatTyping();    
    },[]);

    
    const cleanTextAreaMessage = () => {
        message[0].value = '';
    }
    

    const initChatPrivateMessage = () => {                      
        currUser.socket_server.on('private_chat', (data) => {            
            //console.log('data',data);
            if (Object.keys(messages).length != 0)                                 
                dispatch(addMessageToArray(data,messages.list));                                                                                                                                                   
        });
    }
         
    const createMessageIndex = () => {                
        return messages.list.length;                
    }
    

    const createObjMessage = () => {
        const dataMessage = {            
            messageIndex: createMessageIndex(),
            fromUserId: fromUserId,
            toUserId: toUserId,
            senderName: fromUserName,
            senderPic: senderPic,
            date: createDate(),                
            messageText: message[0].value,
            isRead: false,
            isDeletedMsgsBySender: false,
            isDeletedMsgsByReceiver: false
        }                   
        return dataMessage;    
    }
           
    const handleSubmit = () => {        
        if (message[0].value !== '') {            
            let dataMessage = createObjMessage();                
            currUser.socket_server.emit('private_chat',dataMessage);                                                            
            currUser.socket_server.on('message_id', (data) => {
                dataMessage._id = data._id
                let {counter} = statistics.sumMessagesSend;
                dispatch(plusOneToCounterUserMessgSend(counter)); // add plus one to senderCounter                                                                           
                dispatch(addMessageToArray(dataMessage,messages.list));  // add message to sender arr
                cleanTextAreaMessage();
            });                                  
        }        
    }

    const handleKeyUp = () => {
        const dataMessage = {            
            fromUserId: fromUserId,
            toUserId: toUserId,
            senderName: fromUserName,
            messageText: message[0].value            
        }
        currUser.socket_server.emit('typing',dataMessage);    
    }

    const initChatTyping = () => {
        currUser.socket_server.on('typing', (data) => {           
            if (data.messageText === '') {
                cleanTextAreaMessage();
            } else{               
                message[0].value = `${data.senderName}, מקליד הודעה... `;
                setTimeout( () => {
                    cleanTextAreaMessage();
                },500);
            }                                    
        })
    }

    const createArrayMsgIds = () => {
        let newArrMsgIds = [];
        for (let i = 0; i < messages.list.length; i++) {
            newArrMsgIds.push(messages.list[i]._id);  
        }
        return newArrMsgIds;
    }

    const handleDeleteMessages = () => {
        // logic - put or delete.
        // no messages dont do nothing !
        
        // 1. Sender delete all Msgs.(only one side of them).
        // 2. Receiver delete all Msgs.(only one side of them).
        // 3. Both - of them delete all Msgs.
        // 4. None - of them deleted all Msgs. (not an option)
        //--isSenderDelete  --> true or false, true-sender , false-receiver

        //console.log('here i am',messages.list[0]);
        //TODO:


        //const isUserSendCurrMsg = checkIsCurrUserSendCurrMsg();

        // const blabla = whoClickDeletedButton();



        // if(messages.list[0].isDeletedMsgsBySender === true && messages.list[0].isDeletedMsgsByReceiver === false){
        //     // option 1.
        //     // if Receiver click - delete all
        //     // sender - do nothing
        //     // do delelete func
        //     const isUserSendCurrMsg = checkIsCurrUserSendCurrMsg();            
        //     deleteAllMessagesBetweenTwoUsers(createArrayMsgIds());
        // }
                                           
        // if(messages.list[0].isDeletedMsgsByReceiver === true  && messages.list[0].isDeletedMsgsBySender === false){
        //     // option 2.
        //     // if Sender click - delete all
        //     // Receiver - do nothing
        //     const isUserSendCurrMsg = checkIsCurrUserSendCurrMsg();
        // }

        // if(messages.list[0].isDeletedMsgsBySender === false && messages.list[0].isDeletedMsgsByReceiver === false){
        //     // option 4.            
        //     changeMessagesToDeleted(messages.list[0]._id,checkIsCurrUserSendCurrMsg());
        // }
    }

    // const whoClickDeletedButton = () => {
    //     for (let i = 0; i < messages.list.length; i++) {
           
    //         if(fromUserId == messages.list[i].fromUserId){ // the creator of msg click delete(Sender!)
    //             // delete msg only for creators -- > isDeletedMsgsBySender == true
                
    //             messages.list[i].isDeletedMsgsBySender = true;


    //             // update DB
    //             // server if both delete it - delete the total msg.
    //         }else{ // the msg was clicked by Reciver!

    //             if(fromUserId != messages.list[i].fromUserId){ // Sender!
    //                 messages.list[i].isDeletedMsgsBySender = true;
    //             }

    //             // delete msg for recivers --> isDeletedMsgsByReceiver== true
    //             // update DB
    //             // server if both delete it - delete the total msg.
    //         }
    //     }
    // }

    const checkIsCurrUserSendCurrMsg = () => {
        return (fromUserId == messages.list[0].fromUserId)?true:false;                    
    }

    const lastMessagesStatus = () => {
       return (Object.keys(messages).length!=0 && messages.list.length==0)?
              ".אין הודעות קודמות"
              :                   
              ":הודעות קודמות"
    }

    const showMessages = () => {
       return (Object.keys(messages).length!==0)?
              <Messages messages={messages.list}
                        dispatch={dispatch}
              />
              : null
    } 
              
    return (
        <div>            
           <ViewChat handleKeyUp={handleKeyUp}
                     handleSubmit={handleSubmit}
                     handleDeleteMessages={handleDeleteMessages}
                     lastMessagesStatus={lastMessagesStatus()}
                     ShowMessages={showMessages}
           />             
        </div>
    );             
}
export default chat;