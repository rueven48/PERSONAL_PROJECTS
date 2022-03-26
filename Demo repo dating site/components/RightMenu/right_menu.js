/* eslint-disable */
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import ViewRightMenu from './view_right_menu';
import {parseDateWithMoment} from './../../config';
import ViewSideBar from './view_sideBar';

const RightMenu = ({
    pageWrapId,
    outerContainerId,
    right
    }) => {
    
    // ********* UseSelector Init - By React-Redux ************** //
    const currUser = useSelector(state => state.user);
    const statistics = useSelector(state => state.statistics);
    const messages = useSelector(state => state.messages);
    // ********* UseSelector Init - By React-Redux ************** // 
    
    useEffect( ()=> {
        
    },[statistics,messages.list]); // need messages here to tell RightMenu component to render aftar new message compontent changed.

            
    const newMessagesNotifier = () => {        
        if(statistics.newMessagesReceived && statistics.newMessagesReceived.length === 0)            
            return ""; // no new favorites                                              
        if(statistics.newMessagesReceived && statistics.newMessagesReceived.length !== 0)
            return checkoIsOneNotifierMessageOrMore(statistics);
    }
        
    const checkoIsOneNotifierMessageOrMore = (statistics) => {
        let messageDate;        
        if(statistics.newMessagesReceived.length === 1)
           return oneNewMessageNotifier(messageDate,statistics);
        else
           return manyNewMessagesNotifier(messageDate,statistics);      
    }

    const oneNewMessageNotifier = (messageDate,statistics) => {
        messageDate = parseDateWithMoment(statistics.newMessagesReceived[0].date);
        return `הודעה 1 חדשה התקבלה ב - ${messageDate}`;
    }

    const manyNewMessagesNotifier = (messageDate,statistics) => {
        messageDate = parseDateWithMoment(statistics.newMessagesReceived[statistics.newMessagesReceived.length-1].date);
        return `${statistics.newMessagesReceived.length} הודעות חדשות  האחרונה ב - ${messageDate}`; 
    }

    const newViewsNotifier = () => {                            
        if(statistics.newViewsReceived && statistics.newViewsReceived.length === 0)
            return ""; // no new views                             
        if(statistics.newViewsReceived && statistics.newViewsReceived.length !== 0)
            return checkoIsOneNotifierViewOrMore(statistics);
    }

    const checkoIsOneNotifierViewOrMore = () => {
        let viewDate;
        if(statistics.newLikesReceived.length === 1)
            return oneNewViewNotifier(viewDate,statistics);
        else
            return manyNewViewsNotifier(viewDate,statistics);
    }


    const oneNewViewNotifier = (viewDate,statistics) => {
        viewDate = parseDateWithMoment(statistics.newViewsReceived[0].date);
        return `-צפיה 1 חדשה התקבלה ב - ${viewDate}`;
    }

    const manyNewViewsNotifier = (viewDate,statistics) => {
        viewDate = parseDateWithMoment(statistics.newViewsReceived[statistics.newViewsReceived.length-1].date);
        return `${statistics.newViewsReceived.length} צפיות חדשות האחרונה ב - ${viewDate}`;
    }


    const newFavoritesNotifier = () => {                            
        if(statistics.newFavoritesReceived && statistics.newFavoritesReceived.length === 0)
            return ""; // no new favorites                           
        if(statistics.newFavoritesReceived && statistics.newFavoritesReceived.length !== 0)
            return checkoIsOneNotifierFavoriteOrMore(statistics);                   
    }

    const checkoIsOneNotifierFavoriteOrMore = (statistics) => {
        let favoriteDate;
        if(statistics.newFavoritesReceived.length === 1)
           return oneNewFavoriteNotifier(favoriteDate,statistics);
        else    
           return manyNewFavoritesNotifier(favoriteDate,statistics);            
    }

    const oneNewFavoriteNotifier = (favoriteDate,statistics) => {
        favoriteDate = parseDateWithMoment(statistics.newFavoritesReceived[0].date);
        return `מועדף 1 חדש התקבל ב - ${favoriteDate}`;
    }

    const manyNewFavoritesNotifier = (favoriteDate,statistics) => {
        favoriteDate = parseDateWithMoment(statistics.newFavoritesReceived[statistics.newFavoritesReceived.length-1].date);
        return `${statistics.newFavoritesReceived.length} מועדפים חדשים האחרון ב - ${favoriteDate}`;
    }


    const newLikesNotifier = () => {                            
        if(statistics.newLikesReceived && statistics.newLikesReceived.length === 0)
            return  ""; // no new likes
                                              
        if(statistics.newLikesReceived && statistics.newLikesReceived.length !== 0){
            return checkoIsOneNotifierLikeOrMore(statistics);           
        }
    }
    const checkoIsOneNotifierLikeOrMore = (statistics) => {        
            let likeDate;
            if(statistics.newLikesReceived.length === 1)
                return oneNewLikeNotifier(likeDate,statistics);
             else
                return manyNewLikesNotifier(likeDate,statistics);             
    }

    const oneNewLikeNotifier = (likeDate,statistics) => {
        likeDate = parseDateWithMoment(statistics.newLikesReceived[0].date);
        return `לייק 1 חדש התקבל ב - ${likeDate}`;
    }

    const manyNewLikesNotifier = (likeDate,statistics) => {
        likeDate = parseDateWithMoment(statistics.newLikesReceived[statistics.newLikesReceived.length-1].date);
        return `${statistics.newLikesReceived.length} לייקים חדשים האחרון ב - ${likeDate}`
    }

    //console.log('right_menu',statistics);
        
    return (
            <div>                                            
                { (currUser && Object.keys(statistics).length>7)?
                <div>
                    <ViewRightMenu currUser={currUser}
                                   statistics={statistics}
                                   newMessagesNotifier={newMessagesNotifier()}                            
                                   newViewsNotifier={newViewsNotifier()}                            
                                   newLikesNotifier={newLikesNotifier()}
                                   newFavoritesNotifier={newFavoritesNotifier()}
                    />

                    <ViewSideBar pageWrapId={pageWrapId}
                                 outerContainerId={outerContainerId}
                                 right={right}
                                 currUser={currUser}
                                 statistics={statistics}
                                 newMessagesNotifier={newMessagesNotifier()}                            
                                 newViewsNotifier={newViewsNotifier()}                            
                                 newLikesNotifier={newLikesNotifier()}
                                 newFavoritesNotifier={newFavoritesNotifier()}
                                
                    />
                </div>                    
                :
                null
                }
            </div>        
    )                                                           
}
  
export default RightMenu;