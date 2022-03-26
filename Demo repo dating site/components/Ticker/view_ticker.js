import React from 'react';

const ViewTicker = () => {
    
    return (      
            <div className="ticker_news">
                <img className="scroll_pic" src={require(`./../../assets/images/scroll_with_feather.png`)} alt="scroll"/>
                <ul id="ticker01">
                    <li><span>1. </span>אתר חדש להכירויות</li>
                    <li><span>2. </span>האתר בנוי בטכנולוגית ריאקט</li>
                    <li><span>3. </span>הושקעה מחשבה רבה בעיצוב האתר</li>
                    <li><span>4. </span>האתר הוא חינם להרשמה</li>
                    <li><span>5. </span>האתר קל לשימוש</li>
                    <li><span>6. </span>הדפים באתר נטענים במהירות</li>
                    <li><span>7. </span>האתר מיועד לכול הגילאים</li>
                    <li><span>8. </span>כול הזכויות שמורות למפתח האתר</li>
                </ul>
            </div>
           )
}

export default ViewTicker;