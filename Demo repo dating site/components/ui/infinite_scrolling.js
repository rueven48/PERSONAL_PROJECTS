/* eslint-disable */
import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './spinner';

const InfiniteScrolling = ({
    profilesLength,
    setProfilesLoading,
    profiles,
    profilesloading,
    getProfilesMatchingPage
    }) => {
        
    return (      
            <InfiniteScroll dataLength={profilesLength}  
                            next={ ()=> {
                                setProfilesLoading(<Spinner/>);
                                getProfilesMatchingPage();                                                                
                            }}
                            hasMore={(Object.keys(profiles).length < profilesLength)?false:true}
                            loader={profilesloading}
            >
            </InfiniteScroll>
           )
}

export default InfiniteScrolling;