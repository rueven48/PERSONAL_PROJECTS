import React from 'react';
import ProfilesMsgReceived from './../../components/Profiles/profiles_msg_received';
import ProfilesMsgSend from './../../components/Profiles/profiles_msg_send';

const ViewMailBoxBranch = ({
    eventsUserConnectivityMailboxHandler,
    setEventsUserConnectivityMailboxHandler,
    profilesListMailboxHandler,
    setProfilesListMailboxHandler,
    setIsPopUpShowState,
    dispatch,
    history,
    mailboxModeState
    }) => {

    return (      
            <div>

                {(history.location.pathname === '/mailbox/inbox')?
                <ProfilesMsgReceived eventsUserConnectivityMailboxHandler={eventsUserConnectivityMailboxHandler}
                                     setEventsUserConnectivityMailboxHandler={setEventsUserConnectivityMailboxHandler}
                                     profilesListMailboxHandler={profilesListMailboxHandler}
                                     setProfilesListMailboxHandler={setProfilesListMailboxHandler}
                                     setIsPopUpShowState={setIsPopUpShowState}
                                     dispatch={dispatch}
                                     history={history}
                                     mailboxModeState={mailboxModeState}
                />
                  :
                  <ProfilesMsgSend eventsUserConnectivityMailboxHandler = {eventsUserConnectivityMailboxHandler}
                                 setEventsUserConnectivityMailboxHandler = {setEventsUserConnectivityMailboxHandler}
                                 setIsPopUpShowState={setIsPopUpShowState}
                                 dispatch={dispatch}
                                 history={history}
                                 mailboxModeState={mailboxModeState}

                />  
                }
                               
                                                                                                                                                               
            </div>
           )
}

export default ViewMailBoxBranch;