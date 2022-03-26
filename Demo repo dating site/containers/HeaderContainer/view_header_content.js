import React from 'react';
import MainNavButtons from '../../components/ui/buttons/main_nav_buttons';
import { Button } from 'react-bootstrap';

const ViewHeaderContent = ({
    currUser,
    showGreetingsByGender,
    logOut
    }) => {
    
    return (                                     
            <div>
                <strong>{showGreetingsByGender()}</strong>, {currUser.loginObj.data.firstName} {currUser.loginObj.data.lastName}

                <div className="exit_button">
                    <Button type="button" variant="link" onClick={() => logOut()}>יציאה</Button> 
                </div>
            
                <MainNavButtons/>
            </div>                                         
 
           )
}

export default ViewHeaderContent;