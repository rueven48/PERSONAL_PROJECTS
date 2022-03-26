/* eslint-disable */
import React from 'react';
import ViewHeaderContent from './view_header_content';
import RightMenu from './../../components/RightMenu/right_menu';

const ViewHeaderBranch = ({
    currUser,
    showGreetingsByGender,
    logOut,
    }) => {
     
    return (      
            <div className="header_container">            
                <div className="welcome_container">
                    {(Object.keys(currUser).length >= 1 && currUser.loginObj && (currUser.loginObj.status === 200||currUser.loginObj.status === 201 ))?
                        <ViewHeaderContent currUser={currUser}
                                           logOut={logOut}
                                           showGreetingsByGender={showGreetingsByGender}                        
                        />
                        :
                    <div><strong>ברוך הבא, אורח</strong></div>
                    }
                </div>

                {(Object.keys(currUser).length >= 2 && (currUser.loginObj.status === 200||currUser.loginObj.status === 201 ) )?
                    <div className="App" id="outer-container">                                            
                        <RightMenu  pageWrapId={'page-wrap'}
                                    outerContainerId={'App'}
                                    right
                        />
                    </div>
                :null}                                                                                            
        </div>
           )
}

export default ViewHeaderBranch;