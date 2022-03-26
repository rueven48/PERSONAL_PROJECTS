import React from 'react';


const SorcererPicSpeach = () => {
    return (      
            <div className="sorcerer_and_speech_container">

                <img className="sorcerer_icon" src={require(`./../../../assets/images/sorcerer.png`)} alt="sorcerer"/>

                <img className="speech_bubble" src={require(`./../../../assets/images/speech_bubble.png`)} alt="speech bubble"/>

                 <p className="speech_bubble_text">! אברה קדברה</p>
                                
            </div>
           )
}

export default SorcererPicSpeach;