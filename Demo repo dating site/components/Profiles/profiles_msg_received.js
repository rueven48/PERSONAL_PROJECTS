/* eslint-disable */
import React, { useEffect } from 'react';
import Profiles from './profiles';
import { Button } from 'react-bootstrap';
import {getProfilesOfMessagesReceived,addNewMessagesReceived,getOneProfile,changeSpecificUserToOnline,changeSpecificUserToOffline} from '../../actions';
import { useSelector } from 'react-redux';

const profilesMsgReceived = ({
    eventsUserConnectivityMailboxHandler,
    setEventsUserConnectivityMailboxHandler,
    profilesListMailboxHandler,
    setProfilesListMailboxHandler,
    setIsPopUpShowState,
    dispatch,
    history,
    mailboxModeState
    }) => {

    const profiles = useSelector(state => state.profiles); 
    const currUser = useSelector(state => state.user);
    const statistics = useSelector(state => state.statistics);
    let {list} =  profiles;
    
    
    useEffect( () => {      
        if(currUser.loginObj === undefined) return;
        dispatch(getProfilesOfMessagesReceived(currUser.loginObj.data._id));
        setEventsUserConnectivityMailboxHandler(true);
        setProfilesListMailboxHandler(true);                                                                      
    },[]);

   
    useEffect( () => {
        listenToDisconnectUserEvent();  // must get the right list every render.                                      
        if(profilesListMailboxHandler)
            listenToPlusOneCounterUserMessgReceived();
        if(eventsUserConnectivityMailboxHandler){            
            setEventsToUserConnectivity();
            setEventsUserConnectivityMailboxHandler(false);  
        }                      
    },[list]);

    
    const listenToswitchUserToOnlineEvent = () => {
        if(currUser.socket_server === undefined) return;
        currUser.socket_server.on('switch_user_to_online',(userObj) => {                    
            if(history.location.pathname == '/mailbox/inbox' && list[userObj.userId])
                dispatch(changeSpecificUserToOnline(list,userObj.userId));                                      
        })        
    }
    
    const setEventsToUserConnectivity = () => {        
        listenToswitchUserToOnlineEvent();
    }

    const listenToDisconnectUserEvent = () => {    
        if(currUser.socket_server === undefined) return;
        currUser.socket_server.on('user_disconnect',(userId) => {                         
            if(history.location.pathname == '/mailbox/inbox' && userId)                                                                                                           
                dispatch(changeSpecificUserToOffline(list,userId));                        
        })                                                    
    }

                
    const listenToPlusOneCounterUserMessgReceived = () => {
        if(currUser.socket_server === undefined) return;
        currUser.socket_server.on('plus_one_to_counter_user_messg_received',(data) => { 
            if(history.location.pathname == '/mailbox/inbox'){
                dispatch(addNewMessagesReceived(data,statistics.newMessagesReceived)); // want to see new blink msg if inside inbox                                         
                dispatch(getOneProfile(data.fromUserId,currUser.loginObj.data._id,history.location.pathname,list));                
            }                                                      
        });        
    }

    //console.log('mailbox page',profiles);
        
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

export default profilesMsgReceived;

