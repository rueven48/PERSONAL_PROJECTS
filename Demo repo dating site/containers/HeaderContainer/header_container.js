/* eslint-disable */
import React, {useCallback} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {resetResponseObj} from '../../actions';
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import ViewHeaderBranch from './view_header_branch';

const HeaderContainer = () => {
    
    // ********* UseHistory Variables Init - By React-Router-Dom ************** //
    const history = useHistory();
    // ********* UseHistory Variables Init - By React-Router-Dom ************** //

    // ********* UseDispatch Variables && UseSelector Init - By React-Redux ************** //
    const currUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    // ********* UseDispatch Variables && UseSelector Init - By React-Redux ************** //
    
    const logOut = useCallback( () => {    
        currUser.socket_server.emit('logout'); // send --> db user logout.                
        dispatch(resetResponseObj());  // clean response so props form will do check when response = {};            
        history.push('/'); // route to home Page            
    },[currUser]
    );

    const showGreetingsByGender = () => {
        if(currUser.loginObj.data.isMale)
           return "!ברוך הבא";
        else
           return "!ברוכה הבאה";
    }

    //console.log('Header container:')
   
    return (
                        
        <div>                        
            <ViewHeaderBranch currUser={currUser}
                              logOut={logOut}
                              showGreetingsByGender={showGreetingsByGender}
            />                                                                       
        </div>            
    )                                                                  
}

export default HeaderContainer;