/* eslint-disable */
import React, { useEffect,useState } from 'react';
import {authenticationTokenToEnterPage} from '../../actions';
import LikesNavLinks from './../../components/ui/links/likes_nav_links';
import PopUpModal from '../../components/PopupModal/popup_modal';
import { Modal,Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import ViewLikesBranch from './view_likes_branch';

const LikesContainer = () =>  {
    
    // ********* UseState Variables && Functions Init - By REACT ************** //
    const [isPopUpShowState,setIsPopUpShowState] = useState(false);               
    const [likesModeState]  = useState(true); 
    const [eventsUserConnectivityLikesHandler,setEventsUserConnectivityLikesHandler] = useState(false);
    const [profilesListLikesHandler,setProfilesListLikesHandler] = useState(false);
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
                <LikesNavLinks/>

                <ViewLikesBranch eventsUserConnectivityLikesHandler={eventsUserConnectivityLikesHandler}
                                 setEventsUserConnectivityLikesHandler={setEventsUserConnectivityLikesHandler}
                                 profilesListLikesHandler={profilesListLikesHandler}
                                 setProfilesListLikesHandler={setProfilesListLikesHandler}
                                 setIsPopUpShowState={setIsPopUpShowState}
                                 dispatch={dispatch}
                                 history={history}
                                 likesModeState={likesModeState}
                />

                {(isPopUpShowState)?<PopUpModal isPopUpShowState={isPopUpShowState}
                                                setIsPopUpShowState={setIsPopUpShowState}
                                                dispatch={dispatch}
                                    />
                :null} 
            </div>
            )                                                             
}
  
export default LikesContainer;