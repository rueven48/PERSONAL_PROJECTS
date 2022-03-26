/* eslint-disable */
import React, { useMemo,useEffect } from 'react';
import Profiles from './profiles';
import { Button } from 'react-bootstrap';
import {getProfilesOfFavoritesMe,changeSpecificUserToOnline,changeSpecificUserToOffline,addNewFavoritesReceived,getOneProfile} from '../../actions';
import { useSelector } from 'react-redux';


const profilesFavoritedMe = ({    
    eventsUserConnectivityFavoritesHandler,
    setEventsUserConnectivityFavoritesHandler,
    profilesListFavoritesHandler,
    setProfilesListFavoritesHandler,
    setIsPopUpShowState,
    dispatch,
    history,
    favoritesModeState
    }) => {


    const profiles = useSelector(state => state.profiles); 
    const currUser = useSelector(state => state.user);
    const statistics = useSelector(state => state.statistics);
    let {list} =  profiles;


    useMemo( ()=> {      
        if(currUser.loginObj === undefined) return;
            dispatch(getProfilesOfFavoritesMe(currUser.loginObj.data._id));
        setEventsUserConnectivityFavoritesHandler(true);
        setProfilesListFavoritesHandler(true);                                               
    },[]);

    
    useEffect( ()=> {
        listenToDisconnectUserEvent();
        if(profilesListFavoritesHandler)        
            listenToPlusOneCounterUserBeFavorited();
        if(eventsUserConnectivityFavoritesHandler){            
            setEventsToUserConnectivity();
            setEventsUserConnectivityFavoritesHandler(false);  
        } 
    },[list]);

    const setEventsToUserConnectivity = () => {        
        listenToswitchUserToOnlineEvent();
    }

    const listenToswitchUserToOnlineEvent = () => {
        if(currUser.socket_server === undefined) return ;
        currUser.socket_server.on('switch_user_to_online',(userObj) => {                    
            if(history.location.pathname == '/favorites/favorited-me' && list[userObj.userId])
                dispatch(changeSpecificUserToOnline(list,userObj.userId));                                      
        })
    }
        
    const listenToDisconnectUserEvent = () => {
        if(currUser.socket_server === undefined) return ;
        currUser.socket_server.on('user_disconnect',(userId) => {                         
            if(history.location.pathname == '/favorites/favorited-me' && list[userId] ){
                dispatch(changeSpecificUserToOffline(list,userId));   
            }
        })                                               
    }

    const listenToPlusOneCounterUserBeFavorited = () => {  
        if(currUser.socket_server === undefined) return ;
        currUser.socket_server.on('plus_one_counter_favorites_toBeFavorited',(data) => {
          if(history.location.pathname == '/favorites/favorited-me'){                                   
            dispatch(addNewFavoritesReceived(data,statistics.newFavoritesReceived));
            dispatch(getOneProfile(data.toDoFavorUserId,currUser.loginObj.data._id,history.location.pathname,list)); 
          }
        })
    }
    
    //console.log('profilesFavoritedMe',props);
  
    return  (
                <div>
                    <div className="profiles_list d-flex flex-column align-items-center">
                        {profiles.list?<Profiles profiles={list}
                                                 setIsPopUpShowState={setIsPopUpShowState}
                                                 dispatch={dispatch}
                                                 favoritesModeState={favoritesModeState}

                                       />
                         :
                         null
                        }
                    </div>                
                </div>
            )        
}

export default profilesFavoritedMe;

