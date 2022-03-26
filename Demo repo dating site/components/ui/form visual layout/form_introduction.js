import React from 'react';
import SiteHeadline from './site_headline';
import SiteInfo from './site_info';
import SorcererPicSpeach from './sorcerer_pic_speach';
import FairyPic from './fairy_pic';

const FormIntroduction = () => {
    return (      
            <div>                
                <SiteHeadline/>

                <FairyPic/>
                
                <SorcererPicSpeach/>

                <SiteInfo/>                
            </div>
           )
}

export default FormIntroduction;