import React from 'react';
import ProfilesLikedMe from './../../components/Profiles/profiles_like_me';
import ProfilesMeLikesOthers from './../../components/Profiles/profiles_me_like_others';

const ViewLikesBranch = ({
    eventsUserConnectivityLikesHandler,
    setEventsUserConnectivityLikesHandler,
    profilesListLikesHandler,
    setProfilesListLikesHandler,
    setIsPopUpShowState,
    dispatch,
    history,
    likesModeState
    }) => {

    return (      
            <div>                
                {(history.location.pathname === '/likes/liked-me')?
                <ProfilesLikedMe  eventsUserConnectivityLikesHandler = {eventsUserConnectivityLikesHandler}
                                  setEventsUserConnectivityLikesHandler = {setEventsUserConnectivityLikesHandler}
                                  profilesListLikesHandler = {profilesListLikesHandler}
                                  setProfilesListLikesHandler = {setProfilesListLikesHandler}
                                  setIsPopUpShowState={setIsPopUpShowState}
                                  dispatch={dispatch}
                                  history={history}
                                  likesModeState={likesModeState}
                />:
                <ProfilesMeLikesOthers  eventsUserConnectivityLikesHandler = {eventsUserConnectivityLikesHandler}
                                        setEventsUserConnectivityLikesHandler = {setEventsUserConnectivityLikesHandler}
                                        setIsPopUpShowState={setIsPopUpShowState}
                                        dispatch={dispatch}
                                        history={history}
                                        likesModeState={likesModeState}
                />
                }
                                                                                                       
                                                                                                                                                                
            </div>
           )
}

export default ViewLikesBranch;