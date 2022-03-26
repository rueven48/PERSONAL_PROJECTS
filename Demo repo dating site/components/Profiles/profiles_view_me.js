/* eslint-disable */
import React, { useMemo,useEffect } from 'react';
import Profiles from './profiles';
import { Button } from 'react-bootstrap';
import {getProfilesOfViewsMe,changeSpecificUserToOnline,changeSpecificUserToOffline,addNewViewsReceived,getOneProfile} from '../../actions';
import { useSelector } from 'react-redux';

const  profilesViewedMe = ({
    eventsUserConnectivityViewsHandler,
    setEventsUserConnectivityViewsHandler,
    profilesListViewsHandler,
    setProfilesListViewsHandler,
    setIsPopUpShowState,
    dispatch,
    history,
    viewsModeState
    }) => {
    
    const profiles = useSelector(state => state.profiles);
    const currUser = useSelector(state => state.user);
    const statistics = useSelector(state => state.statistics);
    let {list} =  profiles;


    useMemo( ()=> {      
        if(currUser.loginObj === undefined) return;
        dispatch(getProfilesOfViewsMe(currUser.loginObj.data._id));
        setEventsUserConnectivityViewsHandler(true);      
        setProfilesListViewsHandler(true);                                       
    },[]);


    useEffect( ()=> {
        listenToDisconnectUserEvent();
        if(profilesListViewsHandler)
            listenToPlusOneCounterUserBeViewed();
        if(eventsUserConnectivityViewsHandler){            
            setEventsToUserConnectivity();
            setEventsUserConnectivityViewsHandler(false);  
        } 
    },[list]);

    const setEventsToUserConnectivity = () => {        
        listenToswitchUserToOnlineEvent();       
    }

    const listenToswitchUserToOnlineEvent = () => {
        if(currUser.socket_server === undefined) return;
        currUser.socket_server.on('switch_user_to_online',(userObj) => {                    
            if(history.location.pathname == '/views/viewd-me' && list[userObj.userId])
                dispatch(changeSpecificUserToOnline(list,userObj.userId));                                      
        })       
    }
        
    const listenToDisconnectUserEvent = () => {
        if(currUser.socket_server === undefined) return;
        currUser.socket_server.on('user_disconnect',(userId) => {                         
            if(history.location.pathname == '/views/viewd-me' && list[userId])
                dispatch(changeSpecificUserToOffline(list,userId));   
        })                                               
    }
    
    const listenToPlusOneCounterUserBeViewed = () => {  
        if(currUser.socket_server === undefined) return;
        currUser.socket_server.on('plus_one_counter_views_toBeViewed',(data) => {
            if(history.location.pathname == '/views/viewd-me'){
                dispatch(addNewViewsReceived(data,statistics.newViewsReceived));
                dispatch(getOneProfile(data.viewerUserId,currUser.loginObj.data._id,history.location.pathname,list)); 
            }                 
        })       
    }
                       
    //console.log('view me',props);

    return  (
                <div>
                    <div className="profiles_list d-flex flex-column align-items-center">
                        {profiles.list?
                        <Profiles profiles={list}
                                  setIsPopUpShowState={setIsPopUpShowState}
                                  dispatch={dispatch}
                                  viewsModeState={viewsModeState}
                        />
                        :null
                        }
                    </div>                
                </div>
            )        
}

export default profilesViewedMe;

