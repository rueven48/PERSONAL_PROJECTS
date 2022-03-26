import {GET_MESSAGES_BETWEEN_USERS,ADD_MESSAGE_TO_ARR,ADD_NEW_MESSAGES_RECIEVED,CHANGE_MESSAGE_STATUS_TO_READ	} from './../actions/types';

export default function(state={}, action){
    switch(action.type){        
        case GET_MESSAGES_BETWEEN_USERS:
            return {...state,list:action.payload};
        case ADD_MESSAGE_TO_ARR:
            return {...state,list:action.payload};          
        case ADD_NEW_MESSAGES_RECIEVED:
            return {...state,list:action.payload};                
        case CHANGE_MESSAGE_STATUS_TO_READ:
            return {...state,list:action.payload}; 
    default:
       return state;
    }
}