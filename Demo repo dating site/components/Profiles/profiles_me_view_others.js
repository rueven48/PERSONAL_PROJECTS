/* eslint-disable */
import React, { useMemo,useEffect } from 'react';
import Profiles from './profiles';
import { Button } from 'react-bootstrap';
import {getProfilesOfMeViewedOthers,changeSpecificUserToOnline,changeSpecificUserToOffline} from '../../actions';
import { useSelector } from 'react-redux';

const profilesMeViewsOthers = ({
    eventsUserConnectivityViewsHandler,
    setEventsUserConnectivityViewsHandler,
    setIsPopUpShowState,
    dispatch,
    history,
    viewsModeState
    }) => {

    const profiles = useSelector(state => state.profiles); 
    const currUser = useSelector(state => state.user);
    let {list} =  profiles;
    

    useMemo( ()=> {      
        if (Object.keys(currUser).length != 0){
            dispatch(getProfilesOfMeViewedOthers(currUser.loginObj.data._id));
            setEventsUserConnectivityViewsHandler(true);          
        }                                                    
    },[]);

    useEffect( ()=> {
        if(eventsUserConnectivityViewsHandler){            
            setEventsToUserConnectivity();
            setEventsUserConnectivityViewsHandler(false);  
        } 
    },[profiles]);


    const setEventsToUserConnectivity = () => {        
        listenToswitchUserToOnlineEvent();
        listenToDisconnectUserEvent();
    }

    const listenToswitchUserToOnlineEvent = () => {
        currUser.socket_server.on('switch_user_to_online',(userObj) => {                    
            if(history.location.pathname == '/views/view-others' && list[userObj.userId])
                dispatch(changeSpecificUserToOnline(list,userObj.userId));                                      
        })
    }
        
    const listenToDisconnectUserEvent = () => {
        currUser.socket_server.on('user_disconnect',(userId) => {                         
            if(history.location.pathname == '/views/view-others')
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
                                  viewsModeState={viewsModeState}
                        />:
                        null
                        }
                    </div>                
                </div>
            )    
}

export default profilesMeViewsOthers;

