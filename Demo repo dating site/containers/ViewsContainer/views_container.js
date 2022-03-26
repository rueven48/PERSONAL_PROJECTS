/* eslint-disable */
import React, { useEffect,useState } from 'react';
import {authenticationTokenToEnterPage } from '../../actions';
import { Modal,Button } from 'react-bootstrap';
import ViewsNavLinks from './../../components/ui/links/views_nav_links';
import PopUpModal from '../../components/PopupModal/popup_modal';
import { useHistory } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import ViewViewsBranch from './view_views_branch';


const ViewsContainer = () => {
    
    // ********* UseState Variables && Functions Init - By REACT ************** //
    const [isPopUpShowState,setIsPopUpShowState] = useState(false);       
    const [viewsModeState] = useState(true);
    const [eventsUserConnectivityViewsHandler,setEventsUserConnectivityViewsHandler] = useState(false);
    const [profilesListViewsHandler,setProfilesListViewsHandler] = useState(false);
    // ********* UseState Variables && Functions Init - By REACT ************** //

    // ********* UseHistory Variables Init - By React-Router-Dom ************** //
    const history = useHistory();
    // ********* UseHistory Variables Init - By React-Router-Dom ************** //
   
    // ********* UseDispatch Variables && UseSelector Init - By React-Redux ************** //
    const dispatch = useDispatch();    
    const currUser = useSelector(state => state.user);
    // ********* UseDispatch Variables && UseSelector Init - By React-Redux ************** //

    useEffect( ()=> {
        dispatch(authenticationTokenToEnterPage(currUser,history));                               
    },[]);
                     
    return (  
            <div>
                <ViewsNavLinks/>

                <ViewViewsBranch eventsUserConnectivityViewsHandler={eventsUserConnectivityViewsHandler}
                                    setEventsUserConnectivityViewsHandler={setEventsUserConnectivityViewsHandler}
                                    profilesListViewsHandler={profilesListViewsHandler}
                                    setProfilesListViewsHandler={setProfilesListViewsHandler}
                                    setIsPopUpShowState={setIsPopUpShowState}
                                    dispatch={dispatch}
                                    history={history}
                                    viewsModeState={viewsModeState}
                />

                {(isPopUpShowState)?<PopUpModal isPopUpShowState={isPopUpShowState}
                                                setIsPopUpShowState={setIsPopUpShowState}
                                                dispatch={dispatch}
                                    />
                :null}                                                                     
            </div>
            )                                                                    
}
  
export default ViewsContainer;