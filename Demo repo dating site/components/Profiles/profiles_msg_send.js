/* eslint-disable */
import React, { useEffect,useMemo } from 'react';
import { Button } from 'react-bootstrap';
import Profiles from './profiles';
import {getProfilesOfMessagesSended,changeSpecificUserToOnline,changeSpecificUserToOffline} from '../../actions';
import { useSelector } from 'react-redux';

const profilesMsgSend = ({
    eventsUserConnectivityMailboxHandler,
    setEventsUserConnectivityMailboxHandler,
    setIsPopUpShowState,
    dispatch,
    history,
    mailboxModeState
    }) => {
    
    const profiles = useSelector(state => state.profiles); 
    const currUser = useSelector(state => state.user);
    let {list} =  profiles;
      
    
    useMemo( ()=> {      
        if (Object.keys(currUser).length != 0) 
            dispatch(getProfilesOfMessagesSended(currUser.loginObj.data._id));
        setEventsUserConnectivityMailboxHandler(true);                                     
    },[Object.keys(profiles).length]);

    
    useEffect( ()=> {
        if(eventsUserConnectivityMailboxHandler){            
            setEventsToUserConnectivity();
            setEventsUserConnectivityMailboxHandler(false);  
        } 
    },[profiles]);


    const setEventsToUserConnectivity = () => {        
        listenToswitchUserToOnlineEvent();
        listenToDisconnectUserEvent();
    }


    const listenToswitchUserToOnlineEvent = () => {
        currUser.socket_server.on('switch_user_to_online',(userObj) => {                    
            if(history.location.pathname == '/mailbox/outbox' && list[userObj.userId])
                dispatch(changeSpecificUserToOnline(list,userObj.userId));                                      
        })
    }

    
    const listenToDisconnectUserEvent = () => {
        currUser.socket_server.on('user_disconnect',(userId) => {                         
            if(history.location.pathname == '/mailbox/outbox')
                dispatch(changeSpecificUserToOffline(list,userId));   
        })                                               
    }   
        
    return  (
                <div className="profiles_list d-flex flex-column align-items-center">                                            
                    {profiles.list?<Profiles profiles={list}
                                             mailboxModeState={mailboxModeState}
                                             setIsPopUpShowState={setIsPopUpShowState}
                                             dispatch={dispatch}
                                   />
                                   :null
                    }               
                </div>
            )                
}

export default profilesMsgSend;

