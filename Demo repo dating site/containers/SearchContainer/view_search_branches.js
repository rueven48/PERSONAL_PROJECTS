/* eslint-disable */
import React from 'react';
import ProfilesSearchOnline from './../../components/Profiles/profiles_search_online';
import ProfilesSearchWithPics from './../../components/Profiles/profiles_search_with_pics';
import ProfilesSearchRecentlyVisited from  './../../components/Profiles/profiles_search_recently_visited';
import ProfilesSearchNewUsers from './../../components/Profiles/profiles_search_new_users';

const ViewSearchBranches = ({
    dispatch,
    history,
    setProfilesLoading,
    setIsPopUpShowState,
    setSearchStartPoint,
    setLastUserConnIndex,
    shouldFetch
    }) => {

    return (      
            <div>                 
                {(history.location.pathname == '/search/online')?            
                    <div className="profiles_online">                    
                        <ProfilesSearchOnline dispatch={dispatch}
                                              history={history}
                                              setProfilesLoading={setProfilesLoading}
                                              setIsPopUpShowState={setIsPopUpShowState}
                                              shouldFetch={shouldFetch}
                        />                                                                                                                            
                    </div>
                :
                null}  
                

                {(history.location.pathname == '/search/pics')?
                    <div className="profiles_online">                    
                        <ProfilesSearchWithPics dispatch={dispatch}
                                                history={history}
                                                setSearchStartPoint={setSearchStartPoint}
                                                setLastUserConnIndex={setLastUserConnIndex}
                                                setIsPopUpShowState={setIsPopUpShowState}
                        />                                                                                             
                    </div>
                :
                null}  
                

                {(history.location.pathname == '/search/recently')?
                 <div className="profiles_online">                    
                        <ProfilesSearchRecentlyVisited dispatch={dispatch}
                                                       history={history}
                                                       setSearchStartPoint={setSearchStartPoint}
                                                       setLastUserConnIndex={setLastUserConnIndex}
                                                       setIsPopUpShowState={setIsPopUpShowState}
                        />                               
                 </div>
                :
                null}   
                

                {(history.location.pathname == '/search/news')?
                 <div className="profiles_online">                    
                        <ProfilesSearchNewUsers dispatch={dispatch}
                                                history={history}
                                                setSearchStartPoint={setSearchStartPoint}
                                                setLastUserConnIndex={setLastUserConnIndex}
                                                setIsPopUpShowState={setIsPopUpShowState}
                        />                           
                  </div>
                :
                null}                                                                                                                                                                         
            </div>
           )
}

export default ViewSearchBranches;