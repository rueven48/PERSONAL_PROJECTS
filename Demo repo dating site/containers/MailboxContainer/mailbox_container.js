/* eslint-disable */
import React, { useEffect,useState } from 'react';
import {authenticationTokenToEnterPage} from '../../actions';
import { Modal,Button } from 'react-bootstrap';
import PopUpModal from '../../components/PopupModal/popup_modal';
import MailboxNavLinks from './../../components/ui/links/mailbox_nav_links';
import { useHistory } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import ViewMailBoxBranch from './view_mailbox_branch';

const MailboxContainer = () => {
    
    // ********* UseState Variables && Functions Init - By REACT ************** //
    const [isPopUpShowState,setIsPopUpShowState] = useState(false);         
    const [mailboxModeState] = useState(true);
    const [eventsUserConnectivityMailboxHandler,setEventsUserConnectivityMailboxHandler] = useState(false);    
    const [profilesListMailboxHandler,setProfilesListMailboxHandler] = useState(false);
    // ********* UseState Variables && Functions Init - By REACT ************** //
    
    // ********* UseHistory Variables Init - By React-Router-Dom ************** //
    const history = useHistory();
    // ********* UseHistory Variables Init - By React-Router-Dom ************** //

    // ********* UseDispatch Variables && UseSelector Init - By React-Redux ************** //
    const dispatch = useDispatch();
    const currUser = useSelector(state => state.user);
    
    //const profiles = useSelector(state => state.profiles); just for check
    // ********* UseDispatch Variables && UseSelector Init - By React-Redux ************** //

    useEffect( () => {
        dispatch(authenticationTokenToEnterPage(currUser,history));  
    },[]);    
                                       
    return (
        <div>
            <MailboxNavLinks/>

            <ViewMailBoxBranch eventsUserConnectivityMailboxHandler={eventsUserConnectivityMailboxHandler}
                               setEventsUserConnectivityMailboxHandler={setEventsUserConnectivityMailboxHandler}
                               profilesListMailboxHandler={profilesListMailboxHandler}
                               setProfilesListMailboxHandler={setProfilesListMailboxHandler} 
                               setIsPopUpShowState={setIsPopUpShowState}
                               dispatch={dispatch}
                               history={history}
                               mailboxModeState={mailboxModeState}
           />

           {(isPopUpShowState)?<PopUpModal isPopUpShowState={isPopUpShowState}
                                           setIsPopUpShowState={setIsPopUpShowState}
                                           dispatch={dispatch}
                               />
           :null}  
        </div>
        )                                                                                                                           
}

export default MailboxContainer;