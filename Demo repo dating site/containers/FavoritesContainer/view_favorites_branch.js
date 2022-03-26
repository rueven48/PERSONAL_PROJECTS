import React from 'react';
import ProfilesFavoritedMe from './../../components/Profiles/profiles_favorite_me';
import ProfilesMeFavoritesOthers from './../../components/Profiles/profiles_me_favorite_others';

const ViewFavoritesBranch = ({
    eventsUserConnectivityFavoritesHandler,
    setEventsUserConnectivityFavoritesHandler,
    profilesListFavoritesHandler,
    setProfilesListFavoritesHandler,
    setIsPopUpShowState,
    dispatch,
    history,
    favoritesModeState
    }) => {

    return (      
            <div>               
                {(history.location.pathname === '/favorites/favorited-me')?
                <ProfilesFavoritedMe eventsUserConnectivityFavoritesHandler = {eventsUserConnectivityFavoritesHandler}
                                     setEventsUserConnectivityFavoritesHandler = {setEventsUserConnectivityFavoritesHandler}
                                     profilesListFavoritesHandler = {profilesListFavoritesHandler}
                                     setProfilesListFavoritesHandler = {setProfilesListFavoritesHandler}
                                     setIsPopUpShowState={setIsPopUpShowState}
                                     dispatch={dispatch}
                                     history={history}
                                     favoritesModeState={favoritesModeState}
                />:
                <ProfilesMeFavoritesOthers eventsUserConnectivityFavoritesHandler = {eventsUserConnectivityFavoritesHandler}
                                           setEventsUserConnectivityFavoritesHandler = {setEventsUserConnectivityFavoritesHandler}
                                           setIsPopUpShowState={setIsPopUpShowState}
                                           dispatch={dispatch}
                                           history={history}
                                           favoritesModeState={favoritesModeState}
                />
                }                                                                                                                                                                                                                                                                        
            </div>
           )
}

export default ViewFavoritesBranch;