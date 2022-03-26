/* eslint-disable */
import React from 'react';
import Profile from '../Profile/profile';

const Profiles =({
  profiles,
  setIsPopUpShowState,
  mailboxModeState,
  viewsModeState,
  likesModeState,
  favoritesModeState,
  dispatch
}) => {
      
  return Object.keys(profiles).map((profile,index) => {                        
    return(
            <Profile key={index}
                     profile={profiles[profile]}
                     setIsPopUpShowState={setIsPopUpShowState}
                     mailboxModeState={mailboxModeState}
                     viewsModeState={viewsModeState}
                     likesModeState={likesModeState}
                     favoritesModeState={favoritesModeState}
                     dispatch={dispatch}
            /> 
          )                        
  })                                                              
}

export default Profiles;