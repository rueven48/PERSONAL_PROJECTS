/* eslint-disable */
import React from 'react';
import Input from '../../ui/inputs/input';
import { NavLink } from "react-router-dom";

const ViewFormLogin = ({
    onSubmit,
    register,
    errors,
    handleSubmit,
    }) => {
       
    return (      
            <form onSubmit={handleSubmit(onSubmit)} className="login_form">
            
                <h3 className="login_name_subject">:כניסה לרשומים</h3>
                                                               
                <NavLink className="link_to_resgister" to={{pathname: "/registerStep1"}}>לחץ להרשמה<i id="icon_resgiter" className="fas fa-edit"></i></NavLink>

                <img className="padlock_login_img" src={require(`./../../../assets/images/padlock.jpg`)} alt="padlock"/>

                <div className="container_password_and_login_inputs">
                                                
                    <Input type={"text"}
                           name={"userName"}
                           placeholder={"שם משתמש"}
                           className={"username_login_input"}
                           ref={register}
                    />
                    {errors.userName && <div className="error username_error">{errors.userName.message}</div>}               
                                                                
                    <Input type={"text"}
                           name={"password"}
                           placeholder={"סיסמא"}
                           className={"password_login_input"}  
                           ref={register}
                    />
                    {errors.password && <div className="error password_error">{errors.password.message}</div>}
                
                     <input type="submit" className="login_submit_button" value="כניסה"/>
                </div> 
                                                                    
            </form>
        )
}

export default ViewFormLogin;