import axios from 'axios';
import {GET_PROFILES,LOGIN,REGISTER,IS_USER_AUTHENTICATE_TO_ENTER,STORE_REG_FORM_DATA,CONNECT_SOCKET_SERVER,GET_MESSAGES_BETWEEN_USERS,AUTHENTICATE_TOKEN,RESET_CURR_PROFILES,ADD_PROFILE_TO_LIST,RESET_RESPONSE_OBJ,
        GET_PROFILES_OF_MSGS_RECEIVED,OPEN_POP_UP_PROFILE,DELETE_NEW_MESSAGE_FROM_STATISTICS_ARR,ADD_NEW_FAVORITES_RECIEVED,
        CLOSE_UP_POP_UP_PROFILE,ADD_MESSAGE_TO_ARR,ADD_NEW_MESSAGES_RECIEVED,TURN_OFF_INDICATOR_NEW_MSG_OF_PROFILE,ADD_NEW_VIEWS_RECEIVED,
        LIKED_IS_CLICKED,FAVORITE_IS_CLICKED,PROFILE_IS_CLICKED,CHANGE_MESSAGE_STATUS_TO_READ,DELETE_NEW_VIEW_FROM_STATISTICS_ARR,DELETE_NEW_FAVORITE_FROM_STATISTICS_ARR,
        GET_PROFILES_OF_MSGS_SENDED,GET_PROFILES_OF_VIEWS_ME,ADD_NEW_LIKES_RECIEVED,DELETE_NEW_LIKE_FROM_STATISTICS_ARR,GET_PROFILES_ONLY_WITH_PICS,
        GET_PROFILES_OF_ME_VIEWED_OTHERS,GET_PROFILES_OF_LIKES_ME,GET_PROFILES_OF_ME_LIKED_OTHERS,GET_PROFILES_OF_FAVORITES_ME,GET_PROFILES_ONLINE,
        GET_PROFILES_OF_ME_FAVORITED_OTHERS,INIT_USER_STATISTICS_HANDLER,CHANGE_USER_STATISTICS_HANDLER,INIT_USER_EVENTS_HANDLER,CHANGE_USER_EVENTS_HANDLER,
        CHANGE_SPECIFIC_USER_TO_ONLINE,CHANGE_SPECIFIC_USER_TO_OFFLINE,DELETE_PROFILE_FROM_LIST,DELETE_ALL_PROFILES_FROM_LIST,RESET_CURR_VIEW,PLUS_ONE_TO_COUNTER_USER_MESSG_SEND,
        PLUS_ONE_TO_COUNTER_USER_MESSG_RECEIVED,PLUS_ONE_TO_COUNTER_USER_DO_LIKE,PLUS_ONE_TO_COUNTER_USER_BE_LIKED,PLUS_ONE_TO_COUNTER_USER_DO_FAVORITE,GET_PROFILES_NEW_USERS_REGISTERED,
        PLUS_ONE_TO_COUNTER_USER_BE_FAVORITED,PLUS_ONE_TO_COUNTER_USER_BE_VIEWED,PLUS_ONE_TO_COUNTER_USER_VIEWER,GET_ALL_USER_STATISTICS_ON_BOARD,GET_ONE_PROFILE,GET_PROFILES_RECENTLY_VISITED
        ,PUT_MESSAGES_CHANGE_TO_DELETED,DELETE_ALL_MESSAGES_BETWEEN_TWO_USERS} from './types';

import sha256 from 'crypto-js/sha256';
import * as io from 'socket.io-client';
import {createDate} from '../config';

// must change url + socket connection url
const URL = `https://dating-site-fairy-tale.herokuapp.com/api`; // DEPLOY URL
//const LOCAL_URL = `http://localhost:6001/api`; // LOCAL URL
//const URL = `http://localhost:6001/api`;

export async function getAllProfilesOfOneGender(parmsObj,setProfilesLoading,setLastUserConnIndex,setSearchStartPoint,setProfilesLength){
    
    let {isMale,profilesPerPage,searchStartPoint,lastUserConnIndex} = parmsObj; // (only dont destruct allProfiles because i need the ref pointer).   
    const list =  await axios.get(`${URL}/profiles/gender?isMale=${isMale}&profilesPerPage=${profilesPerPage}&searchStartPoint=${searchStartPoint}&lastUserConnIndex=${lastUserConnIndex}`)
                  .then( res => {                                                                                        
                    setPageCoordinates(setLastUserConnIndex,setSearchStartPoint,res.headers['coordinates-per-page']);                                                                                                                                                                
                    return res.data;
                  });
    isLastProfileFromListNotOnline(parmsObj,list);   // check it later...                                                                                                                         
    updateProfilesLengthAndSpinner(setProfilesLength,setProfilesLoading,profilesPerPage);      
    
    return {
        type: GET_PROFILES,
        payload: {...parmsObj["allProfiles"],...list}
    }
}


/**
@function setPageCoordinates - set the pages search and last index conn into state hooks, before i change it to object --> because i sned it as a string inside headers.
Note: there are 3 reasons for that:
1. case that there is only connected --> i want to increment just conn index(sever side) --> i want to sent hook state only if i got conn index(client side).
2. case that there is  no one connected --> i want to increment just search start point(sever side)--> i want to sent hook state only if i got start point(client side).
3. case that there are both i want to --> i want to increment them both(sever side)--> i want to sent hooks states only if i got both(client side).
@param setLastUserConnIndex --> last user index after server increment it to be ready to search connected users from this point and so on.
@param setSearchStartPoint --> last search start point after server increment it to be ready to search Not-connected users from this point and so on.
@param coordinatesString - that a string i am going to parse to obj (in get i can catch it only as a string, and iont want to insert it to profiles because that not best practice).
**/
export function setPageCoordinates(setLastUserConnIndex,setSearchStartPoint,coordinatesString){    
    let coordinatesPerPage = parseCoordinatesPerPage(coordinatesString);        
    if(coordinatesPerPage['lastUserConnIndex'])
        setSearchStartPoint(coordinatesPerPage['searchStartPoint']);    
    if(coordinatesPerPage['lastUserConnIndex'])
        setLastUserConnIndex(coordinatesPerPage['lastUserConnIndex']);
}


export function parseCoordinatesPerPage(coordinatesString){                            
    coordinatesString.substr(1,coordinatesString.length -2);                        
    return JSON.parse(coordinatesString);                 
}


export function updateAllProfilesAndSpinner(parmsObj,list,setAllProfiles,setProfilesLoading){
    setAllProfiles({...parmsObj["allProfiles"],...list}); // update all list in state --> i want to know total profiles number from DB. 
    setProfilesLoading(null); // mean data recived from DB
}

export function updateProfilesLengthAndSpinner(setProfilesLength,setProfilesLoading,profilesPerPage){
    
    setProfilesLength(prevProfilesLength => prevProfilesLength+profilesPerPage);                        
    setProfilesLoading(null); // mean data recived from DB, stop spinner.
}


export  function isLastProfileFromListNotOnline(parmsObj,list){ // if the last one is not connected then check in the new fetch is there users connected --> if there are push them into the top of list.    
    //console.log('check :',parmsObj);
    if( parmsObj["searchStartPoint"] !==0 && parmsObj.allProfiles.list && parmsObj.allProfiles[Object.keys(parmsObj.allProfiles)[Object.keys(parmsObj.allProfiles).length - 1]].isOnline === false ){ //TODO: could be second round with users conn, sort it.
        let user = {};
        for (let key in list) {           
            if(list[key].isOnline === true){                               
                user[key] = list[key];
                parmsObj["allProfiles"] = {...user,...parmsObj["allProfiles"]};  // insert to the old one                
                delete list[key]; // delete it. so it want be twice because we do destruct later.
            }
        }
    }
}


export async function getOneProfile(fromUserId,toUserId,pathname,profiles){
        
    const request =  await axios.get(`${URL}/profile?fromUserId=${fromUserId}&toUserId=${toUserId}&pathname=${pathname}`)
                     .then( response => response.data);                                  
    profiles[fromUserId] = request;

    return {
            type: GET_ONE_PROFILE,
            payload: profiles
    }                                                                  
}


export async function getLogin(loginUser){    
    const request = await axios.get(`${URL}/login`,createObjUserLogin(loginUser))    
                    .then(resp => resp)                                                                         
                    .catch(error => error.response);           
    return {
        type: LOGIN,
        payload: request
    }                               
}

function createObjUserLogin(loginUser){                  
    let userObj = {};
    setHeadersObj(userObj,loginUser);
    userObj['observe'] = "response";
    return userObj;           
}

function setHeadersObj(userObj,loginUser){
    const hashPassword = sha256(loginUser.password);
    let headersObj = {};
    headersObj['xx-auth'] = `${hashPassword}${loginUser.userName}`;
    headersObj['lastEntrance'] = createDate();
    userObj['headers'] = headersObj;
}

export function getRegister(newUser){             
    
    setRegisterUser(newUser);
    const request = axios.post(`${URL}/user/register`,newUser,{observe: 'response'})
                    .then(resp => resp)
                    .catch(error => error.response);                
    return {
        type: REGISTER,
        payload: request
    }                              
}

function setRegisterUser(newUser){
    newUser.password = `${sha256(newUser.password)}`; //code it to save it encrypt in DB
    newUser.lastEntrance = createDate();
    newUser.registerDate = newUser.lastEntrance;
    newUser.isAdmin = false;
}

export function isUserAuthenticate(currUser,setError,history,dispatch){             
    
    if(currUser.loginObj){        
        const {status} = currUser.loginObj;  
        if(status === 200 || status === 201 )                        
           connectToSocketAndInitHandlers(dispatch,history);                             
        else
           showErrorServer(currUser,setError);                                                                               
    }
    return {
        type: IS_USER_AUTHENTICATE_TO_ENTER,
        payload: {}
    }                              
}

function showErrorServer(currUser,setError){
    
    const serverFormError = {type:"server", message: currUser.loginObj.data.error};                        
    if(currUser.loginObj.config.method === "get") // the error was made by user visit login page.
        setError('password', serverFormError);
    else // the error was made by user visit register page.
        setError('relationshipStatus', serverFormError);
}

function connectToSocketAndInitHandlers(dispatch,history){
    
    dispatch(conectToSocketServer());             
    dispatch(initUserStatisticsHandler());
    dispatch(initUserEventsHandler());
    history.push('/main'); // enter main page after connection sucsess.
}


export function storeRegFormData(formRegData){         
      
    return {
        type: STORE_REG_FORM_DATA,
        payload: formRegData
    }                              
}


export function conectToSocketServer(){       
    
    // server side connect --> 'https://dating-site-fairy-tale.herokuapp.com'
    // client side connect -->  'http://localhost:6001'
    //let socket = io.connect('http://localhost:6001');
    let socket = io.connect('https://dating-site-fairy-tale.herokuapp.com');    
    
    return {
        type: CONNECT_SOCKET_SERVER,
        payload: socket
    }
}

export function initUserStatisticsHandler(){       
    
    let isUserStatistics = true;     
    
    return {
        type: INIT_USER_STATISTICS_HANDLER,
        payload: isUserStatistics
    }
}

export function changeUserStatisticsHandler(){       
    
    let isUserStatistics = false;     
    
    return {
        type: CHANGE_USER_STATISTICS_HANDLER,
        payload: isUserStatistics
    }
}

export function initUserEventsHandler(){       
    
    let isUserEvents = true;     
    
    return {
        type: INIT_USER_EVENTS_HANDLER,
        payload: isUserEvents
    }
}

export function changeUserEventsHandler(){       
    
    let isUserEvents = false;     
    
    return {
        type: CHANGE_USER_EVENTS_HANDLER,
        payload: isUserEvents
    }
}

export function plusOneToCounterUserMessgSend(prev_counter){       
        
    let counter = ++prev_counter;                           
    
    return {
        type: PLUS_ONE_TO_COUNTER_USER_MESSG_SEND,
        payload: counter
    }
}

export function plusOneToCounterUserMessgReceived(prev_counter){       
        
    let counter = ++prev_counter;                           
    
    return {
        type: PLUS_ONE_TO_COUNTER_USER_MESSG_RECEIVED,
        payload: counter
    }
}

export function addNewMessagesReceived(newMessage,newMessagesArr){       
    
    newMessagesArr.push(newMessage);
    
    return {
        type: ADD_NEW_MESSAGES_RECIEVED,
        payload: newMessagesArr
    }
}

export function addNewViewsReceived(newView,newViewsArr){       
        
    newViewsArr.push(newView);
    
    return {
        type: ADD_NEW_VIEWS_RECEIVED,
        payload: newViewsArr
    }
}

export  function addNewLikesReceived(newLike,newLikesArr){       
    console.log('here !');    
    newLikesArr.push(newLike);
    
    return {
        type: ADD_NEW_LIKES_RECIEVED,
        payload: newLikesArr
    }
}

export function addNewFavoritesReceived(newFavorite,newFavoritesArr){       
        
    newFavoritesArr.push(newFavorite);
    
    return {
        type: ADD_NEW_FAVORITES_RECIEVED,
        payload: newFavoritesArr
    }
}

export function plusOneToCounterUserDoLike(prev_counter){   

    let counter = ++prev_counter;

    return {
        type: PLUS_ONE_TO_COUNTER_USER_DO_LIKE,
        payload: counter
    }
}    

export function plusOneToCounterUserBeLiked(prev_counter){   

    let counter = ++prev_counter;

    return {
        type: PLUS_ONE_TO_COUNTER_USER_BE_LIKED,
        payload: counter
    }
}

export function plusOneCounterUserDoFavorite(prev_counter){   
    let counter = ++prev_counter;

    return {
        type: PLUS_ONE_TO_COUNTER_USER_DO_FAVORITE,
        payload: counter
    }
}    

export function plusOneToCounterUserBeFavorited(prev_counter){   

    let counter = ++prev_counter;

    return {
        type: PLUS_ONE_TO_COUNTER_USER_BE_FAVORITED,
        payload: counter
    }
}

export function plusOneToCounterUserViewer(prev_counter){   

    let counter = ++prev_counter;

    return {
        type: PLUS_ONE_TO_COUNTER_USER_VIEWER,
        payload: counter
    }
}

export function plusOneToCounterUserBeViewed(prev_counter){   

    let counter = ++prev_counter;

    return {
        type: PLUS_ONE_TO_COUNTER_USER_BE_VIEWED,
        payload: counter
    }
}

export function getAllUserStatisticsOnBoard(userId){           
    
    const request =  axios.get(`${URL}/profiles/statistics?userId=${userId}`)
                    .then(response => response.data);   
                                                 
    return {
        type: GET_ALL_USER_STATISTICS_ON_BOARD,
        payload: request
    }
}


export function resetResponseAndGoHomePage(history){
    resetResponseObj(); // clean response so props form will do check when response = {};
    history.push('/');
}

export function authenticationTokenToEnterPage(currUser,history){    
      
    if (currUser.loginObj && currUser.loginObj.headers['xx-auth'] === undefined)                         
            resetResponseAndGoHomePage(history);    
    
    if(currUser.loginObj === undefined)  
        resetResponseAndGoHomePage(history);

    //TODO: OR NO NEED TWO OF THEM    
           
    return {
        type: AUTHENTICATE_TOKEN,
        payload: {}
    }
}


export function resetResponseObj(){                         
    return {
        type: RESET_RESPONSE_OBJ,
        payload: {}
    }
}


export  function getProfilesOfMessagesReceived(toUserId){    
    
    const request =  axios.get(`${URL}/profiles/messages/received?toUserId=${toUserId}`)
                    .then(response => response.data);                                  
                   
    return {
        type: GET_PROFILES_OF_MSGS_RECEIVED,
        payload: request
    }
}

export function getProfilesOfMessagesSended(fromUserId){    
    
    const request = axios.get(`${URL}/profiles/messages/sended?fromUserId=${fromUserId}`)
                    .then(response => response.data);                                         
    return {
        type: GET_PROFILES_OF_MSGS_SENDED,
        payload: request
    }
}

export function openPopUpProfile(profileItem,setIsPopUpShowState) {
            
    setIsPopUpShowState(true);        
    let profileObj = {};   
    profileObj.info = profileItem;

    return {
        type: OPEN_POP_UP_PROFILE,
        payload: profileObj
    }
}

export function closePopUpProfile(currUser,setIsPopUpShowState) {
    
    resetCurrView(); // clear the view props obj so every second click will be without the first value obj when view profile for create view or update.    
    currUser.socket_server.emit('unregister',currUser.loginObj.data._id);   
    setIsPopUpShowState(false);

    return {
        type: CLOSE_UP_POP_UP_PROFILE,
        payload: {}
    }
}

export function getAllMessagesBetweenUsers(fromUserId,toUserId){           
    
    const request =  axios.get(`${URL}/messages/users?fromUserId=${fromUserId}&toUserId=${toUserId}`)
                    .then(response => response.data);   
                                                 
    return {
        type: GET_MESSAGES_BETWEEN_USERS,
        payload: request
    }
}

export function addMessageToArray(dataMessage,arr) {
   
    let found = true;
    
    for (let i = 0; i < arr.length; i++) {      
        if(arr[i].messageIndex === dataMessage.messageIndex){
            found = false;
            break;
        } 
    }

    if(found)  // if message index is repeating itself its the same message and dont put it in the arr and move on.
        arr.push(dataMessage); 
             
    return {
        type: ADD_MESSAGE_TO_ARR,
        payload: arr
    }
}

export function likeIsClicked(socket,toDoLikeUserId,toBeLikedUserId) {
    
    const dataLike = {};
    dataLike.toBeLikedUserId = toBeLikedUserId;
    dataLike.toDoLikeUserId = toDoLikeUserId;
    dataLike.date = createDate();
    socket.emit('likeIsClicked',dataLike);
                                                  
    return {
        type: LIKED_IS_CLICKED,
        payload: {}
    }
}

export function favoriteIsClicked(socket,toDoFavorUserId,toBeFavoredUserId) {
    
    const dataFavorite = {};
    dataFavorite.toBeFavoredUserId = toBeFavoredUserId;
    dataFavorite.toDoFavorUserId = toDoFavorUserId;
    dataFavorite.date = createDate();
    socket.emit('favoriteIsClicked',dataFavorite);
       
    return {
        type: FAVORITE_IS_CLICKED,
        payload: {}
    }
}

export function profileIsClicked(socket,toBeViewedUserId,viewerUserId){       
           
    const dataView = {};
    dataView.toBeViewedUserId = toBeViewedUserId;
    dataView.viewerUserId = viewerUserId;
    dataView.date = createDate();
    socket.emit('profileIsClicked',dataView);

    return {
        type: PROFILE_IS_CLICKED,
        payload: {}
    }
}

// for now dont delete it
export function resetCurrView(){                         
    return {
        type: RESET_CURR_VIEW,
        payload: {}
    }
}

export function getProfilesOfViewsMe(toBeViewedUserId){    
    
    const request =  axios.get(`${URL}/profiles/views/viewedMe?toBeViewedUserId=${toBeViewedUserId}`)
                    .then(response => response.data);                                  
        
    return {
        type: GET_PROFILES_OF_VIEWS_ME,
        payload: request
    }
}

export function getProfilesOfMeViewedOthers(viewerUserId){    
    
    const request =  axios.get(`${URL}/profiles/views/viewedOthers?viewerUserId=${viewerUserId}`)
                    .then(response => response.data);                                  
        
    return {
        type: GET_PROFILES_OF_ME_VIEWED_OTHERS,
        payload: request
    }
}

export  function getProfilesOfLikesMe(toBeLikedUserId){    
    
    const request =  axios.get(`${URL}/profiles/likes/likedMe?toBeLikedUserId=${toBeLikedUserId}`)
                    .then(response => response.data);                                  
        
    return {
        type: GET_PROFILES_OF_LIKES_ME,
        payload: request
    }
}

export function getProfilesOfMeLikedOthers(toDoLikeUserId){    
    
    const request =  axios.get(`${URL}/profiles/likes/likedOthers?toDoLikeUserId=${toDoLikeUserId}`)
                    .then(response => response.data);                                  
        
    return {
        type: GET_PROFILES_OF_ME_LIKED_OTHERS,
        payload: request
    }
}

export function getProfilesOfFavoritesMe(toBeFavoredUserId){    
    
    const request =  axios.get(`${URL}/profiles/favorites/favoritedMe?toBeFavoredUserId=${toBeFavoredUserId}`)
                    .then(response => response.data);                                  
        
    return {
        type: GET_PROFILES_OF_FAVORITES_ME,
        payload: request
    }
}

export function getProfilesOfMeFavoritedOthers(toDoFavorUserId){    
    
    const request =  axios.get(`${URL}/profiles/favorites/favoritedOthers?toDoFavorUserId=${toDoFavorUserId}`)
                    .then(response => response.data);                                  
        
    return {
        type: GET_PROFILES_OF_ME_FAVORITED_OTHERS,
        payload: request
    }
}


export async function getProfilesOnline(parmsObj,setProfilesLoading,setLastUserConnIndex,setProfilesLength){    
               
    let {isMale,profilesPerPage,lastUserConnIndex} = parmsObj; // (only dont destruct allProfiles because i need the ref pointer).   
    const list =  await axios.get(`${URL}/profiles/search/online?isMale=${isMale}&profilesPerPage=${profilesPerPage}&lastUserConnIndex=${lastUserConnIndex}`)
                  .then(res => {
                    if(Object.keys(res.data).length !==0) // if no users so there no need for check coordinates.
                        setSearchOnlinePageCoordinates(setLastUserConnIndex,res.headers['coordinates-per-page']);
                    return res.data;
                   });                                                      
    updateProfilesLengthAndSpinner(setProfilesLength,setProfilesLoading,profilesPerPage); 

    return {
        type: GET_PROFILES_ONLINE,
        payload: {...parmsObj["allProfiles"],...list}
    }
}


export function setSearchOnlinePageCoordinates(setLastUserConnIndex,coordinatesString){
    let coordinatesPerPage = parseCoordinatesPerPage(coordinatesString);
    setLastUserConnIndex(coordinatesPerPage['lastUserConnIndex']);
}


export async function getProfilesOnlyWithPics(parmsObj,setProfilesLoading,setLastUserConnIndex,setSearchStartPoint,setProfilesLength){    
    
    let {isMale,profilesPerPage,searchStartPoint,lastUserConnIndex} = parmsObj; // (only dont destruct searchProfiles because i need the ref pointer).   
    const list =  await axios.get(`${URL}/profiles/search/pics?isMale=${isMale}&profilesPerPage=${profilesPerPage}&searchStartPoint=${searchStartPoint}&lastUserConnIndex=${lastUserConnIndex}`)
                  .then( res => {                                                                                        
                    setPageCoordinates(setLastUserConnIndex,setSearchStartPoint,res.headers['coordinates-per-page']);                                                                                                                                            
                  return res.data;
                  });                                                                      
    isLastProfileFromListNotOnline(parmsObj,list);
    updateProfilesLengthAndSpinner(setProfilesLength,setProfilesLoading,profilesPerPage);                                      
                  
    return {
        type: GET_PROFILES_ONLY_WITH_PICS,
        payload: {...parmsObj["allProfiles"],...list}
    }            
}


export async function getProfilesRecentlyVisited(parmsObj,setProfilesLoading,setLastUserConnIndex,setSearchStartPoint,setProfilesLength){
    
    //console.log('inside func');
    //setSearchStartPoint( (x) => console.log('inside set search start point',x) );

    let {isMale,profilesPerPage,searchStartPoint,lastUserConnIndex} = parmsObj; // (only dont destruct searchProfiles because i need the ref pointer).   
    const list =  await axios.get(`${URL}/profiles/search/recently?isMale=${isMale}&profilesPerPage=${profilesPerPage}&searchStartPoint=${searchStartPoint}&lastUserConnIndex=${lastUserConnIndex}`)
                  .then( res => {                                                                                        
                    setPageCoordinates(setLastUserConnIndex,setSearchStartPoint,res.headers['coordinates-per-page']);                                                                                                                                            
                  return res.data;
                  });                                                                               
    isLastProfileFromListNotOnline(parmsObj,list);
    updateProfilesLengthAndSpinner(setProfilesLength,setProfilesLoading,profilesPerPage); 
    
    return {
        type: GET_PROFILES_RECENTLY_VISITED,
        payload: {...parmsObj["allProfiles"],...list}
    }
}


export async function getProfilesNewUsersRegistered(parmsObj,setProfilesLoading,setLastUserConnIndex,setSearchStartPoint,setProfilesLength){
    
    let {isMale,profilesPerPage,searchStartPoint,lastUserConnIndex} = parmsObj; // (only dont destruct searchProfiles because i need the ref pointer).       
    const list =  await axios.get(`${URL}/profiles/search/news?isMale=${isMale}&profilesPerPage=${profilesPerPage}&searchStartPoint=${searchStartPoint}&lastUserConnIndex=${lastUserConnIndex}`)
                  .then( res => {                                                                                        
                    setPageCoordinates(setLastUserConnIndex,setSearchStartPoint,res.headers['coordinates-per-page']);                                                                                                                                            
                  return res.data;
                  });            
    isLastProfileFromListNotOnline(parmsObj,list);
    updateProfilesLengthAndSpinner(setProfilesLength,setProfilesLoading,profilesPerPage); 

    return {
        type: GET_PROFILES_NEW_USERS_REGISTERED,
        payload: {...parmsObj["allProfiles"],...list}
    }
}


export function changeSpecificUserToOnline(profiles,userId){    

    profiles[userId].isOnline = true;
                                        
    return {
        type: CHANGE_SPECIFIC_USER_TO_ONLINE,
        payload: profiles
    }
}

export function changeSpecificUserToOffline(profiles,userId){    
        
    if(profiles[userId])
        profiles[userId].isOnline = false;
    
    return {
        type: CHANGE_SPECIFIC_USER_TO_OFFLINE,
        payload: profiles
    }
}

export function putMessageStatusToRead(messageId){
    axios.put(`${URL}/message/${messageId}`)
    .then((resp) => resp)
    .catch( error => {
        return error.response;
    });
}


export function changeNewMessageStatusToRead(messageId,messegesArr,userIdModalClicked){    

    for (let i = 0; i < messegesArr.length; i++) {               
        if( messageId && messegesArr[i].fromUserId === userIdModalClicked){                                
            putMessageStatusToRead(messageId);
            messegesArr[i].isRead = true;
            break;
        }        
    }

    return {
        type: CHANGE_MESSAGE_STATUS_TO_READ,
        payload: messegesArr
    }
}

export function deleteNewMessageFromStatisticsArr(messageId,newMessagesReceivedArr,userIdModalClicked){    

    for (let i = 0; i < newMessagesReceivedArr.length; i++) {       
        if(newMessagesReceivedArr[i].fromUserId === userIdModalClicked){
            newMessagesReceivedArr.splice(i,1); 
            break;
        }
    }
    
    return {
        type: DELETE_NEW_MESSAGE_FROM_STATISTICS_ARR,
        payload: newMessagesReceivedArr
    }
}

export function turnOffIndincatorNewMsgOfProfile(fromUserId,profiles){
     
    profiles[fromUserId].isMsgRead = 'true';
    
    return {
        type: TURN_OFF_INDICATOR_NEW_MSG_OF_PROFILE,
        payload: profiles
    }
}

export function deleteNewViewFromStatisticsArr(profileId,viewsArr){    
        
    for (let i = 0; i < viewsArr.length; i++) {
                        
        if(viewsArr[i].viewerUserId === profileId){
            
            axios.put(`${URL}/view/changeStatusToViewed/${viewsArr[i]._id}`); // change it on server side                             
            viewsArr.splice(i,1);                               
            break;
        }               
    }
    
    return {
        type: DELETE_NEW_VIEW_FROM_STATISTICS_ARR,
        payload: {}
    }
}

export function deleteNewLikeFromStatisticsArr(profileId,likesArr){    
                                      
    for (let i = 0; i < likesArr.length; i++) {
                        
        if(likesArr[i].toDoLikeUserId === profileId){
            axios.put(`${URL}/like/changeStatusToLiked/${likesArr[i]._id}`); // change it on server side                              
            likesArr.splice(i,1);                               
            break;
        }               
    }            

    return {
        type: DELETE_NEW_LIKE_FROM_STATISTICS_ARR,
        payload: {}
    }
}

export function deleteNewFavoriteFromStatisticsArr(profileId,favoritesArr){    
    
    for (let i = 0; i < favoritesArr.length; i++) {
                        
        if(favoritesArr[i].toDoFavorUserId === profileId){
            axios.put(`${URL}/favorite/changeStatusToFavorited/${favoritesArr[i]._id}`); // change it on server side                              
            favoritesArr.splice(i,1);                               
            break;
        }               
    }            

    return {
        type: DELETE_NEW_FAVORITE_FROM_STATISTICS_ARR,
        payload: {}
    }
}

export function deleteProfileFromList(profiles,userId){
                      
    if(profiles[userId])
       delete profiles[userId];

    return {
        type: DELETE_PROFILE_FROM_LIST,
        payload: profiles
    }
}


export function deleteAllProfilesFromList(){

    const profiles = {};

    return {
        type: DELETE_ALL_PROFILES_FROM_LIST,
        payload: profiles
    }
}


export function addProfileToList(profiles,newProfileObj){
            
    profiles[newProfileObj.userId] =  newProfileObj;
    
    return {
        type: ADD_PROFILE_TO_LIST,
        payload: profiles
    }
}

// for now dont need it => leave it
export function resetCurrProfiles(){                         
    const profiles = {};
    return {
        type: RESET_CURR_PROFILES,
        payload: profiles
    }
}


export function changeMessagesToDeleted(messageId,isDeletedMsgsBySender){                                 
    axios.put(`${URL}/messages/deleted?messageId=${messageId}&&isDeletedMsgsBySender=${isDeletedMsgsBySender}`); // isDeletedMsgsBySender = true is sender and false receiver    
    
    return {
        type: PUT_MESSAGES_CHANGE_TO_DELETED,
        payload: {}
    }
}


export function deleteAllMessagesBetweenTwoUsers(createArrayMsgIds){                                 
    
    //delete_messages_between_two_users

    axios.delete(`${URL}/messages/delete/both/users`,{data: [...createArrayMsgIds]});
    
    return {
        type: DELETE_ALL_MESSAGES_BETWEEN_TWO_USERS,
        payload: {}
    }
}

