import {GET_PROFILES,GET_ONE_PROFILE,GET_PROFILES_OF_MSGS_RECEIVED,GET_PROFILES_OF_MSGS_SENDED,GET_PROFILES_OF_VIEWS_ME,GET_PROFILES_ONLINE,CHANGE_SPECIFIC_USER_TO_OFFLINE,
        GET_PROFILES_OF_ME_VIEWED_OTHERS,GET_PROFILES_OF_LIKES_ME,GET_PROFILES_OF_ME_LIKED_OTHERS,GET_PROFILES_OF_FAVORITES_ME,DELETE_PROFILE_FROM_LIST,DELETE_ALL_PROFILES_FROM_LIST,GET_PROFILES_RECENTLY_VISITED,
        GET_PROFILES_OF_ME_FAVORITED_OTHERS,CHANGE_SPECIFIC_USER_TO_ONLINE,TURN_OFF_INDICATOR_NEW_MSG_OF_PROFILE,RESET_CURR_PROFILES,ADD_PROFILE_TO_LIST,GET_PROFILES_ONLY_WITH_PICS,GET_PROFILES_NEW_USERS_REGISTERED} from './../actions/types';

export default function(state={}, action){
    switch(action.type){
        case GET_PROFILES:
            return {list:action.payload};
        case GET_ONE_PROFILE:
            return {list:action.payload};
        case GET_PROFILES_OF_MSGS_RECEIVED:
            return {list:action.payload};            
        case GET_PROFILES_OF_MSGS_SENDED:
            return {list:action.payload};         
        case GET_PROFILES_OF_VIEWS_ME:
            return {list:action.payload};
        case GET_PROFILES_OF_ME_VIEWED_OTHERS:
            return {list:action.payload};      
        case GET_PROFILES_OF_LIKES_ME:
            return {list:action.payload};
        case GET_PROFILES_OF_ME_LIKED_OTHERS:
            return {list:action.payload};       
        case GET_PROFILES_OF_FAVORITES_ME:
            return {list:action.payload};
        case GET_PROFILES_OF_ME_FAVORITED_OTHERS:
            return {list:action.payload};
        case CHANGE_SPECIFIC_USER_TO_ONLINE:
            return {list:action.payload};        
        case CHANGE_SPECIFIC_USER_TO_OFFLINE:
            return {list:action.payload};       
        case TURN_OFF_INDICATOR_NEW_MSG_OF_PROFILE:
            return {list:action.payload};            
         case GET_PROFILES_ONLINE:            
            return {list:action.payload};
        case DELETE_PROFILE_FROM_LIST:
            return {list:action.payload};
        case DELETE_ALL_PROFILES_FROM_LIST:
            return {list:action.payload};
        case ADD_PROFILE_TO_LIST:
            return {list:action.payload};        
        case GET_PROFILES_ONLY_WITH_PICS:
            return {list:action.payload};         
        case GET_PROFILES_RECENTLY_VISITED:
            return {list:action.payload};
        case GET_PROFILES_NEW_USERS_REGISTERED:
            return {list:action.payload};    
        case RESET_CURR_PROFILES:
            return {list:action.payload};
        default:
            return state;
    }
}


