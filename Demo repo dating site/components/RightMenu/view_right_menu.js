import React from 'react';
import { Link } from 'react-router-dom';

const ViewRightMenu = ({
    currUser,
    statistics,
    newMessagesNotifier,
    newViewsNotifier,
    newLikesNotifier,
    newFavoritesNotifier
    }) => {
    
    return (      
            <div className="right_menu_container">
                        
                <img className="right_menu_bacground_pic" src={require(`./../../assets/images/scroll_paper.jpg`)} alt="scroll"/>                    
                
                <div className="right_menu_personal_area">                        
                
                    <img className="right_menu_profile_picture rounded-circle" src={require(`./../../assets/images/${currUser.loginObj.data.picture}`)} alt="porfile"/>                        
                                       
                    <p className="right_menu_profile_name">{`${currUser.loginObj.data.firstName}, כך נראית תמונת הפרופיל שלך`}</p>

                    <Link className="right_menu_received_new_messages" to={{pathname: "/mailbox/inbox"}} dir="rtl">{newMessagesNotifier}</Link>

                    <Link className="right_menu_received_new_views" to={{pathname: "/views/viewd-me"}} dir="rtl">{newViewsNotifier}</Link>

                    <Link className="right_menu_received_new_likes" to={{pathname: "/likes/liked-me"}} dir="rtl">{newLikesNotifier}</Link>

                    <Link className="right_menu_received_new_favorites" to={{pathname: "/favorites/favorited-me"}} dir="rtl">{newFavoritesNotifier}</Link>

                </div>
                    

                <div className="right_menu_container_to_me">
                    
                    <div className="right_menu_title_to_me">:פניות אליי</div>
                                                
                    <Link className="right_menu_received_messages" to={{ pathname: "/mailbox/inbox" }}>הודעות שקבלתי</Link>

                    <Link className="right_menu_sum_received_messages" to={{ pathname: "/mailbox/inbox" }}>
                        {statistics.sumMessagesReceived.counter}                                                                        
                    </Link>                        

                    <Link className="right_menu_viewed_me" to={{ pathname: "/views/viewd-me" }}>צפיות בי</Link>

                    <Link className="right_menu_sum_viewed_me" to={{ pathname: "/views/viewd-me" }}>
                        {statistics.sumViewsToMyProfile.counter}                             
                    </Link> 

                    <Link className="right_menu_liked_me" to={{ pathname: "/likes/liked-me" }}>עשו לי לייק</Link>

                    <Link className="right_menu_sum_liked_me" to={{ pathname: "/likes/liked-me" }}>
                        {statistics.sumLikesToMyProfile.counter}                                                    
                    </Link>

                    <Link className="right_menu_favored_me" to={{ pathname: "/favorites/favorited-me" }}>הוסיפו אותי למועדפים</Link>

                    <Link className="right_menu_sum_favored_me" to={{ pathname: "/favorites/favorited-me" }}>
                        {statistics.sumFavoritesToMyProfile.counter}
                    </Link> 

                </div>
                
                <div className="right_menu_container_to_someone">
                    
                    <div className="right_menu_title_to_someone">:פניות ממני</div>

                    <Link className="right_menu_send_messages" to={{ pathname: "/mailbox/outbox" }}>הודעות ששלחתי</Link>
                    
                    <Link className="right_menu_sum_send_messages" to={{ pathname: "/mailbox/outbox" }}>
                        {statistics.sumMessagesSend.counter}                            
                    </Link>
                                                                       
                    <Link className="right_menu_me_views_others" to={{ pathname: "/views/view-others" }}>צפיות באחרים</Link> 
                    
                    <Link className="right_menu_sum_me_views_others" to={{ pathname: "/views/view-others" }}>
                        {statistics.sumViewsToOtherProfiles.counter}
                    </Link>
                                                                      
                    <Link className="right_menu_me_likes_others" to={{ pathname: "/likes/like-others" }}>עשיתי לייק לאחרים</Link>

                    <Link className="right_menu_sum_me_likes_others" to={{ pathname: "/likes/like-others" }}>
                        {statistics.sumLikesToOtherProfiles.counter}
                    </Link>
                                                                                          
                    <Link className="right_menu_me_favorites_others" to={{ pathname: "/favorites/favorite-others"}}>המועדפים שלי</Link> 

                    <Link className="right_menu_sum_me_favorites_others" to={{ pathname: "/favorites/favorite-others"}}>
                        {statistics.sumFavoritesToOtherProfiles.counter}                                                     
                    </Link>     
                
                </div>             
                
            </div>
           )
}

export default ViewRightMenu;