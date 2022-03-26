import React from 'react';
import {useSelector} from 'react-redux';
import ViewProfile from './view_profile';
import { parseDateWithMoment } from './../../config';

const Profile = ({
    profile,
    setIsPopUpShowState,
    mailboxModeState,
    viewsModeState,
    likesModeState,
    favoritesModeState,
    dispatch
    }) => {

    // // ********* UseSelector Init - By React-Redux ************** //
    const currUser = useSelector(state => state.user);
    const statistics = useSelector(state => state.statistics);
    // // ********* UseSelector Init - By React-Redux ************** //
       
    const checkIndicatorToRender = () => {
        if(mailboxModeState)
            return renderNewMessagesIndicator();
        if(viewsModeState)  
            return renderNewViewsIndicator();
        if(likesModeState)
            return renderNewLikesIndicator();
        if(favoritesModeState)
           return renderNewFavoritesIndicator();
    }
    
    
    const renderNewMessagesIndicator = () => {                
        if(statistics.newMessagesReceived.length === 0)
            return null;        
        if(statistics.newMessagesReceived.length === 1)            
            return checkIsOneNewMessage();                                                                                                                                                          
        if(statistics.newMessagesReceived.length > 1)        
            return checkIsMoreThenOneNewMessages();                                           
    }
        
    const checkIsOneNewMessage = () => {       
        if(profile.userId === statistics.newMessagesReceived[0].fromUserId)
            return "הודעה חדשה";                                                                       
    }

    const checkIsMoreThenOneNewMessages = () => { // could be all messages from the same user and could not - must check it !!!                              
        let userMessagesCount = 0;            
        userMessagesCount = countSameMessagesFromSpecificUser(userMessagesCount);
        return showResultMessagesCount(userMessagesCount);                                
    }

    const showResultMessagesCount = (userMessagesCount) => {
        if(userMessagesCount === 0)
            return null;            
        if(userMessagesCount === 1)
            return "הודעה חדשה";            
        if(userMessagesCount > 1)
            return `${userMessagesCount} הודעות חדשות`;
    }

    const countSameMessagesFromSpecificUser = (userMessagesCount) => {
        for (let i = 0; i < statistics.newMessagesReceived.length; i++){            
            if(profile.userId === statistics.newMessagesReceived[i].fromUserId)
                userMessagesCount++;                                
        }
        return userMessagesCount;
    }
 
    const renderNewViewsIndicator = () => {        
        if(statistics.newViewsReceived.length === 0)
            return null;        
        if(statistics.newViewsReceived.length >= 1)            
            return checkIsOneNewView();                                                                                                                                                          
        if(statistics.newViewsReceived.length > 1)          
            return checkIsMoreThenOneNewViews();                                               
    }

    const checkIsOneNewView = () => {      
        if(profile.userId === statistics.newViewsReceived[0].viewerUserId)
            return "צפייה חדשה";                           
    }

    const checkIsMoreThenOneNewViews = () => {           
        for (let i = 0; i < statistics.newViewsReceived.length; i++){            
            if(profile.userId === statistics.newViewsReceived[i].viewerUserId)
                return "צפייה חדשה";                              
        }                                 
    }

    const renderNewFavoritesIndicator = () => {        
        if(statistics.newFavoritesReceived.length === 0)
            return null;                
        if(statistics.newFavoritesReceived.length === 1)            
            return checkIsOneNewFavorite();                                                                                                                                                          
        if(statistics.newFavoritesReceived.length > 1)          
            return checkIsMoreThenOneNewFavorites();                                
    }

    const checkIsOneNewFavorite = () => {        
        if(profile.userId === statistics.newFavoritesReceived[0].toDoFavorUserId)
            return "מועדף חדש";               
    }

    const checkIsMoreThenOneNewFavorites = () => {          
        for (let i = 0; i < statistics.newFavoritesReceived.length; i++){            
            if(profile.userId === statistics.newFavoritesReceived[i].toDoFavorUserId)
                return "מועדף חדש";                                     
        }                                              
    }
    
    const renderNewLikesIndicator = () => {     
        if(statistics.newLikesReceived.length === 0)
            return null;                
        if(statistics.newLikesReceived.length === 1)            
            return checkIsOneNewLike();                                                                                                                                                          
        if(statistics.newLikesReceived.length > 1)          
            return checkIsMoreThenOneNewLikes();                                                                          
    }

    const checkIsOneNewLike = () => {                            
        if(profile.userId === statistics.newLikesReceived[0].toDoLikeUserId)
            return "לייק חדש";                            
    }

    const checkIsMoreThenOneNewLikes = () => {            
        for (let i = 0; i < statistics.newLikesReceived.length; i++){            
            if(profile.userId === statistics.newLikesReceived[i].toDoLikeUserId)
                return "לייק חדש";                               
        }                                       
    }

    const isModeStateActive = () => {
        const signInfoObjState = {};          
        if(profile.date){                                     
            return setObjStateMode(signInfoObjState,profile);    
        }else{                        
            signInfoObjState["textDate"] = "";
            return signInfoObjState["dateLastSeen"] = "";
        }
    }

    const setObjStateMode = (signInfoObjState) => {
        signInfoObjState["dateLastSeen"] = parseDateWithMoment(profile);
        signInfoObjState["textDate"] = `${getTextBoxByModeState()} בתאריך`
        return signInfoObjState;
    } 

    const getTextBoxByModeState = () => {
        if(mailboxModeState)
            return "הודעה אחרונה";
        if(viewsModeState)  
           return "צפיה אחרונה";
        if(likesModeState)
            return "לייק נעשה";
        if(favoritesModeState)
            return "תיעדוף התווסף";
    }
       
    const getSignPicElement = () => {
        return <img className="wooden_sign" src={require(`./../../assets/images/wooden_sign.png`)} alt="sign"/> 
    }

    const getCableOnlinePicElement = () => {
        return  <img className="cable" src={require(`./../../assets/images/cable.png`)} alt="cable"/>
    } 

    // console.log('Profile',profile);
            
    return (      
            <div>
                <ViewProfile currUser={currUser}
                             profile={profile}
                             setIsPopUpShowState={setIsPopUpShowState}
                             showSignPic={mailboxModeState || viewsModeState || likesModeState || favoritesModeState ?getSignPicElement() : null}                                                          
                             signInfo={mailboxModeState || viewsModeState || likesModeState || favoritesModeState ? isModeStateActive() : ""}                                                                                                                                                    
                             indicatorText={mailboxModeState || viewsModeState || likesModeState || favoritesModeState ? checkIndicatorToRender() : null}
                             showCableOnlinePic={profile.isOnline ? getCableOnlinePicElement() : null}   
                             dispatch={dispatch}                
                />
            </div>
           )
}


export default Profile;