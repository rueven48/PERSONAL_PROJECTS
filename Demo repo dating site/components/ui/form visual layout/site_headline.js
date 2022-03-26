import React from 'react';


const siteHeadline = () => {
    return (      
            <p className="container_site_letters">
                <span style={{color: "#cc00ff"}}  className="site_name_letters">ה</span>
                <span style={{color: "#ff3333"}}  className="site_name_letters">כ</span>
                <span style={{color: "blue"}}     className="site_name_letters">ר</span>
                <span style={{color: "#00cc00"}}  className="site_name_letters">ו</span>
                <span style={{color: "#0099ff"}}  className="site_name_letters">י</span>
                <span style={{color: "#00cc00"}}  className="site_name_letters">ו</span>
                <span style={{color: "#ff00ff"}}  className="site_name_letters">ת</span>
                <span style={{color: "white"}}    className="site_name_letters">-</span>
                <span style={{color: "#cc00ff"}}  className="site_name_letters">מ</span>                
                <span style={{color: "#ff3333"}}  className="site_name_letters">ה</span>
                <span style={{color: "blue"}}     className="site_name_letters">א</span>
                <span style={{color: "#00cc00"}}  className="site_name_letters">ג</span>
                <span style={{color: "#0099ff"}}  className="site_name_letters">ד</span>
                <span style={{color: "#00cc00"}}  className="site_name_letters">ו</span>
                <span style={{color: "#ff00ff"}}  className="site_name_letters">ת</span>
                
                <img className="decorative_line" src={require(`./../../../assets/images/decorative_line.png`)} alt="decorative line"/>
            </p>
           )
}

export default siteHeadline;