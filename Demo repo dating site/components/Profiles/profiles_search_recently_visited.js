/* eslint-disable */
import React, { useEffect } from 'react';
import Profiles from './profiles';
import {changeSpecificUserToOnline,changeSpecificUserToOffline} from '../../actions';
import { useSelector } from 'react-redux';

const profilesSearchRecentlyVisited  = ({
    dispatch,
    history,
    setSearchStartPoint,
    setLastUserConnIndex,
    setIsPopUpShowState
    }) => {
        
    const profiles = useSelector(state => state.profiles); 
    const currUser = useSelector(state => state.user);
    let {list} =  profiles;

            
    useEffect( ()=> {     
        setEventsToUserConnectivity(); 
    },[list]);

    
    const setEventsToUserConnectivity = () => {        
        listenToswitchUserToOnlineSearchRecentlyVisitedPage();   
        listenToDisconnectUserEvent();
    }

    const listenToswitchUserToOnlineSearchRecentlyVisitedPage = () => {
        if(currUser.socket_server === undefined) return;
        currUser.socket_server.on('switch_user_to_online',(userObj) => {                    
            if(history.location.pathname == '/search/recently' && list[userObj.userId]){
                dispatch(changeSpecificUserToOnline(list,userObj.userId));
                setSearchStartPoint(prevSearchStartPoint => prevSearchStartPoint-1); // if he already decrement lastStartPoint to make collection search right position        
                setLastUserConnIndex(++userObj.userConnIndex);  
            }                                                    
        })
    }
        
    const listenToDisconnectUserEvent = () => {
        if(currUser.socket_server === undefined) return;
        currUser.socket_server.on('user_disconnect',(userId) => {                         
            if(history.location.pathname == '/search/recently' && list[userId])
                dispatch(changeSpecificUserToOffline(list,userId));   
        })                                               
    } 

                
    return  (
            <div>                
                <div className="profiles_list d-flex flex-column align-items-center">                    
                  <Profiles profiles={list}
                            setIsPopUpShowState={setIsPopUpShowState}
                            dispatch={dispatch}
                  />
                </div>                
            </div>
            )      
}


export default profilesSearchRecentlyVisited;