/* eslint-disable */
import React, { useEffect,useMemo } from 'react';
import Profiles from './profiles';
import { Button } from 'react-bootstrap';
import {getProfilesOfMeLikedOthers,changeSpecificUserToOnline,changeSpecificUserToOffline} from '../../actions';
import { useSelector } from 'react-redux';

const profilesMeLikesOthers = ({
    eventsUserConnectivityLikesHandler,
    setEventsUserConnectivityLikesHandler,
    setIsPopUpShowState,
    dispatch,
    history,
    likesModeState
    }) => {

    const profiles = useSelector(state => state.profiles); 
    const currUser = useSelector(state => state.user);
    let {list} =  profiles;

    
    useMemo( ()=> {      
        if (Object.keys(currUser).length != 0){
            dispatch(getProfilesOfMeLikedOthers(currUser.loginObj.data._id));
            setEventsUserConnectivityLikesHandler(true);
        }             
    },[]);

    
    useEffect( ()=> {
        if(eventsUserConnectivityLikesHandler){            
            setEventsToUserConnectivity();
            setEventsUserConnectivityLikesHandler(false);  
        } 
    },[profiles]);

    const setEventsToUserConnectivity = () => {        
        listenToswitchUserToOnlineEvent();
        listenToDisconnectUserEvent();
    }

    const listenToswitchUserToOnlineEvent = () => {
        currUser.socket_server.on('switch_user_to_online',(userObj) => {                    
            if(history.location.pathname == '/likes/like-others' && list[userObj.userId])
                dispatch(changeSpecificUserToOnline(list,userObj.userId));                                      
        })
    }
        
    const listenToDisconnectUserEvent = () => {
        currUser.socket_server.on('user_disconnect',(userId) => {                         
            if(history.location.pathname == '/likes/like-others')
                dispatch(changeSpecificUserToOffline(list,userId));   
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

export default profilesMeLikesOthers;

