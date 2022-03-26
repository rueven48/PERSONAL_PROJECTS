/* eslint-disable */
import React from 'react';
import ProfilesViewedMe from './../../components/Profiles/profiles_view_me';
import ProfilesMeViewsOthers from './../../components/Profiles/profiles_me_view_others';

const ViewViewsBranch = ({
    eventsUserConnectivityViewsHandler,
    setEventsUserConnectivityViewsHandler,
    profilesListViewsHandler,
    setProfilesListViewsHandler,
    setIsPopUpShowState,
    dispatch,
    history,
    viewsModeState
    }) => {

    return (      
            <div>                                
                {(history.location.pathname === '/views/viewd-me')?
                <ProfilesViewedMe eventsUserConnectivityViewsHandler = {eventsUserConnectivityViewsHandler}
                                  setEventsUserConnectivityViewsHandler = {setEventsUserConnectivityViewsHandler}
                                  profilesListViewsHandler = {profilesListViewsHandler}
                                  setProfilesListViewsHandler = {setProfilesListViewsHandler}
                                  setIsPopUpShowState={setIsPopUpShowState}
                                  dispatch={dispatch}
                                  history={history}
                                  viewsModeState={viewsModeState}
                />:
                <ProfilesMeViewsOthers eventsUserConnectivityViewsHandler = {eventsUserConnectivityViewsHandler}
                                       setEventsUserConnectivityViewsHandler = {setEventsUserConnectivityViewsHandler}
                                       setIsPopUpShowState={setIsPopUpShowState}
                                       dispatch={dispatch}
                                       history={history}
                                       viewsModeState={viewsModeState}
                />
                }                                                                                                                                                                                                                                        
            </div>
           )
}

export default ViewViewsBranch;