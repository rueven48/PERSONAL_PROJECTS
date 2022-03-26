/* eslint-disable */
import React, { useEffect } from 'react';
import Profiles from './profiles';
import { Button } from 'react-bootstrap';
import {addProfileToList,deleteProfileFromList} from '../../actions';
import { useSelector } from 'react-redux';

const profilesSearchOnline  = ({
    dispatch,
    history,
    setProfilesLoading,
    setIsPopUpShowState,
    shouldFetch 
    }) => {
    
    const profiles = useSelector(state => state.profiles); 
    const currUser = useSelector(state => state.user);    
    const {list} = profiles;
      

    useEffect( ()=> {
        setEventsToUserConnectivity();         
    },[profiles]);

    
    const setEventsToUserConnectivity = () => {        
        listenToswitchUserToOnlineEvent();
        listenToDisconnectUserEvent();
    }


    const isUserAlreadyOnline = (userId) => {
        if(list[userId] && list[userId].isOnline === true )
            return true; // that mean that the user is in the list and is not new and do noting.        
        else  
            return false; // that mean that the user is not in the list and new.        
    }

    const listenToswitchUserToOnlineEvent = () => {
        currUser.socket_server.on('user_connect',(profileObj) => {
            // console.log('shouldFetch is :',shouldFetch);
            // console.log('profiles is :',profiles); 
            console.log("user_connect",userId);                                          
            if(history.location.pathname == '/search/online' && !isUserAlreadyOnline(profileObj.userId) ){                                
                dispatch(addProfileToList(list,profileObj));
                setProfilesLoading(null);        
            }                               
        })
    }
        
    const listenToDisconnectUserEvent = () => {
        currUser.socket_server.on('user_disconnect',(userId) => {  
            console.log("disconected",userId);                       
            if(history.location.pathname == '/search/online')
                dispatch(deleteProfileFromList(list,userId));    
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

export default profilesSearchOnline;

