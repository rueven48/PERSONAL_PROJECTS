import React from 'react';
import {openPopUpProfile,likeIsClicked,favoriteIsClicked} from './../../actions';

const ViewProfile = ({
    currUser,
    profile,
    setIsPopUpShowState,
    dispatch,
    signInfo,
    showSignPic,
    showCableOnlinePic,
    indicatorText
    }) => {

    //console.log('view profile',profile);    
    
    return (      
            <div className="profile-container">

                <div key={profile._id} className="profile-item" onClick={() => dispatch(openPopUpProfile(profile,setIsPopUpShowState))}>                                        
                    
                    <div className="profile_name">{profile.firstName} </div>
                    <div className="age"> {profile.age}</div>
                    <div className="city">{profile.city}</div>                    
                    <div className="height"> {profile.appearance.height}</div>
                    <div className="relationshipStatus">{profile.relationshipStatus}</div>                
                    <div className="look"> {profile.appearance.look}</div>                
                    <div className="structure"> {profile.appearance.structure}</div>
                    <div className="hair"> {profile.appearance.hair}</div>                
                    <div className="eyes"> {profile.appearance.eyes}</div>

                    <img className="hair_icon" src={require(`./../../assets/images/hair_icon.png`)} alt="hair"/>
                    <img className="eyes_icon" src={require(`./../../assets/images/eyes_icon.png`)} alt="eyes"/>
                    <img className="structure_icon" src={require(`./../../assets/images/structure_icon.png`)} alt="structure"/>
                    <img className="look_icon" src={require(`./../../assets/images/look_icon.png`)} alt="look"/>
                    <img className="relationshipStatus_icon" src={require(`./../../assets/images/status_icon2.png`)} alt="relationshipStatus"/>
                    <img className="house_icon" src={require(`./../../assets/images/house.png`)} alt="house"/>
                    <img className="seedling_icon" src={require(`./../../assets/images/seedling.png`)} alt="seedling"/>
                    <img className="cake_icon" src={require(`./../../assets/images/cake.png`)} alt="cake"/>
                    <img className="weel_picture" src={require(`./../../assets/images/weel.png`)} alt="weel"/>
                    <img className="profile_picture rounded-circle" src={require(`./../../assets/images/${profile.picture}`)} alt="porfile"/>
                    <img className="profile_bacground_pic" src={require(`./../../assets/images/castle.jpg`)} alt="castle"/>
                                        
                    {showSignPic}
                    {showCableOnlinePic}
                                                                
                    <div className="newActionReceived" dir="rtl">{indicatorText}</div>                                                                                
                    <div className="msg_date">{signInfo.dateLastSeen}</div>                    
                    <div className="msg_date_title">{signInfo.textDate} </div>                                                                                                                                                                       
                </div>
                
                <img className="like_icon" src={require(`./../../assets/images/like.webp`)} alt="like"
                     onClick={() =>  dispatch(likeIsClicked(currUser.socket_server,currUser.loginObj.data._id,profile.userId)) }/>
                
                <img className="star_icon rounded-circle" src={require(`./../../assets/images/star.png`)} alt="favorite"
                     onClick={() => dispatch(favoriteIsClicked(currUser.socket_server,currUser.loginObj.data._id,profile.userId)) }/>

            </div>
           )
}

export default ViewProfile;