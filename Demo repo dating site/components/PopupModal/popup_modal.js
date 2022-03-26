/* eslint-disable */
import React, {useEffect} from 'react';
import ViewModal from './view_modal';
import { getAllMessagesBetweenUsers,profileIsClicked,deleteNewViewFromStatisticsArr,deleteNewLikeFromStatisticsArr,deleteNewFavoriteFromStatisticsArr} from '../../actions';
import { useSelector } from 'react-redux';
import { parseDateWithMoment } from './../../config';

 const popupModal = ({isPopUpShowState,setIsPopUpShowState,dispatch}) => {
                      
    // ********* UseSelector Init - By React-Redux ************** //
    const currUser = useSelector(state => state.user);
    const profileObj = useSelector(state => state.profileObj);    
    const messages = useSelector(state => state.messages);    
    const statistics = useSelector(state => state.statistics);
    // ********* UseSelector Init - By React-Redux ************** //
       
    const {_id} = currUser.loginObj.data;            
    const {userId} = profileObj.info; 
    const {info} = profileObj;                                                
    
    let messageLength = (messages.list!==undefined && Object.keys(messages.list).length>0) ? Object.keys(messages.list).length:0;
   
    let dialogStyle = document.getElementsByClassName('modal-dialog')[0];
    
    if(dialogStyle!==undefined)
      dialogStyle.style.height = `calc(60vh + ${messageLength} * (11vh) )`; // clac each mesg in body conatiner to resize dialog modal, if none the mesg length - return zero
    
        
    useEffect(() => {   
      if(Object.keys(messages)){
        dispatch(getAllMessagesBetweenUsers(_id,userId));  // change props 1 time
        currUser.socket_server.emit('register', {fromUserId: _id, toUserId: userId}); 
        dispatch(profileIsClicked(currUser.socket_server,userId,_id));
      }             
    },[]);

    useEffect(()=>{         
      if(statistics.newViewsReceived.length !==0 ) // must work on sender and reciever - there know way to know if other didnt view u, and u want to changed to viewed - must work in any render.
       dispatch(deleteNewViewFromStatisticsArr(info.userId,statistics.newViewsReceived));
      
      if(statistics.newLikesReceived.length !==0) // must work on sender and reciever 
       dispatch(deleteNewLikeFromStatisticsArr(info.userId,statistics.newLikesReceived));

      if(statistics.newFavoritesReceived.length !==0) // must work on sender and reciever 
       dispatch(deleteNewFavoriteFromStatisticsArr(info.userId,statistics.newFavoritesReceived)); 
      
    },[statistics.newViewsReceived,statistics.newLikesReceived,statistics.newFavoritesReceived]);

    
    const genderAndIsSmokeRender = () => {      
      if (info.isMale) // male         
       return showIsMaleSmoker();     
      else  // woman
       return showIsWomanSmoker();        
    }  

    const showIsMaleSmoker = () => {
      if (info.isSmoke) 
        return "מעשן";
      else 
        return "לא מעשן";      
    }

    const showIsWomanSmoker = () => {
      if (info.isSmoke)         
        return "מעשנת";
      else 
        return "לא מעשנת";     
    }
          
    //console.log('here popup modal !!!',info);
    return (
        <div>                     
            <ViewModal isPopUpShowState={isPopUpShowState}
                       currUser={currUser}
                       setIsPopUpShowState = {setIsPopUpShowState}
                       info = {info} 
                       isProfileSmoke = {genderAndIsSmokeRender()}
                       lastEntranceDate = {parseDateWithMoment(info.lastEntrance)}
                       dispatch={dispatch}
            />  
        </div>        
      
    )        
  
}

export default popupModal;