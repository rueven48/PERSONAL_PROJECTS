/* eslint-disable */
import React, { useEffect,useState } from 'react';
import { getAllProfilesOfOneGender,authenticationTokenToEnterPage,changeUserStatisticsHandler,changeUserEventsHandler,changeSpecificUserToOnline,
         changeSpecificUserToOffline,plusOneToCounterUserMessgReceived,plusOneToCounterUserDoLike,plusOneCounterUserDoFavorite,plusOneToCounterUserBeLiked,
         plusOneToCounterUserBeFavorited,plusOneToCounterUserViewer,plusOneToCounterUserBeViewed,getAllUserStatisticsOnBoard,addNewMessagesReceived,addNewViewsReceived,addNewLikesReceived,addNewFavoritesReceived} from './../../actions';
import { Modal,Button } from 'react-bootstrap';
import PopUpModal from '../../components/PopupModal/popup_modal';
import Spinner from './../../components/ui/spinner';
import { useHistory } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import Profiles from '../../components/Profiles/profiles';
import InfiniteScrolling from '../../components/ui/infinite_scrolling';


const MainContainer = () => {
  
  // ********* UseState Variables && Functions Init - By REACT ************** //
  const [isPopUpShowState,setIsPopUpShowState] = useState(false);
  const [mailboxModeState] = useState(false);
  const [viewsModeState] = useState(false);
  const [likesModeState] = useState(false);
  const [favoritesModeState] = useState(false);
  const [profilesloading,setProfilesLoading] = useState(<Spinner/>);      
  
  const [profilesPerPage] = useState(4); // how much profiles to fetch each http request from api (max number each time).      
  const [profilesLength,setProfilesLength] = useState(0); // after how many profile scroll action will append each time.  
  const [searchStartPoint,setSearchStartPoint] = useState(0); // starting point of user not connected collection db to the site to fetch.
  const [lastUserConnIndex,setLastUserConnIndex] = useState(1); // starting point of user connected collection db to the site to fetch.      
  // ********* UseState Variables && Functions Init - By REACT ************** //

  // ********* UseHistory Variables Init - By React-Router-Dom ************** //
  const history = useHistory();
  // ********* UseHistory Variables Init - By React-Router-Dom ************** //
      
  // ********* UseDispatch && UseSelector Variables Init - By React-Redux ************** //
  const dispatch = useDispatch();
  const currUser = useSelector(state => state.user);
  const profiles = useSelector(state => state.profiles); 
  const statistics = useSelector(state => state.statistics);
  // ********* UseDispatch  && UseSelector Variables Init - By React-Redux ************** //
       

  useEffect( ()=> {    
    dispatch(authenticationTokenToEnterPage(currUser,history));      
    checkInitProfiles();
    checkInitStatistics();           
  },[]);
  
        
  useEffect( ()=> {    
    if(Object.keys(statistics).length !== 0 && currUser.isUserEvents){    
      setEventsToUserConnectivity();
      dispatch(changeUserEventsHandler());      
    }                  
  },[Object.keys(statistics).length]);


  useEffect( ()=> { // i want to have acsess to the props scope and in boolean init it doesnt have
    if(profiles.list)
      listenToDisconnectUserEvent();
  },[profiles]);

  const checkInitProfiles = () => {
    if (Object.keys(currUser).length != 0 && history.location.pathname == '/main') 
      getProfilesMatchingPage();
  }

  const checkInitStatistics = () => {
    if (Object.keys(currUser).length != 0 && currUser.isUserStatistics) {      
      initStatistics();  // render Statistics plus events only once when init main      
      dispatch(changeUserStatisticsHandler());      
    }
  }
    
  const setEventsToUserConnectivity = () => {        
    listenToSwitchUserToOnlineEvent();      
    launchSwitchUserToOnlineEvent();       
    launchAddUserEvent();                                              
    listenToPlusOneCounterUserDoLike();
    listenToPlusOneCounterUserBeLiked();
    listenToPlusOneCounterUserDoFavorite();
    listenToPlusOneCounterUserBeFavorited();
    listenToPlusOneCounterUserViewer();
    listenToPlusOneCounterUserBeViewed();
    listenToPlusOneCounterUserMessgReceived();   
  }

  const launchSwitchUserToOnlineEvent = () => {
    const {data} = currUser.loginObj;
    let userConn = {};
    setUserConnObj(data,userConn);
    currUser.socket_server.emit('switch_user_to_online',userConn);
  }

  const setUserConnObj = (data,userConn) => {    
    userConn.userId = data._id;
    userConn.userName = data.userName;
    userConn.lastEntrance = data.lastEntrance;
    userConn.registerDate = data.registerDate;
    userConn.dateOfBirth = data.dateOfBirth;
    userConn.isMale = data.isMale;
    userConn.picture = data.picture;    
  }
  
  const launchAddUserEvent = () => {
    const {data} = currUser.loginObj;   
    currUser.socket_server.emit('user_connect',data._id);
  } 

  
  const listenToSwitchUserToOnlineEvent = () => {
    currUser.socket_server.on('switch_user_to_online',(userObj) => {                    
      if(history.location.pathname == '/main' && profiles.list[userObj.userId] ){
        switchUserToOnlineMainPage(userObj.userId);        
        setSearchStartPoint(prevSearchStartPoint => prevSearchStartPoint-1); // if he already decrement lastStartPoint to make collection search right position        
        setLastUserConnIndex(++userObj.userConnIndex);
      }                                                                              
    });
  }


  const switchUserToOnlineMainPage = (userId) => {                     
    dispatch(changeSpecificUserToOnline(profiles.list,userId));                     
  }  


  const listenToDisconnectUserEvent = () => {
    currUser.socket_server.on('user_disconnect',(userId) => {     
      if(history.location.pathname == '/main' && profiles.list[userId] ){
        switchUserToOfflineMainPage(userId);
      }                            
    });    
  }
   
  
  const switchUserToOfflineMainPage = (userId) => {  
    dispatch(changeSpecificUserToOffline(profiles.list,userId));    
  }
              
  
  const listenToPlusOneCounterUserDoLike = () => { 
    currUser.socket_server.on('plus_one_counter_likes_toDoLike',() => {
      let {counter} = statistics.sumLikesToOtherProfiles;
      dispatch(plusOneToCounterUserDoLike(counter));
    })
  }

  const listenToPlusOneCounterUserBeLiked = () => { 
    currUser.socket_server.on('plus_one_counter_likes_toBeLiked',(data) => {
      let {counter} = statistics.sumLikesToMyProfile;
      dispatch(plusOneToCounterUserBeLiked(counter));
      if(history.location.pathname == '/main') // dont wont double add event --> mainCon+liked-me page
        dispatch(addNewLikesReceived(data,statistics.newLikesReceived));                  
    })
  }

  const listenToPlusOneCounterUserDoFavorite = () => {      
    currUser.socket_server.on('plus_one_counter_favorites_toDoFavorite',() => {
      let {counter} = statistics.sumFavoritesToOtherProfiles;
      dispatch(plusOneCounterUserDoFavorite(counter));
    })
  }

  const listenToPlusOneCounterUserBeFavorited = () => {  
    currUser.socket_server.on('plus_one_counter_favorites_toBeFavorited',(data) => {
      let {counter} = statistics.sumFavoritesToMyProfile;
      dispatch(plusOneToCounterUserBeFavorited(counter)); 
      if(history.location.pathname == '/main') // dont wont double add event --> mainCon+favorite-others page
        dispatch(addNewFavoritesReceived(data,statistics.newFavoritesReceived));
    })
  }

  
  const listenToPlusOneCounterUserViewer = () => {  
    currUser.socket_server.on('plus_one_counter_views_toViewer',() => {
      let {counter} = statistics.sumViewsToOtherProfiles;
      dispatch(plusOneToCounterUserViewer(counter));
    })
  }


  const listenToPlusOneCounterUserBeViewed = () => {  
    currUser.socket_server.on('plus_one_counter_views_toBeViewed',(data) => {
      let {counter} = statistics.sumViewsToMyProfile;
      dispatch(plusOneToCounterUserBeViewed(counter));
      dispatch(addNewViewsReceived(data,statistics.newViewsReceived));     
    })
  }


  const listenToPlusOneCounterUserMessgReceived = () => {
    currUser.socket_server.on('plus_one_to_counter_user_messg_received',(data) => { 
      let {counter} = statistics.sumMessagesReceived;
      dispatch(plusOneToCounterUserMessgReceived(counter));
      dispatch(addNewMessagesReceived(data,statistics.newMessagesReceived));                                         
    });
  }
  
  
  const getAllProfilesParmsInObj = () => {
    const parmsObj = {};
    parmsObj['isMale'] = !currUser.loginObj.data.isMale;
    parmsObj['profilesPerPage'] = profilesPerPage;
    parmsObj['searchStartPoint'] = searchStartPoint;
    parmsObj['lastUserConnIndex'] = lastUserConnIndex;
    parmsObj['allProfiles'] = profiles.list;    
    return parmsObj;
  }


  const getProfilesMatchingPage = () => {    
    dispatch(getAllProfilesOfOneGender(getAllProfilesParmsInObj(),setProfilesLoading,setLastUserConnIndex,setSearchStartPoint,setProfilesLength));
  }
  

  const initStatistics = () => {            
    dispatch(getAllUserStatisticsOnBoard(currUser.loginObj.data._id));      
  }
  
  //console.log('main page',profiles);

  return (
          <div className="App">
                      
              <div className="profiles_list d-flex flex-column align-items-center">                                                 
                                    
                {(profiles.list)?  
                  <div>
                    <Profiles profiles={profiles.list}
                              setIsPopUpShowState={setIsPopUpShowState}
                              mailboxModeState={mailboxModeState}
                              viewsModeState={viewsModeState}
                              likesModeState={likesModeState}
                              favoritesModeState={favoritesModeState}
                              dispatch={dispatch}
                    />

                    <InfiniteScrolling  profilesLength={profilesLength}
                                        setProfilesLoading={setProfilesLoading}
                                        profiles={profiles.list}
                                        profilesloading={profilesloading}
                                        getProfilesMatchingPage={getProfilesMatchingPage}
                    />
                  </div>                  
                  :
                  null
                }

                
                {(isPopUpShowState)?
                <PopUpModal isPopUpShowState={isPopUpShowState}
                            setIsPopUpShowState={setIsPopUpShowState}
                            dispatch={dispatch}
                />
                :
                null}                                                                                 
              </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
          </div>
  );
      
}

export default MainContainer;


