import React from 'react';


const siteInfo = () => {
    return (      
            <div className="container_site_info">
                
                <h3 className="info_headline">אתר ההיכרויות למגזר הדתי</h3>

                <p className="info_paragraph">...אתם במרחק של צעד מקסם של חוויה</p>

                <img className="prince_and_princes rounded-circle" src={require(`./../../../assets/images/prince_and_princes.jpg`)} alt="prince_and_princes"/>

            </div>
           )
}

export default siteInfo;