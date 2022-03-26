/* eslint-disable */
import React, { useEffect,useState } from 'react';
import {authenticationTokenToEnterPage} from '../../actions';
import FavoritesNavLinks from './../../components/ui/links/favorites_nav_links';
import PopUpModal from '../../components/PopupModal/popup_modal';
import { Modal,Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import ViewFavoritesBranch from './view_favorites_branch';

const FavoritesContainer = () => {
    
    // ********* UseState Variables && Functions Init - By REACT ************** //
    const [isPopUpShowState,setIsPopUpShowState]  = useState(false);      
    const [favoritesModeState]  = useState(true);
    const [eventsUserConnectivityFavoritesHandler,setEventsUserConnectivityFavoritesHandler] = useState(false);
    const [profilesListFavoritesHandler,setProfilesListFavoritesHandler] = useState(false);
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
                <FavoritesNavLinks/>

                <ViewFavoritesBranch eventsUserConnectivityFavoritesHandler={eventsUserConnectivityFavoritesHandler}
                                     setEventsUserConnectivityFavoritesHandler={setEventsUserConnectivityFavoritesHandler}
                                     profilesListFavoritesHandler={profilesListFavoritesHandler}
                                     setProfilesListFavoritesHandler={setProfilesListFavoritesHandler}
                                     setIsPopUpShowState={setIsPopUpShowState}
                                     dispatch={dispatch}
                                     history={history}
                                     favoritesModeState={favoritesModeState}
                />

                {(isPopUpShowState)?<PopUpModal isPopUpShowState={isPopUpShowState}
                                                setIsPopUpShowState={setIsPopUpShowState}
                                                dispatch={dispatch}
                                    />
                :
                null}
            </div>
            )                                                                   
}
  
export default FavoritesContainer;