import {GET_ALL_USER_STATISTICS_ON_BOARD,PLUS_ONE_TO_COUNTER_USER_MESSG_SEND,PLUS_ONE_TO_COUNTER_USER_MESSG_RECEIVED,ADD_NEW_LIKES_RECIEVED,
        PLUS_ONE_TO_COUNTER_USER_DO_LIKE,PLUS_ONE_TO_COUNTER_USER_BE_LIKED,PLUS_ONE_TO_COUNTER_USER_DO_FAVORITE,ADD_NEW_VIEWS_RECEIVED,ADD_NEW_FAVORITES_RECIEVED,
        PLUS_ONE_TO_COUNTER_USER_BE_FAVORITED,PLUS_ONE_TO_COUNTER_USER_VIEWER,PLUS_ONE_TO_COUNTER_USER_BE_VIEWED,DELETE_NEW_MESSAGE_FROM_STATISTICS_ARR} from './../actions/types';

        
export default function(state={}, action){
    switch(action.type){                
        case GET_ALL_USER_STATISTICS_ON_BOARD:            
            return {...state,...action.payload};        
        case PLUS_ONE_TO_COUNTER_USER_MESSG_SEND:
            return {...state,sumMessagesSend:{counter:action.payload}};            
        case PLUS_ONE_TO_COUNTER_USER_MESSG_RECEIVED:
            return {...state,sumMessagesReceived:{counter:action.payload}};
        case PLUS_ONE_TO_COUNTER_USER_DO_LIKE:
            return {...state,sumLikesToOtherProfiles:{counter:action.payload}};
        case PLUS_ONE_TO_COUNTER_USER_BE_LIKED:
            return {...state,sumLikesToMyProfile:{counter:action.payload}};    
        case PLUS_ONE_TO_COUNTER_USER_DO_FAVORITE:
            return {...state,sumFavoritesToOtherProfiles:{counter:action.payload}};
        case PLUS_ONE_TO_COUNTER_USER_BE_FAVORITED:
            return {...state,sumFavoritesToMyProfile:{counter:action.payload}};
        case PLUS_ONE_TO_COUNTER_USER_VIEWER:
            return {...state,sumViewsToOtherProfiles:{counter:action.payload}};
        case PLUS_ONE_TO_COUNTER_USER_BE_VIEWED:
            return {...state,sumViewsToMyProfile:{counter:action.payload}};                          
        case DELETE_NEW_MESSAGE_FROM_STATISTICS_ARR:
            return {...state,newMessagesReceived: action.payload};        
        case ADD_NEW_LIKES_RECIEVED:
            return {...state,newLikesReceived:action.payload};                                       
        case ADD_NEW_VIEWS_RECEIVED:
            return {...state,newViewsReceived:action.payload};            
        case ADD_NEW_FAVORITES_RECIEVED:
            return {...state,newFavoritesReceived:action.payload};        
        default:
            return state;
    }
}