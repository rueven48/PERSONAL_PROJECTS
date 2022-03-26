/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

const ViewSideBar = ({
  pageWrapId, 
  outerContainerId,
  right,
  currUser,
  statistics,
  newMessagesNotifier,
  newViewsNotifier,
  newLikesNotifier,
  newFavoritesNotifier
  }) => {
    
  return (
    <Menu pageWrapId={pageWrapId}
          outerContainerId={outerContainerId}
          right={right}
    >

        <div className="sidebar_container_to_me">

            <div className="siderbar_title_to_me">:פניות אליי</div>
            
            <Link className="slidebar_received_messages" to={{pathname: "/mailbox/inbox"}}>הודעות שקבלתי<i className="far fa-envelope"></i></Link>

            <Link className="slidebar_sum_received_messages" to={{pathname: "/mailbox/inbox"}}>
                {statistics.sumMessagesReceived.counter}                       
            </Link>
            
            <Link className="slidebar_viewed_me" to={{pathname: "/views/viewd-me"}}>צפיות בי<i className="fas fa-eye"></i></Link>
                    
            <Link className="slidebar_sum_viewed_me" to={{pathname: "/views/viewd-me"}}>
                {statistics.sumViewsToMyProfile.counter}        
            </Link>

            <Link className="slidebar_liked_me" to={{pathname: "/likes/liked-me"}}>עשו לי לייק<i className="far fa-thumbs-up"></i></Link>
            
            <Link className="slidebar_sum_liked_me" to={{pathname: "/likes/liked-me"}}>
                {statistics.sumLikesToMyProfile.counter }                     
            </Link>

            <Link className="sidebar_favored_me" to={{pathname: "/favorites/favorited-me"}}>הוסיפו אותי למועדפים<i className="far fa-star"></i></Link>
            
            <Link className="sidebar_sum_favored_me" to={{ pathname: "/favorites/favorited-me" }}>
                {statistics.sumFavoritesToMyProfile.counter}                      
            </Link>

        </div>


        <div className="sidebar_container_to_other">  

            <div className="sidebar_title_to_someone">:פניות ממני</div>
                    
            <Link className="sidebar_send_messages" to={{pathname: "/mailbox/outbox"}}>הודעות ששלחתי<i className="far fa-envelope"></i></Link>
                    
            <Link className="sidebar_sum_send_messages" to={{pathname: "/mailbox/outbox"}}>
                {statistics.sumMessagesSend.counter}                            
            </Link>
                                        
            <Link className="sidebar_me_views_others" to={{pathname: "/views/view-others"}}>צפיות באחרים<i className="fas fa-eye"></i></Link>

            <Link className="sidebar_sum_me_views_others" to={{pathname: "/views/view-others"}}>
                {statistics.sumViewsToOtherProfiles.counter}                            
            </Link>

            <Link className="sidebar_me_likes_others" to={{pathname: "/likes/like-others"}}>עשיתי לייק לאחרים<i className="far fa-thumbs-up"></i></Link>
                    
            <Link className="sidebar_sum_me_likes_others" to={{ pathname: "/likes/like-others" }}>
                {statistics.sumLikesToOtherProfiles.counter}
            </Link>
                                        
            <Link className="sidebar_me_favorites_others" to={{pathname: "/favorites/favorite-others"}}>המועדפים שלי<i className="far fa-star"></i></Link>

            <Link className="sidebar_sum_me_favorites_others" to={{ pathname: "/favorites/favorite-others"}}>      
                {statistics.sumFavoritesToOtherProfiles.counter}                                           
            </Link>

        </div>

        <div className="sidebar_personal_area">
        
            <img className="sidebar_profile_picture rounded-circle" src={require(`./../../assets/images/${currUser.loginObj.data.picture}`)}  alt="porfile"/>
                                                                       
            <p className="sidebar_profile_name">
                {`${currUser.loginObj.data.firstName}, כך נראית תמונת הפרופיל שלך` }
            </p>

            <Link className="sidebar_new_messages" to={{pathname: "/mailbox/inbox"}}>{newMessagesNotifier}</Link>                      
            
            <Link className="sidebar_new_views" to={{pathname: "/views/viewd-me"}}>{newViewsNotifier}</Link>
                                                 
            <Link className="sidebar_new_likes" to={{pathname: "/likes/liked-me"}}>{newLikesNotifier}</Link>
                                                   
            <Link className="sidebar_new_favorites" to={{pathname: "/favorites/favorited-me"}}>{newFavoritesNotifier}</Link>

        </div>
    </Menu>
  );
}

export default ViewSideBar;