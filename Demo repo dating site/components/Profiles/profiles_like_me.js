/* eslint-disable */
import React, { useMemo,useEffect } from 'react';
import Profiles from './profiles';
import { Button } from 'react-bootstrap';
import {getProfilesOfLikesMe,changeSpecificUserToOnline,changeSpecificUserToOffline,addNewLikesReceived,getOneProfile} from '../../actions';
import { useSelector } from 'react-redux';

const profilesLikedMe  = ({
    eventsUserConnectivityLikesHandler,
    setEventsUserConnectivityLikesHandler,
    profilesListLikesHandler,
    setProfilesListLikesHandler,
    setIsPopUpShowState,
    dispatch,
    history,
    likesModeState
    }) => {
    
    const profiles = useSelector(state => state.profiles); 
    const currUser = useSelector(state => state.user);
    const statistics = useSelector(state => state.statistics);
    let {list} =  profiles;

    
    useMemo( ()=> {            
        if(currUser.loginObj === undefined) return;
            dispatch(getProfilesOfLikesMe(currUser.loginObj.data._id));
        setProfilesListLikesHandler(true);
        setEventsUserConnectivityLikesHandler(true);                                         
    },[]);
    

    useEffect( ()=> {
        listenToDisconnectUserEvent();
        if(profilesListLikesHandler)
            listenToPlusOneCounterUserBeLiked();                   
        if(eventsUserConnectivityLikesHandler){            
            setEventsToUserConnectivity();
            setEventsUserConnectivityLikesHandler(false);  
        }
    },[list]);

    const setEventsToUserConnectivity = () => {        
        listenToswitchUserToOnlineEvent();             
    }

    const listenToswitchUserToOnlineEvent = () => {
        if(currUser.socket_server === undefined) return;
        currUser.socket_server.on('switch_user_to_online',(userObj) => {                    
            if(history.location.pathname == '/likes/liked-me' && list[userObj.userId])
                dispatch(changeSpecificUserToOnline(list,userObj.userId));                                      
        })
    }
        
    const listenToDisconnectUserEvent = () => {
        if(currUser.socket_server === undefined) return;
        currUser.socket_server.on('user_disconnect',(userId) => {                         
            if(history.location.pathname == '/likes/liked-me' && list[userId])
                dispatch(changeSpecificUserToOffline(list,userId));   
        })                                               
    }

    const listenToPlusOneCounterUserBeLiked = () => { 
        if(currUser.socket_server === undefined) return;
        currUser.socket_server.on('plus_one_counter_likes_toBeLiked',(data) => {
            if(history.location.pathname == '/likes/liked-me'){               
                dispatch(addNewLikesReceived(data,statistics.newLikesReceived));
                dispatch(getOneProfile(data.toDoLikeUserId,currUser.loginObj.data._id,history.location.pathname,list));                
            }                
        })
    }                   

    return  (
                <div>
                    <div className="profiles_list d-flex flex-column align-items-center">
                      {profiles.list?
                      <Profiles profiles={list}
                                setIsPopUpShowState={setIsPopUpShowState}
                                dispatch={dispatch}
                                likesModeState={likesModeState}
                      />
                      :
                      null
                      }
                    </div>                
                </div>
            )       
}

export default profilesLikedMe;

