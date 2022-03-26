/* eslint-disable */
import React, { useMemo,useEffect } from 'react';
import Profiles from './profiles';
import { Button } from 'react-bootstrap';
import {getProfilesOfMeFavoritedOthers,changeSpecificUserToOnline,changeSpecificUserToOffline} from '../../actions';
import { useSelector } from 'react-redux';

const  profilesMeFavoritesOthers = ({
    eventsUserConnectivityFavoritesHandler,
    setEventsUserConnectivityFavoritesHandler,
    setIsPopUpShowState,
    dispatch,
    history,
    favoritesModeState
    }) => {

    const profiles = useSelector(state => state.profiles); 
    const currUser = useSelector(state => state.user);
    let {list} =  profiles;
   
    useMemo( ()=> {      
        if (Object.keys(currUser).length != 0){
            dispatch(getProfilesOfMeFavoritedOthers(currUser.loginObj.data._id));
            setEventsUserConnectivityFavoritesHandler(true);   
        }                                              
    },[]);
        
    useEffect( ()=> {
        if(eventsUserConnectivityFavoritesHandler){            
            setEventsToUserConnectivity();
            setEventsUserConnectivityFavoritesHandler(false);  
        } 
    },[profiles]);

    const setEventsToUserConnectivity = () => {        
        listenToswitchUserToOnlineEvent();
        listenToDisconnectUserEvent();
    }

    const listenToswitchUserToOnlineEvent = () => {
        currUser.socket_server.on('switch_user_to_online',(userObj) => {                    
            if(history.location.pathname == '/favorites/favorite-others' && list[userObj.userId])
                dispatch(changeSpecificUserToOnline(list,userObj.userId));                                      
        })
    }
        
    const listenToDisconnectUserEvent = () => {
        currUser.socket_server.on('user_disconnect',(userId) => {                         
            if(history.location.pathname == '/favorites/favorite-others')
                dispatch(changeSpecificUserToOffline(list,userId));   
        })                                               
    }
        
    return  (
                <div>
                    <div className="profiles_list d-flex flex-column align-items-center">
                        {profiles.list?<Profiles profiles={list}
                                                 setIsPopUpShowState={setIsPopUpShowState}
                                                 dispatch={dispatch}
                                                 history={history}
                                                 favoritesModeState={favoritesModeState}
                        />
                        :
                        null
                        }
                    </div>                
                </div>
            )        
}

export default profilesMeFavoritesOthers;

