import {RESET_CURR_VIEW} from './../actions/types';

export default function(state={}, action){
    switch(action.type){
        case RESET_CURR_VIEW:
            return {};            
    default:
       return state;
    }
}