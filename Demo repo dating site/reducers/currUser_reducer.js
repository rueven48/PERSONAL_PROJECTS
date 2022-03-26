import {LOGIN,REGISTER,STORE_REG_FORM_DATA,CONNECT_SOCKET_SERVER,INIT_USER_STATISTICS_HANDLER,CHANGE_USER_STATISTICS_HANDLER,INIT_USER_EVENTS_HANDLER,
        CHANGE_USER_EVENTS_HANDLER,RESET_RESPONSE_OBJ} from '../actions/types';

        
export default function (state={}, action){
    switch(action.type){    
        case LOGIN:
            return {...state,loginObj:action.payload};
        case REGISTER:
            return {...state,loginObj:action.payload};           
        case STORE_REG_FORM_DATA:
            return {...state,regDataObj:{...state.regDataObj,...action.payload}};    
        case CONNECT_SOCKET_SERVER:
            return {...state,socket_server:action.payload};
        case INIT_USER_STATISTICS_HANDLER:
            return {...state,isUserStatistics:action.payload}; 
        case CHANGE_USER_STATISTICS_HANDLER:
            return {...state,isUserStatistics:action.payload};           
        case INIT_USER_EVENTS_HANDLER:
            return {...state,isUserEvents:action.payload}; 
        case CHANGE_USER_EVENTS_HANDLER:
            return {...state,isUserEvents:action.payload};                          
        case RESET_RESPONSE_OBJ:
            return {response:action.payload};            
    default:
       return state;
    }
}

