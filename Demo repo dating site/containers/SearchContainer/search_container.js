/* eslint-disable */
import React, { useEffect,useState } from 'react';
import { authenticationTokenToEnterPage,getProfilesOnline,getProfilesOnlyWithPics,getProfilesRecentlyVisited,getProfilesNewUsersRegistered,deleteAllProfilesFromList} from './../../actions';
import { Modal,Button } from 'react-bootstrap';
import PopupModal  from './../../components/PopupModal/popup_modal';
import SearchNavLinks from './../../components/ui/links/serach_nav_links';
import Spinner from './../../components/ui/spinner';
import InfiniteScrolling from "./../../components/ui/infinite_scrolling";
import { useHistory } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import ViewSearchBranches from './view_search_branches';


const SearchContainer = () => {
            
    // ********* UseState Variables && Functions Init - By REACT ************** //
    const [isPopUpShowState,setIsPopUpShowState] = useState(false);        
    const [profilesloading,setProfilesLoading] = useState(<Spinner/>);          
    const [profilesLength,setProfilesLength] = useState(0);      // after how many profile scroll action will append each time.
    const [profilesPerPage] = useState(4);                       // how much profiles to fetch each http request from api(max number each time).    
    const [searchStartPoint,setSearchStartPoint] = useState(0);  // starting point of user not connected collection db to the site to fetch.
    const [lastUserConnIndex,setLastUserConnIndex] = useState(1); // starting point of user connected collection db to the site to fetch.
    
    const [shouldFetch, setShouldFetch] = useState(false) // Set this to true if you want to fetch on initial render             
    // ********* UseState Variables && Functions Init - By REACT ************** //
    
    // ********* UseHistory Variables Init - By React-Router-Dom ************** //
    const history = useHistory();
    // ********* UseHistory Variables Init - By React-Router-Dom ************** //

    // ********* UseDispatch Variables && UseSelector Init - By React-Redux ************** //
    const currUser = useSelector(state => state.user);
    const profiles = useSelector(state => state.profiles);
    const dispatch = useDispatch();
    // ********* UseDispatch Variables && UseSelector Init - By React-Redux ************** //

    let {list} = profiles;
        
    useEffect( ()=> {
        dispatch(authenticationTokenToEnterPage(currUser,history));        
    },[]);
    

    useEffect(()=> {
        restoreStatesToDefault();  // reset states+list  --> the variables changed before the the fetch       
        setShouldFetch(true);
    },[history.location.pathname]);
    
        
    useEffect(() => {
        if(shouldFetch){
            setShouldFetch(false);
            getProfilesMatchingPage(); // init profiles
        }
    },[shouldFetch]);

    // useEffect(()=>{

    // },[profiles]);

    
    const getSearchProfilesParmsInObj = () => {
        const parmsObj = {};
        if(currUser.loginObj){            
            parmsObj['isMale'] = !currUser.loginObj.data.isMale;
            parmsObj['profilesPerPage'] = profilesPerPage;           
            parmsObj['searchStartPoint'] = searchStartPoint;
            parmsObj['lastUserConnIndex'] = lastUserConnIndex;            
            parmsObj['allProfiles'] = list;
            //console.log('parmsObj',parmsObj);
        }
        return parmsObj;
    }

    const restoreStatesToDefault = () => {               

        dispatch(deleteAllProfilesFromList());
        console.log('restoreStatesToDefault : ',profiles);
        setSearchStartPoint(0);
        setLastUserConnIndex(1);                            
        setProfilesLength(0);
        // console.log('in the reset : lastUserConnIndex', lastUserConnIndex);
        // console.log('in the reset : setSearchStartPoint',searchStartPoint);
        // console.log('in the reset : profilesPerPage',profilesPerPage);
        // console.log('in the reset : profilesLength',profilesLength);
        // console.log('***********************************************');           
    }
                             
    const getProfilesMatchingPage = () => {
        //console.log('in getProfilesMatchingPage func',profiles);
        //console.log('Main Program : ',profiles);
        switch(history.location.pathname){
            case '/search/online':                              
                dispatch(getProfilesOnline(getSearchProfilesParmsInObj(),setProfilesLoading,setLastUserConnIndex,setProfilesLength));
                break;            
            case '/search/pics':
                dispatch(getProfilesOnlyWithPics(getSearchProfilesParmsInObj(),setProfilesLoading,setLastUserConnIndex,setSearchStartPoint,setProfilesLength));  
                break;
            case '/search/recently':
                dispatch(getProfilesRecentlyVisited(getSearchProfilesParmsInObj(),setProfilesLoading,setLastUserConnIndex,setSearchStartPoint,setProfilesLength));  
                break;
            case '/search/news':
                dispatch(getProfilesNewUsersRegistered(getSearchProfilesParmsInObj(),setProfilesLoading,setLastUserConnIndex,setSearchStartPoint,setProfilesLength));        
        }
    }

    //console.log('Main Program : ',profiles);
        
    return (
            <div>
                <SearchNavLinks/>   

                <div className="profiles_list d-flex flex-column align-items-center">                
                    {Object.keys(list).length !=0?
                        <div>
                            <ViewSearchBranches dispatch={dispatch}
                                                history={history}
                                                setProfilesLoading={setProfilesLoading}
                                                setIsPopUpShowState={setIsPopUpShowState}
                                                setSearchStartPoint={setSearchStartPoint}
                                                setLastUserConnIndex={setLastUserConnIndex}
                                                shouldFetch={shouldFetch}
                            />

                            <InfiniteScrolling profilesLength={profilesLength}
                                               setProfilesLoading={setProfilesLoading}  
                                               profiles={profiles.list}
                                               profilesloading={profilesloading}
                                               getProfilesMatchingPage={getProfilesMatchingPage}
                                                                                                                                         
                            />
                        </div>
                        :<p className="output_no_profiles_message">"! אין משתמשים להצגה"</p>
                    }
                </div>
                                
                {(isPopUpShowState)?<PopupModal isPopUpShowState={isPopUpShowState}
                                                setIsPopUpShowState={setIsPopUpShowState}
                                                dispatch={dispatch}
                                    />
                :null}
            </div>
    )                                                   
}

export default SearchContainer;