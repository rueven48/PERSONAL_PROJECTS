import React from 'react';
import LoaddingSpinner from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


const Spinner = () => {
    return (      
            <div>
                <LoaddingSpinner type="ThreeDots"
                                 color="#00BFFF"
                                 height={100}
                                 width={100}   
                />
            </div>
           )
}

export default Spinner;