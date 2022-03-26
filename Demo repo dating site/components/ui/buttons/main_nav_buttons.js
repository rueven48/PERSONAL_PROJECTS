import React,{ useEffect } from  'react';
import { useHistory } from "react-router-dom";
/* eslint-disable */


const MainNavButtons = () => {
    
    const history = useHistory();          
    let elements = document.getElementsByClassName('navbtn');
    
    useEffect( () => {                
        elements[2].classList.add('is_active'); // init color black on main button
    },[])

    
    const buttonClicked = (page,activeElementIndex) => {
        history.push(page);
        loopElementsAddOrRemoveClass(activeElementIndex);        
    }


    const loopElementsAddOrRemoveClass = (activeElementIndex) => {
        for (let i = 0; i < elements.length; i++){            
            if( i === activeElementIndex)
                elements[activeElementIndex].classList.add('is_active');
            else
                elements[i].classList.remove('is_active');                                    
        }
    }
    
    return (      
            <div>                               
                <div className="link_mailbox">
                    <button className="navbtn" onClick={() => buttonClicked("/mailbox/inbox",0)}>דואר</button>
                </div>
                
                <div className="link_search">
                    <button className="navbtn" onClick={() => buttonClicked("/search/online",1)}>חיפוש</button>
                </div>
                
                <div className="link_main">
                    <button className="navbtn" onClick={() => buttonClicked("/main",2)}>ראשי</button>
                </div>                                                                                                                                                                                
            </div>
           )
}

export default MainNavButtons;



